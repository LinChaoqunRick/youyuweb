import {
  Button, Form, DatePicker, TreeSelect, TreeSelectProps, GetProp, Input, Tag, Tooltip, Select,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { rangePresets } from '@/libs/config/formConfig';
import { getAreaNameByCode, getSubAreaOptions, updateChildrenByCode } from '@youyu/shared/utils/locate-utils';
import { cloneDeep } from 'lodash';
import { ReactTable } from '@youyu/shared/components-react';
import { GET_LOGS_PAGE } from '@youyu/shared/apis/logManage.ts';
import { Logs } from '@youyu/shared/types/vo/logManage';
import { ColumnsType } from 'antd/es/table';
import { LogType } from '@youyu/shared/consts';

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

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
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '11%',
  },
  {
    title: '请求地址',
    dataIndex: 'path',
    key: 'path',
    width: '17%',
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
    width: '18%',
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
    title: '结果',
    dataIndex: 'result',
    key: 'result',
    width: '10%',
    render: (data: string, row) => {
      return data ? (
        <Tag color="#87d068">成功</Tag>
      ) : (
        <Tooltip placement="bottom" title={row.error}>
          <Tag color="#f50">失败</Tag>
        </Tooltip>
      );
    },
  },
  {
    title: '请求时间',
    width: '16%',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];

function OperationLog() {
  const [form] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | undefined>();
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>();

  const handleSearch = (values: Record<string, any>) => {
    if (values.RangePicker?.length === 2) {
      values.startTime = values.RangePicker[0]?.format('YYYY-MM-DD');
      values.endTime = values.RangePicker[1]?.format('YYYY-MM-DD');
      delete values.RangePicker;
    }
    values.areaCodes = (values.areas || []).join(',');
    delete values.areas;
    values.type = [
      LogType.INSERT,
      LogType.UPDATE,
      LogType.QUERY,
      LogType.DELETE,
      LogType.REGISTER,
      LogType.UPLOAD,
      LogType.OTHER,
    ].join(',');
    setParams(values);
  };

  const onLoadData: TreeSelectProps['loadData'] = data => new Promise(resolve => {
    const subAreas = getSubAreaOptions(`${data.value}`);
    setTimeout(() => {
      // @ts-ignore
      setTreeData(updateChildrenByCode(`${data.value}`, cloneDeep(treeData), subAreas));
      resolve(true);
    }, 100);
  });

  useEffect(() => {
    setTreeData(getSubAreaOptions());
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
          <Form.Item label="区域" name="areas">
            <TreeSelect
              showSearch
              styles={{
                popup: { root: { maxHeight: 400, overflow: 'auto' } },
              }}
              placeholder="请选择区域"
              allowClear
              treeCheckable
              treeData={treeData}
              loadData={onLoadData}
            />
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
        {params && <ReactTable url={GET_LOGS_PAGE} columns={columns} params={params} />}
      </div>
    </div>
  );
}

export default OperationLog;
