import { createApp } from 'vue';
import { Spin } from 'ant-design-vue';
import Antd from 'ant-design-vue';
import { addClass } from '@/assets/utils/utils';
import { merge } from 'lodash';

export default function openSpin(config = {}) {
  config = merge(
    {},
    {
      componentProps: {
        size: 'large',
      },
    },
    config
  );
  console.log(JSON.stringify(config));
  const Comp = createApp(
    {
      name: 'SpinComp',
      inheritAttrs: false,
      components: {
        Spin,
      },
      template: `
        <Spin v-bind="componentProps" />
      `,
      props: {
        componentProps: {
          type: Object,
          default: () => ({}),
        },
      },
    },
    config
  ).use(Antd);

  const close = () => {
    addClass(spin, 'animate__fadeOut');
    setTimeout(() => {
      Comp.unmount();
      document.body.removeChild(spin);
    }, 400);
  };
  const spin = document.createElement('div');
  addClass(spin, 'global-spin', 'animate__animated', 'animate__fadeIn');
  Comp.mount(spin);
  document.body.appendChild(spin);
  return close;
}
