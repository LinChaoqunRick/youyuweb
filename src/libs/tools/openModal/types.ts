import type { Component } from 'vue';

export interface ModalConfig {
  component: Component;
  cancelText?: string;
  okText?: string;
  componentProps?: object;
  maskClosable?: boolean;
  title: string;
  width?: number | string;
  wrapClassName?: string;
  beforeConfirm?: (done: (params?: any) => void, params: any) => void;
}

export interface OpenModal {
  confirmLoading: boolean;
}
