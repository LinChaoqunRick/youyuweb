import {
  Button,
  Form, Input, Tag,
} from 'antd';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  ReactTable, ReactTableRef,
} from '@youyu/shared/components-react';
import { BatchButton, ReactTableColumns } from '@youyu/shared/types/components-react';
import type { Message } from '@youyu/shared/types/vo';
import { PAGE_LINK, DELETE_LINK } from '@youyu/shared/apis';
import http from '@youyu/shared/network';

function Link() {
  const [form] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | undefined>();
  const tableRef = useRef<ReactTableRef>(null);

  function showHideMessages(ids: string, status: number) {
    // http.post(SET_MANAGE_MESSAGE_STATUS, { ids, status }, { successTip: '操作成功' }).then(() => {
    //   tableRef.current?.refresh();
    // });
  }

  const columns: ReactTableColumns<Message> = useMemo(() => [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: '25%',
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
      width: '14%',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: '15%',
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

  const batchButtons: BatchButton<Message>[] = useMemo(() => [
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

  const handleSearch = (values: Record<string, any>) => {
    setParams(values);
  };

  useEffect(() => {
    form.submit();
  }, []);

  return (
    <div className="access-message flex-view">
      <div className="header-search rounded-sm">
        <Form
          layout="inline"
          form={form}
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
            showDelete
            batchButtons={batchButtons}
            columns={columns}
            params={params}
          />
        )}
      </div>
    </div>
  );
}

export default Link;
