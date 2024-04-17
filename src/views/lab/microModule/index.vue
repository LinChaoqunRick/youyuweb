<template>
  <div class="micro-module">
    <div class="views">
      <div v-for="item in views" class="view-item" :class="{ active: item.type === viewType }"
           @click="onViewChange(item)">
        {{ item.name }}
      </div>
    </div>
    <div class="percentage-box" v-if="percentage < 100">{{ percentage }}%</div>
    <div ref="statsRef"></div>
    <div class="three-d-container" ref="containerRef"></div>
    <div class="bottom-operation">
      <div class="operation-item" @click="onMicroModuleSetting">
        <i-setting-two theme="outline" size="20" fill="#ffffff"/>
      </div>
      <div class="operation-item" @click="onResetOrbitControls">
        <i-reverse-lens theme="outline" size="24" fill="#ffffff"/>
      </div>
    </div>

    <ConfigDrawer v-model:visible="drawerVisible" @saveConfigSuccess="onSaveConfigSuccess"/>
  </div>
</template>

<script lang="ts" setup>
import Stats from 'stats.js';
import {
  AmbientLight,
  AxesHelper,
  Color,
  DirectionalLight,
  DoubleSide,
  GridHelper,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  WebGLRenderer,
  BoxGeometry,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {onMounted, onUnmounted, ref, watch, computed} from 'vue';
import {useStore} from 'vuex';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoaderPromise, TextureLoaderCommonPromise, TextureLoaderPromise} from '@/libs/three/loaders';
import {createCabinetAlarmMesh, createTextMesh} from '@/views/lab/microModule/utils';
import type {infoType} from '@/views/lab/microModule/config';
import {
  icons,
  mockAlarmListData,
  mockCabinetData,
  mockSecurityData,
  mockMicroConfigEnum,
  mockUbitCapacityData, mockCoolingCapacityData, mockPowerCapacityData,
} from '@/views/lab/microModule/config';
import {useRequest} from 'vue-request';
import {cloneDeep, isEqual} from 'lodash';
import {notification} from 'ant-design-vue';
import ConfigDrawer from '@/views/lab/microModule/ConfigDrawer.vue';

const {dispatch} = useStore();

const statsRef = ref<HTMLDivElement>();

const containerRef = ref<HTMLDivElement>();
const percentage = ref(0);
let microConfigData = {};
const microConfig = {
  totalLength: 0, // 模型总长度
  doorWidth: 24, // 门的宽度
  cabinetWidthList: [
    {name: 'jg_80', ltd: 'ltd_80', width: 80, correctWidth: 84},
    {name: 'jg_60', ltd: 'ltd_60', width: 60, correctWidth: 64},
    {name: 'jg_30', ltd: 'ltd_30', width: 30, correctWidth: 34},
  ],
  securityDeviceMap: {
    '1': {name: 'af_sp_qiu'}, // 球型摄像头
    '2': {name: 'af_sp_qiang'}, // 枪型摄像头
    '3': {name: ''}, // 温感
    '4': {name: 'af_smoke'}, // 烟感
  },
  capacityColorList: [
    {limit: 0, color: 0x24d3ff},
    {limit: 20, color: 0x15ffc0},
    {limit: 40, color: 0x29ff4c},
    {limit: 60, color: 0xf2da13},
    {limit: 80, color: 0xff702a},
    {limit: 100, color: 0xe22000}
  ],// 容量云图对应颜色
  cabinetZ: 120, // 机柜位置的z值，(机柜宽度的+冷通道温度) / 2
  cabinetHeight: 223, // 机柜的高
  cabinetDepth: 116, // 机柜模型的z
};

let scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, controls: OrbitControls, containerRect: DOMRect,
    stats;
let microGroup = new Group(); // 整个微模块（门+机柜组）
const models = {};
let mtlTotal = 0, objTotal = 0, imageTotal = 0, loopInterval = 10 * 1000;
const imagesTexture: object = {};
const views = [
  {name: '3D视图', type: '3d'},
  {name: '安防视图', type: 'security'},
  {name: '温度云图', type: 'temp'},
  {name: 'U位视图', type: 'ubit'},
  {name: '配电视图', type: 'power'},
  {name: '制冷视图', type: 'cooling'},
];
const viewType = ref<string>(views[0].type);
const drawerVisible = ref<boolean>(false);
const isTransparent = computed(() => viewType.value !== '3d');

let transparentMesh: Mesh[] = []; // 切换透明视图，需要改变材质的mesh
const cabinetMeshMap = new Map<string, Mesh | Group>(); // 机柜mesh
const cabinetNameWrapsMeshMap = new Map<string, Mesh | Group>(); // 需要滚动的名称mesh
const securityMeshMap = new Map<string, Mesh | Group>(); // 安防mesh
const capacityMeshMap = new Map<string, Mesh | Group>(); // 容量mesh

