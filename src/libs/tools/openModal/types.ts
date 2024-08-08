import type { Component } from 'vue';

export interface ModalConfig {
  component: Component;
  cancelText?: string;
  okText?: string;
  componentProps?: object;
  beforeConfirm?: (done: Function, params: any) => void;
}
