<template>
  <div class="y-table">
    <div class="table-body">
      <a-spin :spinning="loading">
        <slot :dataList="dataList">
          <div v-if="failed" @click="initData" class="retry-load">
            <i-refresh theme="outline" size="15" fill="#1890ff"/>
            <span class="loading-text">加载失败，重新加载</span>
          </div>
          <div class="table-no-data" v-else-if="!loading && !dataList.length">
            暂无数据
          </div>
          <a-skeleton active v-else></a-skeleton>
        </slot>
      </a-spin>
    </div>
    <div class="table-pagination">
      <a-pagination v-if="!!total"
                    v-model:current="current"
                    v-model:pageSize="size"
                    v-bind="paginationConfig"
                    :total="total"
                    :show-total="() => `共${total}条`"
                    @change="handleChange">
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
import {computed, onDeactivated, ref, watch} from 'vue';
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";

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
    default: () => ({
      pageSize: 10
    })
  },
  loadImmediate: { // 是否一开始就获取数据
    type: Boolean,
    default: true
  },
  beforeGetData: {
    type: Function
  },
  paginationProps: {
    type: Object,
    default: () => ({})
  }
});

const initPage = Number(route.params.page);

const current = ref(initPage || 1);
const size = ref(props.params.pageSize);
const total = ref(0);
const dataList = ref([]);
const loading = ref<boolean>(false);
const failed = ref<boolean>(false);
const paginationConfig = computed(() => Object.assign({}, {
  // showQuickJumper: true,
  // showLessItems: true,
  showSizeChanger: false
}, props.paginationProps));

const initData = async () => {
  loading.value = true;
  failed.value = false;
  if (props.beforeGetData) {
    const result = await props.beforeGetData();
    if (!result) {
      return loading.value = false;
    }
  }
  dispatch(props.listUrl, Object.assign({}, props.params, {
    pageNum: current.value,
    pageSize: size.value
  })).then(res => {
    dataList.value = [];
    document.documentElement.scrollTop = 0;
    if (route.params.page && (route.params.page != res.data.current)) {
      updateRoutePageParam(res.data.current);
    }
    total.value = res.data.total;
    dataList.value = res.data.list;
    emit("onLoaded");
  }).catch(() => {
    dataList.value = [];
    failed.value = true;
  }).finally(() => {
    loading.value = false;
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
  console.log(page, pageSize);
  size.value = pageSize;
  initData();
};

const updateRoutePageParam = (page: number) => {
  const fullPath = route.fullPath;
  const [path, query] = fullPath.split("?");
  const pathItems = path.split("/");
  pathItems[pathItems.length - 1] = String(page);
  const combinePath = query ? [pathItems.join("/"), query].join("?") : pathItems.join("/");
  history.pushState(null, "", combinePath);
}

// const paramsPageWatcher = watch(() => route.params.page, (newVal) => {
//   console.log(newVal);
// })

onDeactivated(() => {
  // paramsPageWatcher();
})

defineExpose({
  page: initPage,
  initData,
  refreshData
})
</script>

<style lang="scss" scoped>
.y-table {
  .table-body {

    ::v-deep(.ant-spin-nested-loading) {
      width: 100%;
      height: 100%;

      .ant-spin-container {
        height: 100%;
      }
    }

    .retry-load {
      cursor: pointer;
    }

    .table-no-data, .retry-load {
      width: 100%;
      min-height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;

      .loading-text {
        margin-left: 4px;
      }
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
      .ant-pagination-item, .ant-pagination-jump-next {
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

      .ant-pagination-options {
        .ant-pagination-options-quick-jumper {
          input {
            text-align: center;
            padding: 4px;
          }
        }
      }
    }
  }
}
</style>
