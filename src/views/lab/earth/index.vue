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
  Vector3,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  AmbientLight,
  WebGLRenderer,
  DoubleSide,
  SpotLight,
  PointLightHelper,
  SpotLightHelper,
  TextureLoader
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {onMounted, reactive, ref} from 'vue';

const statsRef = ref<HTMLDivElement>();

const containerRef = ref<HTMLDivElement>();
let scene, renderer, camera, controls, stats, plane, cube, sphere, cube2;
let containerRect, step = 0;

const initSceneRenderer = () => {
  // 渲染区域Rect
  containerRect = containerRef.value.getBoundingClientRect();

  // 初始化场景
  scene = new Scene();

  // 初始化渲染器
  renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setClearColor(new Color(0x666666));
  renderer.setSize(containerRect.width, containerRect.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
}

const initCamera = () => {
  camera = new PerspectiveCamera(45, containerRect.width / containerRect.height, 0.1, 1000);
  camera.position.set(-80, 140, 80);
  camera.lookAt(scene.position);
}

const initHelper = () => {
  // 添加坐标轴辅助对象 红x绿y蓝z
  const axes = new AxesHelper(100);
  scene.add(axes);

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
  const ambientLight = new AmbientLight(0xffffff, 1);
  scene.add(ambientLight);
}

const initModels = () => {
  // 加载地球贴图
  const earthTexture = new TextureLoader().load('/static/earth/earth.jpg');

  console.log(earthTexture);
  // 球
  const sphereGeometry = new SphereGeometry(60, 120, 120);
  const sphereMaterial = new MeshLambertMaterial({
    // color: 0x1677ff,
    map: earthTexture
  })
  sphere = new Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

}

const renderScene = () => {
  controls.update();
  stats.update();

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
