<template>
  AlbumList
  <ImagePreview :list="list"/>
</template>

<script>
  import ImagePreview from "@/components/common/utils/image/ImagePreview.vue";

  export default {
    name: "AlbumList",
    components: {
      ImagePreview
    },
    data(){
      return{
        list: [
          'https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/background/cloud.jpg',
          'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
          'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        ]
      }
    }
  }
</script>

<style scoped>

</style>
