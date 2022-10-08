<template>
  <div class="y-table">
    <div class="table-body">
      <slot name="content"></slot>
    </div>
    <div class="table-pagination">
      <a-pagination v-model:current="current" :total="total" @change="handleChange" @showSizeChange="handleSizeChange"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useStore} from "vuex";
  import Cookies from 'js-cookie';

  const {dispatch} = useStore();
  const props = defineProps({
    listUrl: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    }
  });

  const current = ref(1);
  const size = ref(10);
  const total = ref(0);

  Cookies.set("token", "666666", {expires: 7});

  const initData = () => {
    dispatch(props.listUrl, Object.assign({}, {
      page: current.value,
      count: size.value
    }, props.params)).then(res => {
      total.value = res.total;
    })
  }

  initData();

  const handleChange = (page, pageSize) => {
    initData();
  };
  const handleSizeChange = (current, newSize) => {
    size.value = newSize;
  }
</script>

<style scoped>

</style>