let alarmLevelList: object[] = []; // 告警等级配置

const initMicroModule = async () => {
  const res = await getMicroModuleData();
  res.data = cloneDeep(mockCabinetData);
  microConfigData = res.data;
  createMicroModule(microConfigData);

  setTimeout(() => {
    loop.run();
  }, loopInterval);
};

/**
 * 初始化微模块整体模型
 */
const createMicroModule = microConfigData => {
  scene.remove(microGroup);
  microGroup = new Group();
  const {cabinetList} = microConfigData;
  transparentMesh = [];
  cabinetMeshMap.clear();
  cabinetNameWrapsMeshMap.clear();

  // 构建微模块
  microConfig.totalLength = 0;

  // 添加机柜
  for (let index = 0; index < cabinetList.length; index += 2) {
    const cabinetFront = cabinetList[index];
    const cabinetBack = cabinetList[index + 1];

    const pairCabinetGroup = new Group();

    const cabinetInfo = microConfig.cabinetWidthList[cabinetFront.cabinetWidth];

    // 机柜前
    const cabinetFrontGroup = createCabinetItem(cabinetInfo, index, cabinetFront);
    cabinetFrontGroup.position.set(0, 0, -microConfig.cabinetZ);

    // 机柜后
    const cabinetBackGroup = createCabinetItem(cabinetInfo, index + 1, cabinetBack);
    cabinetBackGroup.position.set(0, 0, microConfig.cabinetZ);
    cabinetBackGroup.rotation.y = Math.PI;

    // 冷通道
    const ltdModel = models[cabinetInfo.ltd].clone();

    microConfig.totalLength += cabinetInfo.correctWidth;

    pairCabinetGroup.add(cabinetFrontGroup, cabinetBackGroup, ltdModel);
    pairCabinetGroup.position.x = microConfig.totalLength - cabinetInfo.correctWidth / 2;

    microGroup.add(pairCabinetGroup);
    transparentMesh.push(ltdModel);
  }

  // 位置整体偏移
  microGroup.position.x = -microConfig.totalLength / 2;

  // 添加玻璃门
  const glassDoorModel = microConfigData.glassDoorType === '1' ? models.men_p : models.men_r;

  // 添加门楣
  const lintelModel = ['1', '99'].includes(microConfigData.lintelLogoType) ? models.menmei_logo : models.menmei_led;
  lintelModel.name = 'lintel';

  // 添加前门
  const doorModelFront = microConfigData.doorHeadType === '1' ? models.menban_b_ping : models.menban_h_ping;
  doorModelFront.name = 'front_door';
  doorModelFront.add(glassDoorModel.clone());
  doorModelFront.add(lintelModel.clone());
  doorModelFront.position.set(-microConfig.doorWidth / 2, 0, 0);

  // 添加后门
  const doorModelBack = microConfigData.doorHeadType === '1' ? models.menban_b : models.menban_h;
  doorModelBack.name = 'back_door';
  doorModelBack.add(glassDoorModel.clone());
  doorModelBack.add(lintelModel.clone());
  doorModelBack.position.set(microConfig.totalLength + microConfig.doorWidth / 2, 0, 0);
  doorModelBack.rotation.y = Math.PI;

  transparentMesh.push(doorModelFront, doorModelBack);

  microGroup.add(doorModelFront, doorModelBack);

  handleCustomTexture(microConfigData, mockMicroConfigEnum);

  scene.add(microGroup);
};

/**
 * 处理自定义贴图
 * @param microConfigData 配置数据
 */
