import {
  Button, Form, DatePicker, TreeSelect, TreeSelectProps, GetProp, Input, TableProps,
} from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { rangePresets } from '@/libs/config/formConfig';
import { getAreaNameByCode, getSubAreaOptions, updateChildrenByCode } from '@youyu/shared/utils/locate-utils';
import { cloneDeep } from 'lodash';
import { ReactTable } from '@youyu/shared/components-react';
import { GET_LOGS_PAGE } from '@youyu/shared/apis/logManage.ts';
import { Logs } from '@youyu/shared/types/vo/logManage';

type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];

const { RangePicker } = DatePicker;
const columns: TableProps<Logs>['columns'] = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '区域',
    dataIndex: 'adcode',
    key: 'adcode',
    render: data => {
      return getAreaNameByCode(data);
    },
  },
  {
    title: '持续时间',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: '结果',
    dataIndex: 'result',
    key: 'result',
    render: (data: string) => {
      return data ? '成功' : '失败';
    },
  },
  {
    title: '请求时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];

function AccessLog() {
  const [form] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | null>(null);
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>();

  const handleSearch = (values: Record<string, any>) => {
    if (values.RangePicker?.length === 2) {
      values.startTime = values.RangePicker[0]?.format('YYYY-MM-DD');
      values.endTime = values.RangePicker[1]?.format('YYYY-MM-DD');
      delete values.RangePicker;
    }
    values.areaCodes = (values.areas || []).join(',');
    delete values.areas;
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
    <div className="access-logs">
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
          <Form.Item label="关键词" name="keyword">
            <Input placeholder="名称/IP/请求方式" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form>
      </div>
      <div className="access-content">
        {params && <ReactTable url={GET_LOGS_PAGE} columns={columns} params={params} />}
      </div>
    </div>
  );
}

export default AccessLog;
