<template>
  <div class="menu-setting">
    <a-checkbox-group v-model:value="value" style="width: 100%">
      <a-row>
        <a-col :span="6" v-for="item in props.menuItems">
          <a-checkbox :value="item.value">{{item.title}}</a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';

  const props = defineProps({
    menuItems: {
      type: Array
    }
  })

  const value = ref([])
</script>

<style lang="scss" scoped>
  .menu-setting {
    ::v-deep(.ant-checkbox-group) {
      .ant-checkbox-wrapper {
        margin-bottom: 6px;
      }
    }
  }
</style>
