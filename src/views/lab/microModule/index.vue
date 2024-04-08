<template>
  <div class="micro-module">
    <div class="views">
      <div v-for="item in views" class="view-item" @click="onViewChange(item)">
        {{ item.name }}
      </div>
    </div>
    <div class="percentage-box" v-if="percentage < 100">{{ percentage }}%</div>
    <div ref="statsRef"></div>
    <div class="three-d-container" ref="containerRef"></div>
    <div class="bottom-operation">
      <div class="operation-item" @click="onResetOrbitControls">
        <i-reverse-lens theme="outline" size="28" fill="#ffffff"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Stats from 'stats.js';
import {
  AxesHelper,
  GridHelper,
  Color,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  DirectionalLight,
  WebGLRenderer,
  Group,
  MeshBasicMaterial,
  RepeatWrapping
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {onMounted, reactive, ref} from 'vue';
import {useStore} from 'vuex';
import * as dat from 'dat.gui';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {TextureLoaderCommonPromise, MTLLoaderPromise} from '@/libs/three/loaders';
import {createCabinetNameMesh} from "@/views/lab/microModule/utils";

const {dispatch} = useStore();

const statsRef = ref<HTMLDivElement>();

const containerRef = ref<HTMLDivElement>();
const percentage = ref(0);
let cabinetList = [];
const microConfig = {
  totalLength: 0, // 模型总长度
  doorWidth: 24, // 门的宽度
  cabinetWidthList: [
    {name: 'jg_80', ltd: 'ltd_80', width: 80, correctWidth: 84},
    {name: 'jg_60', ltd: 'ltd_60', width: 60, correctWidth: 64},
    {name: 'jg_30', ltd: 'ltd_30', width: 30, correctWidth: 34},
  ],
  alarmLevelColorList: [
    {
      "alarmLevel": 1,
      "alarmLevelName": "一级告警",
      "alarmLevelColor": "rgba(237,64,20,1)",
    },
    {
      "alarmLevel": 2,
      "alarmLevelName": "二级告警",
      "alarmLevelColor": "rgba(255,153,0,1)",
    },
    {
      "alarmLevel": 3,
      "alarmLevelName": "三级告警",
      "alarmLevelColor": "rgba(13,148,170,1)",
    },
    {
      "alarmLevel": 4,
      "alarmLevelName": "四级告警",
      "alarmLevelColor": "rgba(155,29,234,1)",
    },
    {
      "alarmLevel": 5,
      "alarmLevelName": "五级告警",
      "alarmLevelColor": "rgba(255,255,255,1)",
    },
    {
      "alarmLevel": 6,
      "alarmLevelName": "六级告警",
      "alarmLevelColor": "rgba(255,255,255,1)",
    },
    {
      "alarmLevel": 7,
      "alarmLevelName": "七级告警",
      "alarmLevelColor": "rgba(255,255,255,1)",
    },
    {
      "alarmLevel": 8,
      "alarmLevelName": "八级告警",
      "alarmLevelColor": "rgba(255,255,255,1)",
    }
  ],
  cabinetZ: 120, // 机柜位置的z值，(机柜宽度的+冷通道温度) / 2
  firstCabinetWidth: 0, // 首个机柜的宽度
  cabinetHeight: 223,
  cabinetWidth: 116,
};
let transparentMesh = []; // 切换透明视图，需要改变材质的mesh
let cabinetNameWrapsMesh = []; // 需要滚动的名称

let scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, controls: OrbitControls, containerRect: DOMRect,
  stats;
const models = {};
const views = [
  {
    name: '3D视图',
    type: '3d'
  },
  {
    name: '安防视图',
    type: 'security'
  },
  {
    name: '温度云图',
    type: 'temp'
  },
  {
    name: 'U位视图',
    type: 'ubit'
  },
  {
    name: '配电视图',
    type: 'power'
  },
  {
    name: '制冷视图',
    type: 'cooling'
  },
];

const initCabinet = async () => {
  const res = await dispatch('getMicroModuleConfig');
  res.data = {
    doorHeadType: '2',
    lintelLogoType: '1',
    lintelLogoFilepath: '',
    lintelLogoName: '',
    lcdDisplayType: '1',
    lcdDisplayFilepath: null,
    lcdDisplayName: null,
    glassDoorLogoType: '1',
    glassDoorLogoFilepath: null,
    glassDoorLogoName: null,
    doorType: '1',
    cabinetList: [
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 1,
        assetId: 9,
        cabinetShortName: '机柜01',
        cabinetType: '6',
        cabinetWidth: '0',
        alarmLevel: 4,
        alarmCount: 1,
        cabinetLocateRow: '1',
        cabinetRowOrder: 1,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 2,
        assetId: 8,
        cabinetShortName: '机柜机柜机柜机柜机柜机柜机柜机柜',
        cabinetType: '7',
        cabinetWidth: '0',
        alarmLevel: 4,
        alarmCount: 56,
        cabinetLocateRow: '2',
        cabinetRowOrder: 1,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 3,
        assetId: 7,
        cabinetShortName: '机柜03',
        cabinetType: '7',
        cabinetWidth: '0',
        alarmLevel: 4,
        alarmCount: 159,
        cabinetLocateRow: '1',
        cabinetRowOrder: 2,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 4,
        assetId: 6,
        cabinetShortName: '机柜04',
        cabinetType: '7',
        cabinetWidth: '0',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 2,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 5,
        assetId: 5,
        cabinetShortName: '机柜05',
        cabinetType: '7',
        cabinetWidth: '2',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 3,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 6,
        assetId: 4,
        cabinetShortName: '机柜06',
        cabinetType: '7',
        cabinetWidth: '2',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 3,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 7,
        assetId: 3,
        cabinetShortName: '机柜07',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 4,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 8,
        assetId: 2,
        cabinetShortName: '机柜08',
        cabinetType: '4',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 4,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 9,
        assetId: 1,
        cabinetShortName: '机柜09',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 5,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 10,
        assetId: 23,
        cabinetShortName: '机柜10',
        cabinetType: '9',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 5,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 11,
        assetId: 21,
        cabinetShortName: '机柜11',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 6,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 12,
        assetId: 16,
        cabinetShortName: '机柜12',
        cabinetType: '2',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 6,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 13,
        assetId: 14,
        cabinetShortName: '机柜13',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 7,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 14,
        assetId: 19,
        cabinetShortName: '机柜14',
        cabinetType: '3',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 7,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 15,
        assetId: 18,
        cabinetShortName: '机柜15',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 8,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 16,
        assetId: 11,
        cabinetShortName: '机柜16',
        cabinetType: '9',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 8,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 17,
        assetId: 10,
        cabinetShortName: '机柜17',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 9,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 18,
        assetId: 13,
        cabinetShortName: '机柜18',
        cabinetType: '5',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 9,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 19,
        assetId: 12,
        cabinetShortName: '机柜19',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 10,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 20,
        assetId: 20,
        cabinetShortName: 'DreamDreamDreamDreamDreamDream',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 10,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 21,
        assetId: 24,
        cabinetShortName: '机柜21',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 11,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 22,
        assetId: 22,
        cabinetShortName: '机柜22',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 11,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 23,
        assetId: 17,
        cabinetShortName: '机柜23',
        cabinetType: '7',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '1',
        cabinetRowOrder: 12,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
      {
        deviceId: 1,
        deviceType: '100',
        deviceName: '192.168.68.227',
        areaId: 1,
        cabinetIndex: 24,
        assetId: 15,
        cabinetShortName: '机柜24',
        cabinetType: '6',
        cabinetWidth: '1',
        alarmLevel: null,
        alarmCount: 0,
        cabinetLocateRow: '2',
        cabinetRowOrder: 12,
        cabinetOrderIndex: null,
        avgTemp: null,
        avgHumi: null,
      },
    ],
  };

  transparentMesh = [];
  cabinetNameWrapsMesh = [];

  // 构建微模块
  const microGroup = new Group();
  microGroup.name = 'micro_group';
  cabinetList = res.data.cabinetList;
  microConfig.firstCabinetWidth = microConfig.cabinetWidthList[cabinetList[0].cabinetWidth].correctWidth;
  microConfig.totalLength = 0;

  // 添加机柜
  for (let index = 0; index < cabinetList.length; index += 2) {
    const cabinetFront = cabinetList[index];
    const cabinetBack = cabinetList[index + 1];

    const singleCabinetGroup = new Group();

    const cabinetInfo = microConfig.cabinetWidthList[cabinetFront.cabinetWidth];

    // 机柜前
    const cabinetFrontGroup = new Group();
    const cabinetMeshFront = models[cabinetInfo.name].clone();
    cabinetMeshFront.name = 'cabinet_' + index;
    const nameMeshFront = createCabinetNameMesh(cabinetFront.cabinetShortName, cabinetInfo.correctWidth);
    addWrapsMesh(nameMeshFront);
    nameMeshFront.position.set(0, microConfig.cabinetHeight, -microConfig.cabinetWidth / 2);
    nameMeshFront.rotation.y = Math.PI;
    cabinetFrontGroup.add(cabinetMeshFront, nameMeshFront);
    cabinetFrontGroup.position.set(0, 0, -microConfig.cabinetWidth);

    // 机柜后
    const cabinetBackGroup = new Group();
    const cabinetMeshBack = models[cabinetInfo.name].clone();
    cabinetMeshBack.name = 'cabinet_' + (index + 1);
    const nameMeshBack = createCabinetNameMesh(cabinetBack.cabinetShortName, cabinetInfo.correctWidth);
    addWrapsMesh(nameMeshBack)
    nameMeshBack.position.set(0, microConfig.cabinetHeight, -microConfig.cabinetWidth / 2);
    nameMeshBack.rotation.y = Math.PI;
    cabinetBackGroup.add(cabinetMeshBack, nameMeshBack);
    cabinetBackGroup.position.set(0, 0, microConfig.cabinetWidth);
    cabinetBackGroup.rotation.y = Math.PI;

    // 冷通道
    const ltdModel = models[cabinetInfo.ltd].clone();

    microConfig.totalLength += cabinetInfo.correctWidth;

    singleCabinetGroup.add(cabinetFrontGroup, cabinetBackGroup, ltdModel);
    singleCabinetGroup.position.x = microConfig.totalLength - cabinetInfo.correctWidth / 2;

    microGroup.add(singleCabinetGroup);
    transparentMesh.push(cabinetMeshFront, cabinetMeshBack, ltdModel);
  }

  // 位置整体偏移
  microGroup.position.x = -microConfig.totalLength / 2;

  // 添加玻璃门
  const glassDoorModel = res.data.glassDoorLogoType === '1' ? models.men_p : models.men_r;

  // 添加门楣
  const lintelModel = ['1', '6'].includes(res.data.lintelLogoType) ? models.menmei_logo : models.menmei_led;

  // 添加前门
  const doorModelFront = res.data.doorHeadType === '1' ? models.menban_b_ping : models.menban_h_ping;
  doorModelFront.add(glassDoorModel.clone());
  doorModelFront.add(lintelModel.clone());
  doorModelFront.position.set(-microConfig.doorWidth / 2, 0, 0);

  // 添加后门
  const doorModelBack = res.data.doorHeadType === '1' ? models.menban_b : models.menban_h;
  doorModelBack.add(glassDoorModel.clone());
  doorModelBack.add(lintelModel.clone());
  doorModelBack.position.set(microConfig.totalLength + microConfig.doorWidth / 2, 0, 0);
  doorModelBack.rotation.y = Math.PI;

  transparentMesh.push(doorModelFront, doorModelBack)

  microGroup.add(doorModelFront, doorModelBack);
  scene.add(microGroup);
};

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
  renderer.setClearColor(new Color(0xFAFAFA));
  renderer.setSize(containerRect.width, containerRect.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
};

const initCamera = () => {
  camera = new PerspectiveCamera(45, containerRect.width / containerRect.height, 0.1, 3000);
  const calcCameraX = microConfig.totalLength / 2 + 300;
  camera.position.set(-(calcCameraX < 640 ? 640 : calcCameraX), 188, 587);
  // camera.lookAt(100, 10, 10);

  const resize = () => {
    containerRect = containerRef.value.getBoundingClientRect();
    camera.aspect = containerRect.width / containerRect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(containerRect.width, containerRect.height);
  };

  window.addEventListener('resize', resize);
};

const initHelper = () => {
  // 添加坐标格辅助对象
  const gridHelper = new GridHelper(1600, 40);
  scene.add(gridHelper);

  // 添加坐标轴辅助对象 红x绿y蓝z
  const axes = new AxesHelper(800);
  scene.add(axes);

  // 添加dat.gui
  // const gui = new dat.GUI();
  // gui.domElement.style = 'position:absolute;top:65px;right:10px;';
  // gui.add(controlData, 'rotationSpeed', 0, 0.5);
  // gui.add(controlData, 'bouncingSpeed', 0, 0.5);
  // gui.add(controlData, 'numberOfObjects').listen();

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
  controls.dampingFactor = 0.5;
  controls.maxDistance = 1600;
  controls.maxPolarAngle = Math.PI * 0.5; // 半圆，禁底部翻转
  controls.saveState();
};

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

const initModels = async () => {
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

  const percentageStatusList = ref(Array.from({length: mtlFileNames.length}).map(_ => ({mtl: 0, obj: 0})));

  const onProcess = (index: number, xhr: object, type: string) => {
    percentageStatusList.value[index][type] = (xhr.loaded / xhr.total) * 100;

    const mtlTotal = percentageStatusList.value.reduce((pre, n) => pre + n.mtl, 0) / mtlFileNames.length;
    const objTotal = percentageStatusList.value.reduce((pre, n) => pre + n.obj, 0) / mtlFileNames.length;

    percentage.value = parseInt(((mtlTotal + objTotal) / 2).toFixed());
  };

  await Promise.all(mtlFileNames.map(async (fileName: string, index: number) => {
    const objLoader = new OBJLoader();
    // 加载MTL文件
    const materials = await MTLLoaderPromise(directoryPath + fileName + '.mtl', {
      onProcess: xhr => onProcess(index, xhr, 'mtl'),
    });
    materials.preload(); // 预加载材质
    objLoader.setMaterials(materials);

    // 加载OBJ文件
    const object = await TextureLoaderCommonPromise(objLoader, directoryPath + fileName + '.obj', {
      onProcess: xhr => onProcess(index, xhr, 'obj'),
    });
    models[fileName] = object;
    return object;
  }));

  // 消除机柜左侧白边
  ['jg_30', 'jg_60', 'jg_80'].forEach(name => {
    models[name].getObjectByName('jigui').material.forEach(item => {
      if (item.name === 'Material__1705') {
        item.color.set(0x000000);
      }
    });
  });
};

const renderScene = () => {
  controls.update();
  stats.update();

  cabinetNameMeshAnimation();

  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
};

const onResetOrbitControls = () => {
  controls.reset();
};

const onViewChange = (item) => {
  changeMaterial(item.type !== '3d');

  console.log(models.jg_60);
}

const changeMaterial = (isTransparent: boolean) => {
  transparentMesh.forEach(mesh => {
    mesh.traverse(child => {
      if (child.isMesh && child.material) {
        if (isTransparent) {
          // 保存原始材质
          if (!child.savedMaterial && child.material) {
            if (Array.isArray(child.material)) {
              child.savedMaterial = child.material.map(material => material.clone());
            } else {
              child.savedMaterial = child.material.clone();
            }
          }
          // 设置透明材质
          child.material = new MeshBasicMaterial({
            transparent: true,
            color: 0x666666,
            opacity: 0.15
          });
        } else {
          // 还原原始材质
          if (child.savedMaterial) {
            child.material = child.savedMaterial;
          }
        }
      }
    });
  })
};

const addWrapsMesh = (mesh) => {
  if (mesh.material.map.wrapS === RepeatWrapping) {
    cabinetNameWrapsMesh.push(mesh);
  }
}

/**
 * 机柜名称如果超出，滚动展示
 */
const cabinetNameMeshAnimation = () => {
  cabinetNameWrapsMesh.forEach(mesh => {
    mesh.material.map.offset.x += 0.005;
  });
}

onMounted(async () => {
  await initModels();
  initSceneRenderer();
  await initCabinet();
  initCamera();
  initHelper();
  initLight();
  // 渲染场景
  containerRef.value?.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  renderScene();
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
    bottom: 20px;
    right: 20px;

    .operation-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: #1890ff;
      cursor: pointer;
    }
  }
}
</style>
