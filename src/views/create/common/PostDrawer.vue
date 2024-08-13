<template>
  <div class="create-post-info">
    <a-drawer title="发布文章" width="500" :open="visible" @close="onClose" class="create-post-drawer">
      <template #closeIcon>
        <i-close theme="outline" size="20" fill="#909090"/>
      </template>
      <a-form :model="formValidate" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef">
        <a-form-item label="文章分类" name="categoryId">
          <a-tree-select
            v-model:value="formValidate.categoryId"
            show-search
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择"
            allow-clear
            tree-default-expand-all
            :tree-data="treeData"
            :fieldNames="{ value: 'id' }"
          >
            <template #title="{ value: val, title }">
              <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
              <template v-else>{{ title }}</template>
            </template>
          </a-tree-select>
        </a-form-item>
        <a-form-item label="标签" name="tags">
          <template v-for="(tag, index) in formValidate.tags" :key="tag">
            <a-tag closable color="#1890ff" @close="handleClose(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
            v-if="state.inputVisible"
            ref="inputRef"
            v-model:value="state.inputValue"
            :maxlength="15"
            type="text"
            :style="{ width: '78px' }"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag v-if="!state.inputVisible && formValidate.tags.length<3"
                 @click="showInput"
                 class="new-tag">
            <i-plus theme="outline" size="14" fill="currentColor"/>
            新建
          </a-tag>
        </a-form-item>
        <a-form-item label="封面" name="thumbnail" class="post-thumbnails">
          <div class="select-from-post">
            <div>
              从
              <a-button type="link" :disabled="restNum<=0" @click="openCoverSelectModal('post')">文章</a-button>
              或
              <a-button type="link" :disabled="restNum<=0" @click="openCoverSelectModal('default')">预设</a-button>
              中选取
            </div>
          </div>
          <UploadFile :disabled="formValidate.thumbnail.length>=3" auto-upload @uploadSuccess="uploadSuccess"/>
          <div class="file-list">
            <div v-for="(file, index) in formValidate.thumbnail" :key="file"
                 :style="{left: 40 * index + 'px',  top: 8 * index + 'px'}" class="image-preview">
              <img :src="file"/>
              <div class="image-mask">
                <div class="image-mask-content content-preview" @click="handlePreview(file, index)">
                  <i-preview-open theme="outline" size="16" fill="currentColor"/>
                  <div class="content-name">预览</div>
                </div>
                <div class="image-mask-content content-delete" @click="handleDelete(index)">
                  <i-delete-four theme="outline" size="16" fill="currentColor"/>
                  <div class="content-name">删除</div>
                </div>
              </div>
            </div>
          </div>
        </a-form-item>
        <a-form-item label="摘要" name="summary">
          <a-textarea
            v-model:value="formValidate.summary"
            :rows="4"
            show-count
            :maxlength="100"
          />
        </a-form-item>
        <a-form-item label="收录至专栏" name="columnIds">
          <a-select v-model:value="formValidate.columnIds" allow-clear mode="multiple" placeholder="最多可选择3个专栏"
                    @select="onColumnSelect">
            <a-select-option :value="item.id" v-for="item in columnList">{{ item.title }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="文章类型" name="createType">
          <a-radio-group v-model:value="formValidate.createType" button-style="solid">
            <a-radio-button v-for="item in createTypes" :value="item.code">{{ item.desc }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="原文连接" name="originalLink" v-if="formValidate.createType!=='0'">
          <a-input v-model:value="formValidate.originalLink"/>
        </a-form-item>
      </a-form>
      <template #footer>
        <div class="drawer-footer">
          <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
          <a-button type="primary" :loading="loading" @click="onSubmit">发布</a-button>
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PostDrawer'
}
</script>

<script setup lang="ts">
import {nextTick, reactive, ref, watch, computed} from 'vue';
import type {PropType,} from 'vue';
import type {TreeSelectProps} from 'ant-design-vue';
import {message} from 'ant-design-vue';
import {useStore} from 'vuex';
import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
import type {postData} from "@/views/post/detail/types";
import {getMarkDownImages} from "@/assets/utils/utils";
import openImage from "@/libs/tools/openImage";
import openModal from "@/libs/tools/openModal";
import CoverSelect from "@/views/create/common/CoverSelect.vue";
import defaultImages from "@/views/create/common/defaultImages";

const {dispatch} = useStore();

const props = defineProps({
  formValidate: {
    type: Object as PropType<postData>,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['handleSubmit', 'update:visible'])

const treeData = ref<TreeSelectProps['treeData']>([]);
const labelCol = {span: 6};
const wrapperCol = {span: 16};
const createTypes = ref([]);
const rulesRef = reactive({
  categoryId: [
    {
      required: true,
      message: '请选择文章分类',
    },
  ],
  summary: [
    {
      required: true,
      message: '请输入文章摘要',
    },
  ],
  createType: [
    {
      required: true,
      message: '请选择文章类型',
    },
  ],
  originalLink: [
    {
      required: true,
      message: '请输入原文链接',
    },
  ],
  thumbnail: [
    {
      required: true,
      message: '请至少上传一张首图',
    },
  ]
});
const formRef = ref();
const inputRef = ref();
const state = reactive({
  inputVisible: false,
  inputValue: '',
});
const postImages = ref([]);
const columnList = ref([]);
const loading = ref(false);
const restNum = computed(() => 3 - props.formValidate.thumbnail.length);

async function onSubmit() {
  const form = await formRef.value.validate().catch(console.log);
  if (form) {
    loading.value = true;
    emit('handleSubmit', () => {
      loading.value = false;
    });
  }
}

function getCategoryList() {
  dispatch("getCategoryList").then(res => {
    treeData.value = transferData(res.data);
  })
}

function getCreateTypes() {
  dispatch("getCreateTypes").then(res => {
    createTypes.value = res.data;
  })
}

function getColumnList() {
  dispatch('getColumnList', {userId: props.formValidate.userId}).then(res => {
    columnList.value = res.data;
    columnList.value.forEach(item => item.id = item.id + '')
  })
}

function uploadSuccess(fileList) {
  props.formValidate.thumbnail.push(fileList[0].url);
}

getCategoryList();
getCreateTypes();


watch(() => props.formValidate.userId, (newVal) => {
  if (newVal) {
    getColumnList();
  }
}, {immediate: true})

function transferData(data) {
  data.forEach(item => {
    item.title = item.name;
    if (item.pid > -1) {
      const parent = data.find(i => i.id === item.pid);
      if (parent) {
        if (!parent.children?.length) {
          parent.children = []
        }
        parent.children.push(item);
      }
    }
  })
  return data.filter(item => item.pid === -1)
}

const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};

const handleClose = (removedTag: string) => {
  props.formValidate.tags = props.formValidate.tags.filter(tag => tag !== removedTag);
};

function onClose() {
  emit('update:visible', false);
}

const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  if (inputValue && props.formValidate.tags.indexOf(inputValue) === -1) {
    props.formValidate.tags = [...props.formValidate.tags, inputValue];
  }
  Object.assign(state, {
    inputVisible: false,
    inputValue: '',
  });
};

const handlePreview = (item, index): void => {
  const list = props.formValidate.thumbnail.map(item => item.split("?")[0]);
  openImage({
    componentProps: {
      list,
      current: index
    }
  })
}

const handleDelete = (index): void => {
  if (props.formValidate.thumbnail.length === 1) {
    message.error("至少保留一张图片");
    return;
  }
  props.formValidate.thumbnail.splice(index, 1)
}

const openCoverSelectModal = (type: string) => {
  let images: string[] = [];
  if (type === 'post') {
    images = getMarkDownImages(props.formValidate.content).map(item => {
      return item.url.split("?")[0] + "?x-oss-process=style/detailThumb"
    })
  } else {
    images = defaultImages;
  }

  openModal({
    component: CoverSelect,
    title: `从${type === 'post' ? '文章' : '预设'}中选取封面(还可选${restNum.value}张)`,
    width: '60%',
    wrapClassName: 'post-image-select-modal',
    componentProps: {
      maxNum: restNum.value,
      images: images
    }
  }).then(res => {
    if (res) {
      props.formValidate.thumbnail.push(...res)
    }
  })
}

const onColumnSelect = (value) => {
  const columnIds = props.formValidate.columnIds;
  if (columnIds && columnIds.length > 3) {
    columnIds.pop();
  }
}

defineExpose({
  onSubmit,
})
</script>

<style lang="scss" scoped>
.create-post-info {
  ::v-deep(.ant-form) {
    .ant-form-item-control-input-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .ant-tag {
      padding: 1px 7px;
      /*margin-bottom: 6px;*/
    }

    .ant-input-textarea {
      width: 100%;
    }

    .new-tag {
      background: #fff;
      border-style: dashed;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.create-post-drawer {
  .post-thumbnails {
    position: relative;

    .select-from-post {
      position: absolute;
      top: 1px;
      left: 132px;

      button {
        padding: 0;
      }
    }

    .file-list {
      width: 180px;
      height: 120px;
      position: relative;

      .image-preview {
        height: 100%;
        width: 100%;
        position: absolute;
        transition: .3s;

        &:hover {
          transform: scale(1.05);
          z-index: 10;

          .image-mask {
            opacity: 1;
          }
        }

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .image-mask {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: rgba(0, 0, 0, .5);
          opacity: 0;
          transition: opacity .2s;

          .image-mask-content {
            display: flex;
            align-items: center;
            color: #fff;
            cursor: pointer;
            transition: .3s;

            &:nth-child(n+2) {
              margin-left: 10px;
            }

            &.content-preview {
              &:hover {
                color: #1890ff;
              }
            }

            &.content-delete {
              &:hover {
                color: #ee2626;
              }
            }

            .content-name {
              margin-left: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
