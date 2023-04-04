import {createApp} from "vue";
import Modal from "@/libs/tools/openModal/Modal.vue";
import store from "@/store";
import router from "@/router";

export default function openModal(config = {}) {
  config = Object.assign({}, {
    cancelText: "取消",
    okText: "确定",
    componentProps: {},
    beforeConfirm: null,
  }, config);
  if (!config.component) {
    throw new Error("component is required!");
  }
  const Comp = createApp({
    name: "ModalContainer",
    inheritAttrs: false,
    components: {
      [config.component.name]: config.component,
      Modal
    },
    provide() {
      return {
        modal: this
      };
    },
    data() {
      return {
        confirmLoading: false
      };
    },
    template: `
      <Modal v-bind="$props" class="modal-body">
        <div class="modal-content" style="font-size:14px">
          <component ref="modalBody" is="${config.component.name}" v-bind="componentProps"/>
        </div>
        <!--<template slot="footer">
          <Button v-if="cancelText" type="text" @click="onCancel" :size="buttonSize">
            {{cancelText}}
          </Button>
          <Button v-if="okText" type="primary" @click="onOk" :size="buttonSize" :loading="confirmLoading">
            {{okText}}
          </Button>
        </template>-->
      </Modal>
    `,
    props: {
      componentProps: {
        type: Object,
        default: () => ({})
      },
      ...Modal.props,
      ...{
        title: {
          type: String,
          default: "提示"
        },
        buttonSize: {
          type: String,
          default: "large"
        }
      }
    },
    methods: {
      onCancel(action) {
        const value = action === false ? false : 0;
        this.$emit("cancel", value);
      },
      onOk(params) {
        if (this.$refs.modalBody && typeof this.$refs.modalBody.beforeConfirm === "function") {
          this.$refs.modalBody.beforeConfirm((result) => this.$emit("ok", result != null ? result : params));
        } else {
          this.$emit("ok", params);
        }
      },
    }
  });
  return new Promise((resolve, reject) => {
    const modal = document.createElement("div");
    console.log(Comp);
    const instance = Comp.mount(modal);
    document.body.appendChild(modal);

    const close = () => {
      instance.value = false;
      setTimeout(() => {
        instance.$destroy();
        if (instance.$el) {
          document.body.removeChild(instance.$el);
        }
      }, 300);
    };
  });
}
