import { createApp } from 'vue';

import { Modal, Button } from 'ant-design-vue';
import Antd from 'ant-design-vue';

import IconPark from '@/libs/plugins/iconpark';
import router from '@/router';
import store from '@/store';

import type { ModalConfig } from './types';

export default function openModal<T>(config: ModalConfig): Promise<T> {
  const modalProps = { ...Modal.props };
  // 删除visible、confirmLoading用自定义
  Reflect.deleteProperty(modalProps, 'open');
  Reflect.deleteProperty(modalProps, 'confirmLoading');
  config = Object.assign(
    {},
    {
      cancelText: '取消',
      okText: '确定',
      componentProps: {},
      beforeConfirm: null,
    },
    config,
  );
  if (!config.component) {
    throw new Error('component is required!');
  }
  return new Promise((resolve, reject) => {
    const Comp = createApp(
      {
        name: 'ModalContainer',
        inheritAttrs: false,
        components: {
          [config.component.name as string]: config.component,
          Modal,
          Button,
        },
        provide() {
          return {
            modal: this,
          };
        },
        data() {
          return {
            confirmLoading: false,
            modalVisible: true,
          };
        },
        template: `
          <Modal v-model:open="modalVisible" v-bind="$props" class="modal-body" @cancel="handleCancel(false)">
            <div class="modal-content" style="font-size:14px">
              <component ref="modalBody" is="${config.component.name}" v-bind="componentProps" />
            </div>
            <template v-slot:closeIcon>
              <i-close theme="outline" size="18" fill="currentColor" />
            </template>
            <template v-slot:footer>
              <Button v-if="cancelText" type="text" @click="handleCancel" :size="buttonSize">
                {{ cancelText }}
              </Button>
              <Button v-if="okText" type="primary" @click="handleOk" :size="buttonSize" :loading="confirmLoading">
                {{ okText }}
              </Button>
            </template>
          </Modal>
        `,
        props: {
          componentProps: {
            type: Object,
            default: () => ({}),
          },
          ...modalProps,
          ...{
            title: {
              type: String,
              default: '提示',
            },
            buttonSize: {
              type: String,
              default: 'medium',
            },
          },
        },
        methods: {
          close() {
            this.modalVisible = false;
            setTimeout(() => {
              Comp.unmount();
              document.body.removeChild(modal);
            }, 100);
          },
          ok(params: any) {
            const done = () => {
              this.close();
              resolve(params ?? 1);
            };
            if (typeof config.beforeConfirm === 'function') {
              config.beforeConfirm(done, params);
            } else {
              done();
            }
          },
          handleCancel(action: boolean | undefined) {
            const value = action === false ? false : 0;
            this.close();
            reject(value);
          },
          handleOk() {
            if (this.$refs.modalBody && typeof this.$refs.modalBody.beforeConfirm === 'function') {
              this.$refs.modalBody.beforeConfirm(this.ok);
            } else {
              this.ok();
            }
          },
        },
      },
      config,
    )
      .use(store)
      .use(router)
      .use(Antd);
    IconPark(Comp);
    const modal = document.createElement('div');
    const instance = Comp.mount(modal);
    document.body.appendChild(modal);
  });
}
