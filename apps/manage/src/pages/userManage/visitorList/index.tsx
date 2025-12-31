import { Button, Form, Input, Avatar } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getAreaNameByCode } from '@youyu/shared/utils/locate-utils.ts';
import { ReactTable, ReactTableRef } from '@youyu/shared/components-react';
import { ReactTableColumns } from '@youyu/shared/types/components-react';
import { GET_VISITOR_PAGE } from '@youyu/shared/apis';

interface Visitor {
  id: number;
  nickname: string;
  avatar: string;
  email: string;
  homepage: string;
  adcode: number;
  createTime: string;
  updateTime: string;
}

function VisitorList() {
  const [form] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | undefined>();
  const tableRef = useRef<ReactTableRef>(null);

  const columns: ReactTableColumns<Visitor> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '8%',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        width: '8%',
        render: (data: string) => {
          return (
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <Avatar src={data} size={36} />
              </div>
            </div>
          );
        },
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: '15%',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: '20%',
        render: (data: string) => {
          return data || '-';
        },
      },
      {
        title: '主页',
        dataIndex: 'homepage',
        key: 'homepage',
        width: '20%',
        render: (data: string) => {
          return data ? (
            <a href={data} target="_blank" rel="noopener noreferrer">
              {data}
            </a>
          ) : (
            '-'
          );
        },
      },
      {
        title: '地区',
        dataIndex: 'adcode',
        key: 'adcode',
        width: '12%',
        render: (data: number) => {
          return getAreaNameByCode(data) || '-';
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: '17%',
      },
    ],
    [],
  );

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
          <Form.Item label="昵称" name="nickname">
            <Input placeholder="请输入昵称" allowClear />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入邮箱" allowClear />
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
          <ReactTable ref={tableRef} url={GET_VISITOR_PAGE} showSelection={false} columns={columns} params={params} />
        )}
      </div>
    </div>
  );
}

export default VisitorList;
