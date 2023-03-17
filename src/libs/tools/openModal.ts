import {createApp, h} from 'vue';
import {Modal} from 'ant-design-vue';

interface configType {
  component: object,
  componentProps?: object
}

export default function openModal(config: configType) {
  console.log("openModal");
  if (!config.component) {
    throw new Error("component is required")
  }
  const div = document.createElement('div');
  document.body.appendChild(div);

  const modalComponent = {
    template: `<Modal>123</Modal>`
  }

  const Comp = h(modalComponent, {});

  const app = createApp(Comp, {});
  app.mount(div);
}
