<template>
  <div class="micro-module">
    <div ref="statsRef"></div>
    <div class="three-d-container" ref="containerRef"></div>
  </div>
</template>

<script lang="ts" setup>
import Stats from 'stats.js';
import {
  AxesHelper,
  BoxGeometry,
  GridHelper,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  AmbientLight,
  WebGLRenderer,
  DoubleSide
} from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {onMounted, reactive, ref} from 'vue';
import * as dat from 'dat.gui';

const statsRef = ref<HTMLDivElement>();

const containerRef = ref<HTMLDivElement>();
let scene, renderer, camera, controls, stats, plane, cube, sphere;
let containerRect, step = 0;
const controlData = reactive({
  rotationSpeed: 0.01,
  bouncingSpeed: 0.01,
  numberOfObjects: 0,
  addCube: function () {
    const cubeGeometry = new BoxGeometry(4, 4, 4);
    const cubeMaterial = new MeshBasicMaterial({
      color: 0xff0000,
      wireframe: false
    })
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-30 + Math.round(Math.random() * 60), Math.round(Math.random() * 5), -20 + Math.round(Math.random() * 40));
    cube.castShadow = true;
    scene.add(cube);
    console.log(this);
    this.numberOfObjects = scene.children.length;
  }
})

const initSceneRenderer = () => {
  // 渲染区域Rect
  containerRect = containerRef.value.getBoundingClientRect();

  // 初始化场景
  scene = new Scene();

  // 初始化渲染器
  renderer = new WebGLRenderer();
  renderer.setClearColor(new Color(0xeeeeee));
  renderer.setSize(containerRect.width, containerRect.height);
  renderer.shadowMap.enabled = true;
}

const initCamera = () => {
  camera = new PerspectiveCamera(45, containerRect.width / containerRect.height, 0.1, 1000);
  camera.position.set(-80, 140, 80);
  camera.lookAt(scene.position);
}

const initHelper = () => {
  // 添加坐标格辅助对象
  const gridHelper = new GridHelper(200, 20);
  scene.add(gridHelper);

  // 添加坐标轴辅助对象 红x绿y蓝z
  const axes = new AxesHelper(60);
  scene.add(axes);

  // 添加dat.gui
  const gui = new dat.GUI();
  gui.domElement.style = 'position:absolute;top:65px;right:10px;'
  gui.add(controlData, 'rotationSpeed', 0, 0.5);
  gui.add(controlData, 'bouncingSpeed', 0, 0.5);
  gui.add(controlData, 'numberOfObjects').listen();
  gui.add(controlData, 'addCube');

  // 添加Stats
  stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.top = '65px';
  statsRef.value.append(stats.dom);

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.maxDistance = 200;
}

const initLight = () => {
  const spotLight = new AmbientLight(0xffffff);
  spotLight.castShadow = true;
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);
}

const initModels = () => {
  const planeGeometry = new PlaneGeometry(60, 20);
  const meshBasicMaterial = new MeshBasicMaterial({
    color: 0xcccccc,
    side: DoubleSide
  })
  plane = new Mesh(planeGeometry, meshBasicMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  scene.add(plane);

  const cubeGeometry = new BoxGeometry(4, 4, 4);
  const cubeMaterial = new MeshBasicMaterial({
    color: 0xff0000,
    wireframe: false
  })
  cube = new Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(2, 2, 2);
  cube.castShadow = true;
  scene.add(cube);

  const sphereGeometry = new SphereGeometry(4);
  const sphereMaterial = new MeshBasicMaterial({
    color: 0x7777ff,
    wireframe: false
  })
  sphere = new Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  sphere.position.set(20, 4, 2);
  scene.add(sphere);
}

const renderScene = () => {
  controls.update();
  stats.update();
  scene.traverse(e => {
    if (e instanceof Mesh && e != plane) {
      e.rotation.x += controlData.rotationSpeed;
      e.rotation.y += controlData.rotationSpeed;
      e.rotation.z += controlData.rotationSpeed;
    }
  })

  cube.rotation.x += controlData.rotationSpeed;
  cube.rotation.y += controlData.rotationSpeed;
  cube.rotation.z += controlData.rotationSpeed;

  step += controlData.bouncingSpeed;
  sphere.position.x = 20 + 10 * Math.cos(step);
  sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

  requestAnimationFrame(renderScene)
  renderer.render(scene, camera);
}

const resize = () => {
  containerRect = containerRef.value.getBoundingClientRect();
  camera.aspect = containerRect.width / containerRect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(containerRect.width, containerRect.height);
}

window.addEventListener('resize', resize);

onMounted(() => {
  initSceneRenderer();
  initCamera();
  initHelper();
  initLight();
  initModels();

  // 渲染场景
  containerRef.value?.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  renderScene();
})

</script>

<style scoped lang="scss">
.micro-module {
  height: calc(100vh - 100px);

  .three-d-container {
    height: 100%;
  }
}
</style>