const handleCustomTexture = async (microConfigData, mockMicroConfigEnum) => {
  const {
    doorHeadType,
    lintelLogoType,
    lcdDisplayType,
    lcdDisplayStandardFilePath,
    lcdDisplayHighEndFilePath,
    glassDoorLogoType,
    glassDoorLogoFilepath,
    glassDoorType,
  } = microConfigData;
  const isHighEnd = doorHeadType === '2';
  const frontDoorMesh = microGroup.getObjectByName('front_door');
  const backDoorMesh = microGroup.getObjectByName('back_door');
  if (!frontDoorMesh || !backDoorMesh) return;
  // 处理门楣
  if (lintelLogoType !== '1') {
    const isCustom = lintelLogoType === '99';
    const lintelFront = frontDoorMesh.getObjectByName(isCustom ? 'menmei_logo' : 'menmei_ping');
    const lintelBack = backDoorMesh.getObjectByName(isCustom ? 'menmei_logo' : 'menmei_ping');
    if (lintelFront && lintelBack) {
      const item = !isCustom && mockMicroConfigEnum.lintelLogoType.find(item => item.code === lintelLogoType);
      const texture = await TextureLoaderPromise(
          isCustom ? microConfigData.lintelLogoFilePath : '/static/micro/map/' + item.image
      );
      setMeshMaterial(lintelFront, 'men_menmei_ping', texture);
      setMeshMaterial(lintelBack, 'men_menmei_ping', texture);
    }
  }

  // 处理屏幕
  if (lcdDisplayType === '99') {
    const texture = await TextureLoaderPromise(
        doorHeadType === '1' ? lcdDisplayStandardFilePath : lcdDisplayHighEndFilePath
    );
    const lcdFront = frontDoorMesh.getObjectByName(isHighEnd ? 'menban_daping' : 'menban_biaoping');
    lcdFront && setMeshMaterial(lcdFront, isHighEnd ? 'menban_daping_ping' : 'menban_biaoping_ping', texture);
  }

  // 处理玻璃门Logo
  if (glassDoorLogoType === '99') {
    const isRotate = glassDoorType === '2';
    const texture = await TextureLoaderPromise(glassDoorLogoFilepath);
    const glassLogoFrontLeft = frontDoorMesh.getObjectByName(isRotate ? 'men_pensha_007' : 'men_pensha_01');
    const glassLogoFrontRight = frontDoorMesh.getObjectByName(isRotate ? 'men_pensha_008' : 'men_pensha_02');

    const glassLogoBackLeft = backDoorMesh.getObjectByName(isRotate ? 'men_pensha_007' : 'men_pensha_01');
    const glassLogoBackRight = backDoorMesh.getObjectByName(isRotate ? 'men_pensha_008' : 'men_pensha_02');

    glassLogoFrontLeft && setMeshMaterial(glassLogoFrontLeft, 'men_pensha', texture);
    glassLogoFrontRight && setMeshMaterial(glassLogoFrontRight, 'men_pensha', texture);
    glassLogoBackLeft && setMeshMaterial(glassLogoBackLeft, 'men_pensha', texture);
    glassLogoBackRight && setMeshMaterial(glassLogoBackRight, 'men_pensha', texture);
  }
};

/**
 * 修改模型材质贴图
 * @param mesh 模型
 * @param materialName 材质名称
 * @param texture 贴图
 */
const setMeshMaterial = (mesh, materialName: string, texture) => {
  const materials = mesh.material;
  let material;
  if (Array.isArray(materials)) {
    material = materials.find(m => m.name === materialName);
  } else {
    material = materials;
  }

  texture.colorSpace = 'srgb';
  material.map = texture;
};

/**
 * 构建单个机柜，包括机柜体，机柜名称，类型贴图，告警贴图，数据贴图
 * @param cabinetInfo 机柜信息
 * @param index 机柜下标
 * @param cabinetData 机柜名称
 */
const createCabinetItem = (cabinetInfo: infoType, index: number, cabinetData: any) => {
  const {name, correctWidth} = cabinetInfo;
  const {cabinetShortName, cabinetType, alarmCount, alarmLevel, assetId} = cabinetData;
  const cabinetGroup = new Group();
  const cabinetMesh = models[name].clone();
  cabinetMesh.name = 'cabinet_' + index;

  // 机柜名称Mesh
  const nameMesh = createTextMesh(cabinetShortName, correctWidth);
  nameMesh.position.set(0, microConfig.cabinetHeight, -microConfig.cabinetDepth / 2);
  nameMesh.rotation.y = Math.PI;
  nameMesh.name = 'name_mesh_' + assetId;
  addWrapsMesh(assetId, nameMesh); // 如果需要滚动显示

  // 机柜类型Mesh
  const typeMesh = createTypeMesh(cabinetType, assetId);

  // 机柜告警Mesh
  if (alarmCount) {
    const alarmMesh = createAlarmMesh(assetId, alarmCount, alarmLevel);
    cabinetGroup.add(alarmMesh);
  }

  cabinetGroup.add(cabinetMesh, nameMesh, typeMesh);
  cabinetMeshMap.set(assetId, cabinetGroup); // 添加到cabinetMeshMap后面可以从此处取类型、告警、名称等材质
  transparentMesh.push(cabinetMesh);

  return cabinetGroup;
};

/**
 * 创建机柜类型mesh
 * @param cabinetType
 * @param assetId
 */
