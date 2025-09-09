import {
  Button, Form, DatePicker, Input, Tag, Select, Space,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { rangePresets } from '@/libs/config/formConfig';
import { getAreaNameByCode } from '@youyu/shared/utils/locate-utils';
import { ReactTable } from '@youyu/shared/components-react';
import { GET_MANAGE_MESSAGE_PAGE } from '@youyu/shared/apis';
import { Logs } from '@youyu/shared/types/vo/logManage';
import { ColumnsType } from 'antd/es/table';
import { LogType } from '@youyu/shared/consts';
import type { TableProps } from 'antd';

const { RangePicker } = DatePicker;
const columns: ColumnsType<Logs> = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    key: 'userId',
    width: '8%',
    render: data => {
      return data || '-';
    },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
    width: '12%',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    width: '19%',
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    key: 'ip',
    width: '10%',
    render: data => {
      return <Tag color="#108ee9">{data}</Tag>;
    },
  },
  {
    title: '区域',
    dataIndex: 'adcode',
    key: 'adcode',
    width: '14%',
    render: data => {
      return getAreaNameByCode(data);
    },
  },
  {
    title: '持续时间(ms)',
    dataIndex: 'duration',
    key: 'duration',
    width: '10%',
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
    width: '10%',
    render: (_, record) => (
      <Space size="middle">
        <a>显示</a>
      </Space>
    ),
  },
];

const batchButtons = [
  {
    name: '显示',
    color: 'primary',
    onClick: () => {
      console.log(123);
    },
  },
  {
    name: '隐藏',
    color: 'danger',
    onClick: () => {
      console.log(456);
    },
  },
];

function UserMessage() {
  const [form] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | undefined>();

  const rowSelection: TableProps<Logs>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Logs[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: Logs) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleSearch = (values: Record<string, any>) => {
    if (values.RangePicker?.length === 2) {
      values.startTime = values.RangePicker[0]?.format('YYYY-MM-DD');
      values.endTime = values.RangePicker[1]?.format('YYYY-MM-DD');
      delete values.RangePicker;
    }
    values.areaCodes = (values.areas || []).join(',');
    delete values.areas;
    values.type = LogType.ACCESS;
    setParams(values);
  };

  useEffect(() => {
    form.submit();
  }, []);

  return (
    <div className="access-logs flex-view">
      <div className="header-search rounded-sm">
        <Form
          layout="inline"
          form={form}
          initialValues={{ variant: 'filled', layout: 'inline' }}
          onFinish={handleSearch}
        >
          <Form.Item
            label="时间范围"
            name="RangePicker"
            initialValue={[dayjs().startOf('day'), dayjs().endOf('day')]}
            rules={[{ required: true, message: '请选择时间范围' }]}
          >
            <RangePicker presets={rangePresets} />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Select
              placeholder="请选择状态"
              allowClear
              options={[
                { value: '1', label: '成功' },
                { value: '0', label: '失败' },
              ]}
            />
          </Form.Item>
          <Form.Item label="关键词" name="keyword">
            <Input placeholder="用户ID/名称/IP" />
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
            url={GET_MANAGE_MESSAGE_PAGE}
            // @ts-ignore
            rowSelection={rowSelection}
            showBatchDelete
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
