import React, { useState, useCallback } from 'react';
import { Modal } from 'antd';
import type { ModalProps, FormInstance } from 'antd';
import { merge } from 'lodash';

export type ModalComponentProps<T> = {
  form?: FormInstance;
  data?: T
};

type UseModalConfig<T> = ModalProps & {
  /** 渲染在 Modal 内的组件，可以是 ReactNode 或函数 */
  component?: React.ReactNode | ((_prop?: ModalComponentProps<T>) => React.ReactNode);
  componentProps?: ModalComponentProps<T>;
  beforeConfirm?: () => boolean | Promise<boolean>;
};

function useModal<T>(defaultConfig: UseModalConfig<T>) {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<UseModalConfig<T>>(defaultConfig);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const openModal = useCallback((newConfig?: UseModalConfig<T>) => {
    setConfig(prev => merge({}, prev, newConfig));
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    setConfirmLoading(false);
  }, []);

  const onOk = useCallback(async () => {
    const { beforeConfirm } = config;
    setConfirmLoading(true);
    try {
      if (beforeConfirm) {
        const res = await beforeConfirm();
        setVisible(!res);
      } else {
        setVisible(false);
      }
    } finally {
      setConfirmLoading(false);
    }
  }, [config]);

  const ModalRender = useCallback(() => {
    return (
      <Modal
        open={visible}
        destroyOnHidden
        maskClosable={false}
        confirmLoading={confirmLoading}
        wrapClassName="use-modal-wrapper"
        onOk={onOk}
        onCancel={closeModal}
        {...config}
      >
        {typeof config.component === 'function'
          ? config.component(config.componentProps)
          : config.component}
      </Modal>
    );
  }, [visible, config]);

  return {
    openModal,
    closeModal,
    ModalRender,
  };
}

export default useModal;