const createTypeMesh = (cabinetType: number | string, assetId: number | string) => {
  const typePlaneGeometry = new PlaneGeometry(48, 48);
  const typePlaneMaterial = new MeshBasicMaterial({
    map: imagesTexture[cabinetType],
    transparent: true,
    color: icons[cabinetType].color,
    side: DoubleSide,
  });
  const typeMesh = new Mesh(typePlaneGeometry, typePlaneMaterial);
  typeMesh.name = 'type_mesh_' + assetId;
  typeMesh.rotation.y = Math.PI;
  typeMesh.position.set(-1.8, microConfig.cabinetHeight * 0.76, -microConfig.cabinetDepth / 2);
  return typeMesh;
};

/**
 * 创建告警mesh
 * @param assetId
 * @param alarmCount
 * @param alarmLevel
 */
const createAlarmMesh = (assetId: number | string, alarmCount: number, alarmLevel: number) => {
  const alarmMesh = createCabinetAlarmMesh(
      alarmCount > 999 ? '999+' : alarmCount,
      alarmLevelList[alarmLevel - 1].alarmLevelColor
  );
  alarmMesh.position.set(0, microConfig.cabinetHeight + 40, -microConfig.cabinetDepth / 2);
  alarmMesh.rotation.y = Math.PI;
  alarmMesh.name = 'alarm_mesh_' + assetId;
  return alarmMesh;
};
/**
 * 添加需要滚动显示的机柜名称模型
 * @param assetId 资产id
 * @param mesh 模型
 */
const addWrapsMesh = (assetId: number | string, mesh: Mesh) => {
  if (mesh.material.map.wrapS === RepeatWrapping) {
    cabinetNameWrapsMeshMap.set(assetId, mesh);
  } else {
    cabinetNameWrapsMeshMap.delete(assetId);
  }
};

/**
 * 初始化场景，渲染器
 */
const initSceneRenderer = () => {
  // 渲染区域Rect
  containerRect = containerRef.value.getBoundingClientRect();

  // 初始化场景
  scene = new Scene();

  // 初始化渲染器
  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    logarithmicDepthBuffer: true, // 设置对数深度缓冲区，优化深度冲突问题
  });
  renderer.setClearColor(new Color(0xfafafa));
  renderer.setSize(containerRect.width, containerRect.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
};

/**
 * 初始化相机
 */
const initCamera = () => {
  camera = new PerspectiveCamera(45, containerRect.width / containerRect.height, 0.1, 3000);
  const calcCameraX = microConfig.totalLength / 2 + 300;
  camera.position.set(-(calcCameraX < 640 ? 640 : calcCameraX), 188, 587);
  // camera.lookAt(100, 10, 10);
  window.addEventListener('resize', resize, false);
};

/**
 * 调整窗口resize渲染区域
 */
const resize = () => {
  containerRect = containerRef.value.getBoundingClientRect();
  camera.aspect = containerRect.width / containerRect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(containerRect.width, containerRect.height);
};

/**
 * 初始化辅助工具
 */
const initHelper = () => {
  // 添加坐标格辅助对象
  const gridHelper = new GridHelper(1600, 40);
  scene.add(gridHelper);

  // 添加坐标轴辅助对象 红x绿y蓝z
  const axes = new AxesHelper(800);
  scene.add(axes);

  // 添加Stats
  stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.top = '65px';
  statsRef.value.append(stats.dom);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 120, 0);
  controls.update();
  controls.enableDamping = true;
  controls.dampingFactor = 0.3;
  controls.rotateSpeed = 0.6;
  controls.maxDistance = 1600;
  controls.maxPolarAngle = Math.PI * 0.5; // 半圆，禁底部翻转
  controls.saveState();
};

/**
 * 初始化灯光
 */
const initLight = () => {
  const ambientLight = new AmbientLight(0xffffff, 4);
  scene.add(ambientLight);

  const directionalLight_pz = new DirectionalLight(0xffffff, 8);
  directionalLight_pz.position.set(0, 0, 1);

  const directionalLight_nz = new DirectionalLight(0xffffff, 8);
  directionalLight_nz.position.set(0, 0, -1);

  const directionalLight_px = new DirectionalLight(0xffffff, 6);
  directionalLight_px.position.set(1, 0, 0);

  const directionalLight_nx = new DirectionalLight(0xffffff, 6);
  directionalLight_nx.position.set(-1, 0, 0);

  scene.add(directionalLight_pz, directionalLight_nz, directionalLight_px, directionalLight_nx);
};

/**
 * 加载模型
 */
