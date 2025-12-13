import { Button, Form, DatePicker, Input, Tag, Tooltip, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { rangePresets } from '@/libs/config/formConfig';
import { ReactTable } from '@youyu/shared/components-react';
import { GET_LOGS_PAGE } from '@youyu/shared/apis/logManage.ts';
import type { Logs } from '@youyu/shared/types/vo';
import { ColumnsType } from 'antd/es/table';
import { LogType } from '@youyu/shared/consts';
import { getSMSTitle } from '@youyu/shared/utils/common-utils.ts';

const { RangePicker } = DatePicker;
const columns: ColumnsType<Logs> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
    render: (data, row) => {
      const { type, requestDataObject } = row;
      const { type: SMS_TYPE } = requestDataObject ?? {};
      return <div>{type === 9 ? `${data}(${getSMSTitle(SMS_TYPE)})` : data}</div>;
    },
  },
  {
    title: '目标',
    dataIndex: 'target',
    key: 'target',
    width: '15%',
    render: (_data, row) => {
      const { requestData } = row;
      const requestDataJSON = JSON.parse(requestData);
      return requestDataJSON.to;
    },
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    width: '20%',
    render: (_data, row) => {
      const { requestData } = row;
      const requestDataJSON = JSON.parse(requestData);
      return requestDataJSON?.templateParams?.content;
    },
  },
  {
    title: '请求参数',
    dataIndex: 'requestData',
    key: 'requestData',
    width: '17%',
    ellipsis: {
      showTitle: false,
    },
    render: data => (
      <Tooltip placement="bottomLeft" title={data} rootClassName="request-params-tooltip">
        {data}
      </Tooltip>
    ),
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
    width: '8%',
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
    width: '15%',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];

function NotificationLog() {
  const [form] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | undefined>();

  const handleSearch = (values: Record<string, any>) => {
    if (values.RangePicker?.length === 2) {
      values.startTime = values.RangePicker[0]?.format('YYYY-MM-DD');
      values.endTime = values.RangePicker[1]?.format('YYYY-MM-DD');
      delete values.RangePicker;
    }
    values.areaCodes = (values.areas || []).join(',');
    delete values.areas;
    values.type = [LogType.NOTIFY_SMS, LogType.NOTIFY_MAIL].join(',');
    setParams(values);
  };

  const onLoaded = useCallback((data: Array<Logs>) => {
    data.forEach(item => {
      const { type, requestData, responseData } = item;
      item.requestDataObject = requestData && JSON.parse(requestData).input;
      item.responseDataObject = responseData && JSON.parse(responseData);
      if (type === 9) {
        // 短信通知
        item.target = item.requestDataObject?.telephone;
        item.content = item.responseDataObject?.SMSCode;
      } else if (type === 10) {
        // 邮件通知
        item.target = item.requestDataObject?.userTo?.email;
        item.content = item.requestDataObject?.content;
      }
    });
  }, []);

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
            initialValue={[dayjs().startOf('day').subtract(7, 'day'), dayjs().endOf('day')]}
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
        {params && <ReactTable url={GET_LOGS_PAGE} columns={columns} params={params} onLoaded={onLoaded} />}
      </div>
    </div>
  );
}

export default NotificationLog;
