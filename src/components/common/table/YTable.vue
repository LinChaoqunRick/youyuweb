<template>
  <div class="y-table">
    <div class="table-body">
      <slot :dataList="dataList">
        <div class="table-no-data" v-if="finished && !dataList.length">
          暂无数据
        </div>
        <div class="table-skeleton" v-else>
          <a-skeleton active avatar v-for="item in 10"></a-skeleton>
        </div>
      </slot>
    </div>
    <div class="table-pagination" v-if="!!dataList.length">
      <a-pagination v-model:current="current"
                    v-model:pageSize="size"
                    :total="total"
                    :show-total="total => `共${total}条`"
                    @change="handleChange"
                    @showSizeChange="handleSizeChange">
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, toRef} from 'vue';
  import {useStore} from "vuex";
  import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

  const emit = defineEmits(['onLoaded']);

  const route = useRoute();
  const router = useRouter();
  const {dispatch} = useStore();
  const props = defineProps({
    listUrl: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    loadImmediate: { // 是否一开始就获取数据
      type: Boolean,
      default: true
    }
  });
  const page = Number(route.params.page);

  const current = ref(page || 1);
  const size = ref(15);
  const total = ref(0);
  const dataList = ref([]);
  const finished = ref(false);


  const initData = () => {
    finished.value = false;
    dataList.value = [];
    dispatch(props.listUrl, Object.assign({}, {
      pageNum: current.value,
      pageSize: size.value
    }, props.params)).then(res => {
      document.documentElement.scrollTop = 0;
      router.push({params: {page: res.data.current}})
      total.value = res.data.total;
      dataList.value = res.data.list;
      emit("onLoaded");
    }).finally(() => {
      finished.value = true;
    })
  }

  const refreshData = () => {
    dispatch(props.listUrl, Object.assign({}, {
      pageNum: current.value,
      pageSize: size.value
    }, props.params)).then(res => {
      total.value = res.data.total;
      dataList.value = res.data.list;
      emit("onLoaded");
    })
  }

  if (props.loadImmediate) {
    initData();
  }

  const handleChange = (page: number, pageSize: number) => {
    initData();
  };
  const handleSizeChange = (current: number, newSize: number) => {
    size.value = newSize;
  };

  defineExpose({
    page,
    initData,
    refreshData
  })
</script>

<style lang="scss" scoped>
  .y-table {
    .table-body {
      .table-no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
      }

      .table-skeleton {
        padding: 16px 24px;
        /*background-color: var(--youyu-body-background1);*/
        border-radius: 8px;

        ::v-deep(.ant-skeleton) {
          margin-bottom: 24px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .table-pagination {
      display: flex;
      justify-content: center;

      ::v-deep(.ant-pagination) {
        .ant-pagination-item {
          background-color: var(--pagination-background);
          border: var(--pagination-border);
          border-radius: 2px;

          a {
            color: var(--pagination-text);
          }

          &.ant-pagination-item-active {
            a {
              color: #1980ff;
            }
          }
        }

        .ant-pagination-total-text, .ant-pagination-prev, .ant-pagination-next, .ant-select-selector {
          padding: 0 6px;
          background-color: var(--pagination-background);
          border: var(--pagination-border);
          color: var(--pagination-text);
        }
      }
    }
  }
</style>