const initModels = async () => {
  mtlTotal = 0;
  objTotal = 0;
  imageTotal = 0;
  // 定义目录路径
  const directoryPath = '/static/micro/';

  const mtlFileNames = [
    'af_smoke', // 烟感
    'af_sp_qiang', // 枪型摄像头
    'af_sp_qiu', // 球型摄像头
    'jg_30', // 机柜30cm
    'jg_60', // 机柜60cm
    'jg_80', // 机柜80cm
    'ltd_30', // 冷通道30cm
    'ltd_40', // 冷通道40cm
    'ltd_60', // 冷通道60cm
    'ltd_80', // 冷通道80cm
    'men_p', // 玻璃门平移门
    'men_r', // 玻璃门旋转门
    'menban_b', // 标准门头(10寸后)
    'menban_b_ping', // 标准门头(10寸前)
    'menban_h', // 高端门头(49寸后)
    'menban_h_ping', // 高端门头(49寸前)
    'menmei_led', // led门楣
    'menmei_logo', // 标准门楣
  ];

  const imagesMap = [...Object.values(icons)];

  // 构建模型加载进度列表
  const percentModelList: any = ref(Array.from({length: mtlFileNames.length}).map(_ => ({mtl: 0, obj: 0})));

  // 构建图片加载进度列表
  const percentImagesList: any = ref(Array.from({length: imagesMap.length}).map(_ => ({value: 0})));

  const onProcess = (type: string, index: number, xhr: object, name: string) => {
    if (type === 'model') {
      percentModelList.value[index][name] = (xhr.loaded / xhr.total) * 100;
      mtlTotal = percentModelList.value.reduce((pre, n) => pre + n.mtl, 0) / mtlFileNames.length;
      objTotal = percentModelList.value.reduce((pre, n) => pre + n.obj, 0) / mtlFileNames.length;
    } else if (type === 'image') {
      percentImagesList.value[index][name] = (xhr.loaded / xhr.total) * 100;
      imageTotal = percentImagesList.value.reduce((pre, n) => pre + n.value, 0) / imagesMap.length;
    }
    percentage.value = parseInt(((mtlTotal + objTotal + imageTotal) / 3).toFixed());
  };

  await Promise.all(
      mtlFileNames.map(async (fileName: string, index: number) => {
        const objLoader = new OBJLoader();
        // 加载MTL文件
        const materials: any = await MTLLoaderPromise(directoryPath + fileName + '.mtl', {
          onProcess: (xhr: object) => onProcess('model', index, xhr, 'mtl'),
        });
        materials.preload(); // 预加载材质
        objLoader.setMaterials(materials);

        // 加载OBJ文件
        const object = await TextureLoaderCommonPromise(objLoader, directoryPath + fileName + '.obj', {
          onProcess: xhr => onProcess('model', index, xhr, 'obj'),
        });
        models[fileName] = object;
        return object;
      })
  );

  await Promise.all(
      imagesMap.map(async (item, index) => {
        // 加载图片文件
        const image = await TextureLoaderPromise(item.icon);
        onProcess('image', index, {total: 100, loaded: 100}, 'value');
        imagesTexture[item.code] = image;
        return image;
      })
  );

  // 消除机柜左侧白边
  ['jg_30', 'jg_60', 'jg_80'].forEach(name => {
    models[name].getObjectByName('jigui').material.forEach(item => {
      if (item.name === 'Material__1705') {
        item.color.set(0x000000);
      }
    });
  });
};

/**
 * 获取告警等级信息
 */
const initAlarmLevel = async () => {
  const alarmRes = await dispatch('getAlarmLevelList');
  alarmRes.data = mockAlarmListData;

  alarmLevelList = alarmRes.data;
};

/**
 * 场景渲染 requestAnimationFrame
 */
const renderScene = () => {
  controls.update();
  stats.update();

  cabinetNameMeshAnimation();

  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
};

/**
 * 重置OrbitControls
 */
const onResetOrbitControls = () => {
  controls.reset();
};

/**
 * 微模块设置
 */
const onMicroModuleSetting = () => {
  drawerVisible.value = true;
};

/**
 * 视图切换
 * @param item
 */
const onViewChange = async (item: string) => {
  const type = item.type;
  changeTransparentMesh(type);
  if (viewType.value === type) {
    return;
  } else {
    viewType.value = type;
  }
  removeSecurityDevice(); // 清空安防设备
  removeCapacityColumn(); // 清空容量模型
  if (type === 'security') {
    const res = await dispatch('getSecurityDeviceList');
    securityMeshMap.clear();
    res.data = mockSecurityData;

    res.data.forEach((item, index) => {
      addSecurityDevice(item);
    });
  } else if ('ubit'.includes(type)) {
    dispatch('getMicroCapacityUbit').then(res => {
      res.data = mockUbitCapacityData;
      addCapacityColumn(res.data);
    });
  } else if ('cooling' === type) {
    dispatch('getMicroCapacityCooling').then(res => {
      res.data = mockCoolingCapacityData;
      addCapacityColumn(res.data);
    });
  } else if ('power' === type) {
    dispatch('getMicroCapacityPower').then(res => {
      res.data = mockPowerCapacityData;
      addCapacityColumn(res.data);
    });
  }
};

