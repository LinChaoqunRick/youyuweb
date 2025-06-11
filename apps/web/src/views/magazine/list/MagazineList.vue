<template>
<!--  <div ref="statsRef"></div>-->
<!--  <div class="three-d-container" ref="containerRef"></div>-->
</template>

<!--<script lang="ts" setup>-->
<!--  import Stats from 'stats.js';-->
<!--  import {-->
<!--    AxesHelper, BoxGeometry,-->
<!--    Color,-->
<!--    Mesh,-->
<!--    MeshBasicMaterial, MeshLambertMaterial,-->
<!--    PerspectiveCamera,-->
<!--    PlaneGeometry,-->
<!--    Scene, SphereGeometry, SpotLight,-->
<!--    WebGLRenderer-->
<!--  } from 'three';-->
<!--  import {onMounted, ref} from 'vue';-->
<!--  import * as dat from 'dat.gui';-->

<!--  const statsRef = ref<HTMLDivElement>();-->
<!--  const stats = new Stats();-->
<!--  stats.showPanel(0);-->

<!--  const containerRef = ref<HTMLDivElement>();-->
<!--  const scene = new Scene();-->

<!--  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);-->
<!--  camera.position.set(-30, 40, 30);-->
<!--  camera.lookAt(scene.position);-->

<!--  const renderer = new WebGLRenderer();-->
<!--  renderer.setClearColor(new Color(0xeeeeee));-->
<!--  renderer.setSize(window.innerWidth, window.innerHeight);-->
<!--  renderer.shadowMap.enabled = true;-->

<!--  const axes = new AxesHelper(20);-->
<!--  scene.add(axes);-->

<!--  const planeGeometry = new PlaneGeometry(60, 20);-->
<!--  const meshBasicMaterial = new MeshLambertMaterial({-->
<!--    color: 0xcccccc-->
<!--  })-->
<!--  const plane = new Mesh(planeGeometry, meshBasicMaterial);-->
<!--  plane.receiveShadow = true;-->
<!--  plane.rotation.x = -0.5 * Math.PI;-->
<!--  plane.position.x = 15;-->
<!--  scene.add(plane);-->

<!--  const cubeGeometry = new BoxGeometry(4, 4, 4);-->
<!--  const cubeMaterial = new MeshLambertMaterial({-->
<!--    color: 0xff0000,-->
<!--    wireframe: false-->
<!--  })-->
<!--  const cube = new Mesh(cubeGeometry, cubeMaterial);-->
<!--  cube.position.set(2, 2, 2);-->
<!--  cube.castShadow = true;-->
<!--  scene.add(cube);-->

<!--  const sphereGeometry = new SphereGeometry(4);-->
<!--  const sphereMaterial = new MeshLambertMaterial({-->
<!--    color: 0x7777ff,-->
<!--    wireframe: false-->
<!--  })-->
<!--  const sphere = new Mesh(sphereGeometry, sphereMaterial);-->
<!--  sphere.castShadow = true;-->
<!--  sphere.position.set(20, 4, 2);-->
<!--  scene.add(sphere);-->

<!--  const spotLight = new SpotLight(0xffffff);-->
<!--  spotLight.castShadow = true;-->
<!--  spotLight.position.set(-40, 60, -10);-->
<!--  scene.add(spotLight);-->

<!--  const controlRef = ref({-->
<!--    rotationSpeed: 0.02,-->
<!--    bouncingSpeed: 0.03,-->
<!--    numberOfObjects: 0,-->
<!--    addCube: function () {-->
<!--      const cubeGeometry = new BoxGeometry(4, 4, 4);-->
<!--      const cubeMaterial = new MeshLambertMaterial({-->
<!--        color: 0xff0000,-->
<!--        wireframe: false-->
<!--      })-->
<!--      const cube = new Mesh(cubeGeometry, cubeMaterial);-->
<!--      cube.position.set(-30 + Math.round(Math.random() * 60), Math.round(Math.random() * 5), -20 + Math.round(Math.random() * 40));-->
<!--      cube.castShadow = true;-->
<!--      scene.add(cube);-->
<!--      this.numberOfObjects = scene.children.length;-->
<!--    }-->
<!--  })-->

<!--  if (document.querySelectorAll('.dg.ac>.dg.main.a').length === 0) {-->
<!--    const gui = new dat.GUI();-->
<!--    gui.domElement.style = 'position:absolute;top:65px;right:10px;'-->
<!--    gui.add(controlRef.value, 'rotationSpeed', 0, 0.5);-->
<!--    gui.add(controlRef.value, 'bouncingSpeed', 0, 0.5);-->
<!--    gui.add(controlRef.value, 'numberOfObjects').listen();-->
<!--    gui.add(controlRef.value, 'addCube');-->
<!--  }-->

<!--  let step = 0;-->

<!--  function renderScene() {-->
<!--    stats.update();-->
<!--    scene.traverse(e => {-->
<!--      if (e instanceof Mesh && e != plane) {-->
<!--        e.rotation.x += controlRef.value.rotationSpeed;-->
<!--        e.rotation.y += controlRef.value.rotationSpeed;-->
<!--        e.rotation.z += controlRef.value.rotationSpeed;-->
<!--      }-->
<!--    })-->

<!--    cube.rotation.x += controlRef.value.rotationSpeed;-->
<!--    cube.rotation.y += controlRef.value.rotationSpeed;-->
<!--    cube.rotation.z += controlRef.value.rotationSpeed;-->

<!--    step += controlRef.value.bouncingSpeed;-->
<!--    sphere.position.x = 20 + 10 * Math.cos(step);-->
<!--    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));-->

<!--    requestAnimationFrame(renderScene)-->
<!--    renderer.render(scene, camera);-->
<!--  }-->

<!--  renderScene();-->

<!--  window.addEventListener('resize', () => {-->
<!--    camera.aspect = window.innerWidth / window.innerHeight;-->
<!--    camera.updateProjectionMatrix();-->
<!--    renderer.setSize(window.innerWidth, window.innerHeight);-->
<!--  })-->

<!--  onMounted(() => {-->
<!--    stats.dom.style.top = '65px';-->
<!--    statsRef.value?.append(stats.dom);-->

<!--    containerRef.value?.appendChild(renderer.domElement);-->
<!--    renderer.render(scene, camera);-->
<!--  })-->


<!--</script>-->

<style lang="scss" scoped>
  .three-d-container {

  }
</style>
