<template>
  <div class="technology-list">
    <div v-for="item in technologyList" :style="{background: item.color}" :title="item.name"
         class="tech-item cp" :class="[item.name]">
      <img :src="'/static/images/logo/'+item.name+'.svg'" :alt="item.name"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const technologyList = [
  {
    name: 'vue',
    link: '',
    color: '#b8f0ae'
  },
  {
    name: 'vite',
    link: '',
    image: '',
    color: '#937df7'
  },
  {
    name: 'javascript',
    link: '',
    image: '',
    color: '#f7cb4f'
  },
  {
    name: 'typescript',
    link: '',
    color: '#007acc',
  },
  {
    name: 'ant-design',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'nodejs',
    link: '',
    color: '#333333',
  },
  {
    name: 'git',
    link: '',
    color: '#df5b40',
  },
  {
    name: 'axios',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'threejs',
    link: '',
    color: '#fcb825',
  },
  {
    name: 'java',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'springcloud',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'nacos',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'aliyun',
    link: '',
    color: '#ff6a00',
  },
  {
    name: 'mybatis',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'mybatisplus',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'mysql',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'postman',
    link: '',
    color: '#ff6c37',
  },
  {
    name: 'tengxunyun',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'linux',
    link: '',
    color: '#ffffff',
  },
  {
    name: 'redis',
    link: '',
    color: '#ff4545',
  },
  {
    name: 'docker',
    link: '',
    image: '',
    color: '#1d63ed'
  },
  {
    name: 'amap',
    link: '',
    image: '',
    color: '#ffffff'
  },
]
</script>

<style scoped lang="scss">
.technology-list {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-gap: 16px;

  .tech-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 108px;
    width: 108px;
    margin: 0 16px 16px 0;
    background-color: #ffffff;
    border-radius: 30px;
    box-shadow: 0 2px 16px -3px rgba(0, 0, 0, 0.15);

    img {
      height: 64px;
      width: 64px;
    }
  }

  .aliyun, .javascript, .typescript, .threejs, .redis, .amap, .postman {
    img {
      height: 56px;
      width: 56px;
    }
  }
}
</style>