const isTransparentView = (type: string) => {
  return type !== '3d'
};

/**
 * 添加安防设备
 * @param data
 */
const addSecurityDevice = (data: object) => {
  const {securityType, deviceLocation, deviceAlarmInfoList, deviceId} = data;
  const deviceMesh = models[microConfig.securityDeviceMap[securityType].name];
  const {x, y, z} = getSecurityDevicePosition(deviceLocation);
  deviceMesh.scale.set(1.4, 1.4, 1.4);
  deviceMesh.position.set(x, y, z);
  if (x < 0) {
    deviceMesh.rotation.y = Math.PI; // 左边的设备需要y轴旋转一下
  }
  securityMeshMap.set(deviceId, deviceMesh);
  scene.add(deviceMesh);
};

/**
 * 删除所有安防设备
 */
const removeSecurityDevice = () => {
  if (securityMeshMap.size) {
    scene.remove(...securityMeshMap.values());
  }
};

/**
 * 添加容量柱
 * @param data
 */
const addCapacityColumn = (data: object) => {
  const capacityMap = new Map<string, number>();
  data.forEach(item => capacityMap.set(item.assetId, item.rate));

  const {cabinetList} = microConfigData;
  const {cabinetDepth, cabinetHeight} = microConfig;

  cabinetList.forEach(item => {
    const cabinetMesh = cabinetMeshMap.get(item.assetId);
    const {width, correctWidth} = microConfig.cabinetWidthList[item.cabinetWidth];
    let cabinetCapacityData = capacityMap.get(item.assetId);
    cabinetCapacityData = isNaN(cabinetCapacityData) ? 0 : cabinetCapacityData > 100 ? 100 : cabinetCapacityData;

    const columnGroup = new Group();
    const columnHeight = (cabinetHeight - 17) * (cabinetCapacityData / 100);
    const offsetY = columnHeight / 2 + 5;
    if (cabinetCapacityData > 0) {
      const geometry = new BoxGeometry(width + 2, columnHeight, cabinetDepth - 4);
      const color = getCapacityColor(Number(cabinetCapacityData));
      const material = new MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        depthTest: false,
      });
      const columnMesh = new Mesh(geometry, material);
      columnGroup.add(columnMesh);
    }
    const dataMesh = createTextMesh(capacityMap.get(item.assetId) + '%', correctWidth);
    dataMesh.position.set(0, -offsetY + 15, microConfig.cabinetDepth / 2);
    columnGroup.add(dataMesh);
    columnGroup.position.y = offsetY;
    columnGroup.rotation.y = Math.PI;
    capacityMeshMap.set(item.assetId, columnGroup);
    cabinetMesh.add(columnGroup);
  });
};

const getCapacityColor = (rate: number) => {
  const {capacityColorList} = microConfig;
  let color = 0xffffff;
  for (let item of capacityColorList) {
    if (rate >= item.limit) {
      color = item.color;
    } else {
      break;
    }
  }
  return color;
}

const removeCapacityColumn = () => {
  if (capacityMeshMap.size) {
    for (let [key, value] of capacityMeshMap.entries()) {
      const cabinetMesh = cabinetMeshMap.get(key);
      cabinetMesh.remove(value);
    }
  }
};

/**
 * 根据位置编号获取安防设备三维坐标
 * @param location 位置编号
 */
const getSecurityDevicePosition = (location: string) => {
  const xLeft = ['1', '2', '3', '4', '5'];
  const xRight = ['6', '7', '8', '9', '10'];

  const yTop = ['1', '6'];
  const yTopMiddle = ['2', '7'];
  const yMiddle = ['3', '8'];
  const yBottomMiddle = ['4', '9'];
  const yBottom = ['5', '10'];

  const {totalLength, cabinetZ, cabinetWidth, cabinetHeight, doorWidth} = microConfig;

  const deviceX = xLeft.includes(location)
      ? -(totalLength - doorWidth) / 2
      : xRight.includes(location)
          ? (totalLength - doorWidth) / 2
          : 0;
  let deviceZ;
  if (yTop.includes(location)) {
    deviceZ = -(cabinetZ + cabinetWidth / 2);
  } else if (yTopMiddle.includes(location)) {
    deviceZ = -(cabinetZ - cabinetWidth / 2);
  } else if (yMiddle.includes(location)) {
    deviceZ = 0;
  } else if (yBottomMiddle.includes(location)) {
    deviceZ = cabinetZ - cabinetWidth / 2;
  } else if (yBottom.includes(location)) {
    deviceZ = cabinetZ + cabinetWidth / 2;
  } else {
    deviceZ = 0;
  }

  return {x: deviceX, y: cabinetHeight - 15, z: deviceZ};
};

