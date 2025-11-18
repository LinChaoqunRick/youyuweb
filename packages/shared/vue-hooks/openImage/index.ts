import Antd, { Image } from 'ant-design-vue';

import { createApp } from 'vue';
import { ImagePreview } from '../../components-vue';
import IconPark from '../../plugins/iconpark';
import type { ImageModalConfig } from './types';

export default function openImage(config: ImageModalConfig) {
  const imageProps = { ...Image.props };
  // 删除visible、confirmLoading用自定义
  if (!config.componentProps.list) {
    throw new Error('list is required!');
  }
  if (!Array.isArray(config.componentProps.list)) {
    throw new Error('list must be a array!');
  }

  return new Promise((resolve, reject) => {
    const Comp = createApp(
      {
        name: 'PreviewComp',
        inheritAttrs: false,
        components: {
          ImagePreview,
        },
        data() {
          return {
            visible: false,
          };
        },
        template: `
          <transition name="fade">
            <ImagePreview v-if="visible" v-bind="componentProps" @onClose="close" />
          </transition>
        `,
        props: {
          componentProps: {
            type: Object,
            default: () => ({}),
          },
          ...imageProps,
        },
        methods: {
          close() {
            this.visible = false;
            setTimeout(() => {
              Comp.unmount();
              document.body.removeChild(preview);
              resolve(true);
            }, 300);
          },
        },
        mounted() {
          this.visible = true;
        },
      },
      config as Record<string, any>,
    ).use(Antd);
    IconPark(Comp);
    const preview = document.createElement('div');
    Comp.mount(preview);
    document.body.appendChild(preview);
  });
}
