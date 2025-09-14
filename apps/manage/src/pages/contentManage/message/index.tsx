import {
  Button, Form, DatePicker, Input, Tag, Select,
} from 'antd';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { rangePresets } from '@/libs/config/formConfig.ts';
import { getAreaNameByCode } from '@youyu/shared/utils/locate-utils.ts';
import {
  ReactTable, ReactTableRef,
} from '@youyu/shared/components-react';
import { BatchButton, ReactTableColumns } from '@youyu/shared/types/components-react';
import type { Message } from '@youyu/shared/types/vo';
import { GET_MANAGE_MESSAGE_PAGE, SET_MANAGE_MESSAGE_STATUS, DELETE_MANAGE_MESSAGE } from '@youyu/shared/apis';
import http from '@youyu/shared/network';

const { RangePicker } = DatePicker;

function UserMessage() {
  const [form] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | undefined>();
  const tableRef = useRef<ReactTableRef>(null);

  function showHideMessages(ids: string, status: number) {
    http.post(SET_MANAGE_MESSAGE_STATUS, { ids, status }, { successTip: '操作成功' }).then(() => {
      tableRef.current?.refresh();
    });
  }

  const columns: ReactTableColumns<Message> = useMemo(() => [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: '6%',
      render: data => {
        return data || '-';
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '15%',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: '25%',
    },
    {
      title: '区域',
      dataIndex: 'adcode',
      key: 'adcode',
      width: '15%',
      render: data => {
        return getAreaNameByCode(data);
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
      title: '留言时间',
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
    if (values.RangePicker?.length === 2) {
      values.startTime = values.RangePicker[0]?.format('YYYY-MM-DD');
      values.endTime = values.RangePicker[1]?.format('YYYY-MM-DD');
      delete values.RangePicker;
    }
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
          <Form.Item label="时间范围" name="RangePicker">
            <RangePicker presets={rangePresets} allowClear />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Select
              placeholder="请选择状态"
              allowClear
              options={[
                { value: '1', label: '显示' },
                { value: '0', label: '隐藏' },
              ]}
            />
          </Form.Item>
          <Form.Item label="关键词" name="keyword">
            <Input placeholder="用户ID/昵称/内容" allowClear />
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
            url={GET_MANAGE_MESSAGE_PAGE}
            deleteUrl={DELETE_MANAGE_MESSAGE}
            showSelection
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

export default UserMessage;