/**
 * 修改切换视图后需要透明显示模型的材质
 * @param type 视图类型
 */
const changeTransparentMesh = (type: string) => {
  const transparent = isTransparentView(type);
  if (isTransparent.value === transparent) return; // 继续是透明视图，就不变了
  transparentMesh.forEach(mesh => {
    mesh.traverse(child => {
      if (child.isMesh && child.material) {
        if (transparent) {
          // 保存原始材质
          if (!child.originMaterial && child.material) {
            if (Array.isArray(child.material)) {
              child.originMaterial = child.material.map(material => material.clone());
            } else {
              child.originMaterial = child.material.clone();
            }
          }
          // 设置透明材质
          child.material = new MeshBasicMaterial({
            transparent: true,
            color: 0x666666,
            opacity: 0.1,
            depthTest: false
          });
        } else {
          // 还原原始材质
          if (child.originMaterial) {
            child.material = child.originMaterial;
          }
        }
      }
    });
  });
};

/**
 * 机柜名称如果超出，滚动展示动画
 */
const cabinetNameMeshAnimation = () => {
  if (cabinetNameWrapsMeshMap.size) {
    cabinetNameWrapsMeshMap.values().forEach(mesh => {
      if (mesh.isMesh) {
        mesh.material.map.offset.x += 1 / (mesh.material.map.canvasWidth * 6);
      }
    });
  }
};

/**
 * 修改模型材质
 */
const changeMeshMaterial = () => {
};

const getMicroModuleData = async () => {
  return await dispatch('getMicroModuleConfig');
};

/**
 * 处理机柜信息轮询差异
 * @param res
 */
const handleCabinetConfigDiff = (res: object) => {
  res.data = cloneDeep(mockCabinetData);
  const data = res.data;
  // data.cabinetList.length = 10;
  data.cabinetList[0].alarmLevel = null;
  data.cabinetList[0].alarmCount = null;

  data.cabinetList[1].cabinetShortName = '微模块更新成功';
  data.cabinetList[1].alarmLevel = '3';
  data.cabinetList[1].alarmCount = '130';
  data.cabinetList[1].cabinetType = '6';

  data.cabinetList[3].alarmLevel = '4';
  data.cabinetList[3].alarmCount = '5';

  const compareKeys: string[] = ['assetId', 'cabinetType', 'cabinetWidth', 'cabinetShortName', 'alarmLevel', 'alarmCount'];

  const oldConfig = microConfigData.cabinetList.map(item =>
      compareKeys.reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {})
  );

  const newConfig = data.cabinetList.map(item =>
      compareKeys.reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {})
  );

  const equal = isEqual(oldConfig, newConfig);
  if (equal) {
    // 相等，不做任何改变
    return;
  } else {
    // 如果是机柜数量、机柜顺序、机柜尺寸改变，暂时全局刷新模型
    let lengthChange = oldConfig.length != newConfig.length,
        orderChange = false,
        sizeChange = false;
    if (!lengthChange) {
      // 如果长度无变化，再判断机柜顺序、机柜尺寸是否发生变化
      for (let i = 0; i < oldConfig.length; i++) {
        // 判断机柜顺序是否发生变化
        oldConfig[i].assetId !== newConfig[i].assetId && (orderChange = true);
        // 判断机柜尺寸是否发生变化
        oldConfig[i].cabinetWidth !== newConfig[i].cabinetWidth && (sizeChange = true);
      }
    }
    // 计算变更列表
    const changedCabinetList = getChangedCabinetList(microConfigData.cabinetList, data.cabinetList);
    microConfigData = data;
    if (lengthChange || orderChange || sizeChange) {
      createMicroModule(microConfigData);
      notification.success({
        message: '微模块更新成功',
        description: '微模块的配置发生了变化，已整体更新',
      });
    } else {
      // 如果是机柜名称、机柜告警等级、告警数量变化，局部刷新
      for (let i = 0; i < changedCabinetList.length; i++) {
        const [oldCabinet, newCabinet] = changedCabinetList[i];
        const {assetId, cabinetWidth, cabinetShortName} = newCabinet;
        const {correctWidth} = microConfig.cabinetWidthList[cabinetWidth];
        // 获取单机柜整体mesh
        const cabinetMesh = cabinetMeshMap.get(assetId);
        if (!cabinetMesh) return;

        // 1. 判断机柜名称是否发生变化
        if (oldCabinet.cabinetShortName !== newCabinet.cabinetShortName) {
          // 生成新的mesh
          const newNameMesh = createTextMesh(cabinetShortName, correctWidth);
          // 获取旧的mesh
          const nameMesh = cabinetMesh.getObjectByName('name_mesh_' + assetId);
          if (nameMesh) {
            // 替换material
            nameMesh.material = newNameMesh.material;
            // 判断是否需要滚动
            addWrapsMesh(assetId, nameMesh); // 如果需要滚动显示
          }
        }

        // 2. 判断机柜告警等级、机柜告警数量是否发生变化
        if (oldCabinet.alarmLevel !== newCabinet.alarmLevel || oldCabinet.alarmCount !== newCabinet.alarmCount) {
          const newAlarmLevel = newCabinet.alarmLevel;
          const newAlarmCount = newCabinet.alarmCount;
          // 获取旧的mesh
          const alarmMesh = cabinetMesh.getObjectByName('alarm_mesh_' + assetId);
          if (!newAlarmLevel && !newAlarmCount && alarmMesh) {
            // 如果告警消失了
            cabinetMesh.remove(alarmMesh); // 清除告警标识
          } else {
            // 生成新的mesh
            const newAlarmMesh = createAlarmMesh(assetId, newAlarmCount, newAlarmLevel);
            if (alarmMesh) {
              // 之前存在告警标识，替换材质
              // 替换material
              alarmMesh.material = newAlarmMesh.material;
            } else {
              // 机柜从无到产生告警，添加标识
              cabinetMesh.add(newAlarmMesh);
            }
          }
        }

        // 3. 判断机柜名类型是否发生变化
        if (oldCabinet.cabinetType !== newCabinet.cabinetType) {
          // 生成新的mesh
          const newTypeMesh = createTypeMesh(newCabinet.cabinetType);
          // 获取旧的mesh
          const typeMesh = cabinetMesh.getObjectByName('type_mesh_' + assetId);
          if (typeMesh) {
            // 替换material
            typeMesh.material = newTypeMesh.material;
          }
        }
      }
    }
  }
};

