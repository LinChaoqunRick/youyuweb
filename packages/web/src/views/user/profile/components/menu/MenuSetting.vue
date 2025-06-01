<template>
  <div class="menu-setting">
    <a-row>
      <a-col :span="6" v-for="item in menuItems">
        <a-checkbox v-model:checked="menuPermit[item.value]" :disabled="item.disabled">{{ item.title }}</a-checkbox>
      </a-col>
    </a-row>
    <div class="remind">
      <i-caution theme="outline" size="14" fill="currentColor" />
      <span class="remind-text">对其他用户只展示勾选的菜单，对您不受影响</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, toRaw } from 'vue';
import { useStore } from 'vuex';
import { cloneDeep } from 'lodash';
import { message } from 'ant-design-vue';
import openSpin from '@/libs/tools/openSpin';

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  userId: {
    type: [String, Number],
    required: true,
  },
});
const modal = inject('modal');
const { dispatch } = useStore();
const menuItems = ref([]);
const menuPermit = ref({});

function handleMenuItems() {
  const disabledMenus = ['动态', '时刻', '文章', '笔记', '专栏'];
  menuItems.value = cloneDeep(props.menuItems);
  menuItems.value.map(item => {
    item.disabled = disabledMenus.includes(item.title);
    return item;
  });
}

handleMenuItems();

function getProfileMenu() {
  const closeSpin = openSpin({
    componentProps: {
      tip: '加载中...',
    },
  });
  dispatch('getProfileMenu', { userId: props.userId })
    .then(res => {
      Object.keys(res.data).forEach(key => {
        if (key.startsWith('show')) {
          res.data[key] = !!res.data[key];
        }
      });
      menuPermit.value = res.data;
    })
    .finally(() => {
      closeSpin();
    });
}

getProfileMenu();

function beforeConfirm(done) {
  const menuResult = toRaw(menuPermit.value);
  Object.keys(menuResult).forEach(key => {
    if (key.startsWith('show')) {
      menuResult[key] = menuResult[key] ? 1 : 0;
    }
  });
  modal.confirmLoading = true;
  dispatch('setProfileMenu', menuPermit.value)
    .then(res => {
      if (res.data) {
        message.success('保存成功');
        done();
      } else {
        message.error(res.message);
      }
    })
    .finally(() => {
      modal.confirmLoading = false;
    });
}

defineExpose({
  beforeConfirm,
});
</script>

<style lang="scss" scoped>
.menu-setting {
  user-select: none;

  ::v-deep(.ant-checkbox-wrapper) {
    margin-bottom: 10px;
  }

  .remind {
    color: #ff0000;
    margin-top: 6px;

    .remind-text {
      margin-left: 6px;
    }
  }
}
</style>
