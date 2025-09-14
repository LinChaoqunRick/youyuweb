import {
  Button, Form, Input, Tag, Radio,
} from 'antd';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { ReactTable, ReactTableRef } from '@youyu/shared/components-react';
import { BatchButton, ReactTableColumns } from '@youyu/shared/types/components-react';
import type { Link } from '@youyu/shared/types/vo';
import {
  PAGE_LINK, CREATE_LINK, UPDATE_LINK, DELETE_LINK, SHOW_HIDE_LINK,
} from '@youyu/shared/apis';
import useModal, { ModalComponentProps } from '@/hooks/useModal';
import http from '@youyu/shared/network';
import { merge } from 'lodash';

function LinkForm(props?: ModalComponentProps<Link>) {
  const { form, data } = props!;

  // 手动赋值，因为 initialValues 只在 Form 第一次渲染时生效
  useEffect(() => {
    if (data && form) {
      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
      <Form.Item label="名称" name="name" rules={[{ required: true, message: '此项必填' }]}>
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="地址" name="address" rules={[{ required: true, message: '此项必填' }]}>
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="头像" name="avatar" rules={[{ required: true, message: '此项必填' }]}>
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="简介" name="description">
        <Input placeholder="请输入" allowClear />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Radio.Group block buttonStyle="solid">
          <Radio.Button value={0}>隐藏</Radio.Button>
          <Radio.Button value={1}>显示</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}

function Link() {
  const [searchForm] = Form.useForm();
  const [addEditForm] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | undefined>();
  const tableRef = useRef<ReactTableRef>(null);
  const { openModal, ModalRender } = useModal({
    title: '新增友链',
    width: 600,
    component: LinkForm,
    componentProps: {
      form: addEditForm,
    },
  });

  function onAddEdit(type: 'add' | 'edit', data?: Link) {
    const isEdit = type === 'edit';
    openModal({
      componentProps: {
        data: isEdit ? data : {
          name: '', address: '', description: '', avatar: '', status: 1,
        },
      },
      async beforeConfirm() {
        const values = await addEditForm.validateFields();
        if (values) {
          const result = await http.post(
            isEdit ? UPDATE_LINK : CREATE_LINK,
            isEdit ? merge({ id: data!.id }, values) : values,
            { successTip: '操作成功!' },
          );
          tableRef.current?.refresh();
          return !!result;
        }
        return false;
      },
    });
  }

  function showHideMessages(ids: string, status: number) {
    http.post(SHOW_HIDE_LINK, { ids, status }, { successTip: '操作成功' }).then(() => {
      tableRef.current?.refresh();
    });
  }

  const columns: ReactTableColumns<Link> = useMemo(() => [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
      render: (data: string) => {
        return <a target='_blank' href={data} rel="noreferrer">{data}</a>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (data: string) => {
        return data ? <Tag color="#87d068">显示</Tag> : <Tag color="#a000a0">隐藏</Tag>;
      },
    },
    {
      title: '添加时间',
      width: '20%',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      actions: data => {
        return [
          {
            title: data.status ? '隐藏' : '显示',
            color: data.status ? 'purple' : 'green',
            onClick: value => showHideMessages(`${value.id}`, data.status === 1 ? 0 : 1),
          },
        ];
      },
    },
  ], []);

  const batchButtons: BatchButton<Link>[] = useMemo(() => [
    {
      title: '显示',
      color: 'green',
      onClick: selectedRowKeys => {
        showHideMessages(selectedRowKeys.join(','), 1);
      },
    },
    {
      title: '隐藏',
      color: 'purple',
      onClick: selectedRowKeys => {
        showHideMessages(selectedRowKeys.join(','), 0);
      },
    },
  ], []);

  const handleSearch = (values: Record<string, never>) => {
    setParams(values);
  };

  useEffect(() => {
    searchForm.submit();
  }, []);

  return (
    <div className="access-message flex-view">
      <div className="header-search rounded-sm">
        <Form
          layout="inline"
          form={searchForm}
          initialValues={{ variant: 'filled', layout: 'inline' }}
          onFinish={handleSearch}
        >
          <Form.Item label="名称" name="name">
            <Input placeholder="名称" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="access-content">
        {params && (
          <ReactTable
            ref={tableRef}
            url={PAGE_LINK}
            deleteUrl={DELETE_LINK}
            showSelection
            showAdd
            showEdit
            showDelete
            batchButtons={batchButtons}
            columns={columns}
            params={params}
            onAdd={() => onAddEdit('add')}
            onEdit={data => onAddEdit('edit', data)}
          />
        )}
        <ModalRender />
      </div>
    </div>
  );
}

export default Link;