/**
 * 比较新旧列表，得出改动的机柜，需要保证长度一致
 * @param oldList
 * @param newList
 */
const getChangedCabinetList = (oldList: [], newList: []) => {
  const compareKeys = ['cabinetShortName', 'alarmLevel', 'alarmCount'];
  const changedCabinetList = [];

  for (let i = 0; i < oldList.length; i++) {
    for (const key of compareKeys) {
      if (oldList[i][key] !== newList[i][key]) {
        changedCabinetList.push([oldList[i], newList[i]]);
        break;
      }
    }
  }

  return changedCabinetList;
};

/**
 * 机柜信息数据轮询
 */
const loop = useRequest(getMicroModuleData, {
  pollingInterval: loopInterval,
  manual: true,
  onSuccess: handleCabinetConfigDiff,
});

/**
 * 微模块配置保存成功
 */
const onSaveConfigSuccess = data => {
  createMicroModule(data);
};

watch(drawerVisible, () => {
  if (!drawerVisible.value) {
    loop.run();
  } else {
    loop.cancel();
  }
});

onMounted(async () => {
  initSceneRenderer();
  await initModels();
  await initAlarmLevel();
  await initMicroModule();
  initCamera();
  initHelper();
  initLight();
  // 渲染场景
  containerRef.value?.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  renderScene();
});

onUnmounted(() => {
  window.removeEventListener('resize', resize, false);
});
</script>

<style scoped lang="scss">
.micro-module {
  position: relative;
  height: calc(100vh - 100px);

  .views {
    position: fixed;
    top: 70px;
    right: 10px;

    .view-item {
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
      width: 100px;
      border: 1px solid skyblue;
      border-radius: 4px;
      margin-bottom: 6px;
      padding-left: 6px;
      cursor: pointer;

      &.active {
        background-color: #1890ff;
        color: white;
      }

      svg {
        position: absolute;
        height: 30px;
        width: 100px;
      }
    }
  }

  .percentage-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: bold;
    color: rgba(24, 144, 255, 0.9);
  }

  .three-d-container {
    height: 100%;
  }

  .bottom-operation {
    position: absolute;
    bottom: 10px;
    right: 10px;

    .operation-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 45px;
      width: 45px;
      border-radius: 50%;
      background-color: #1890ff;
      cursor: pointer;
      margin-top: 8px;
    }
  }
}
</style>
