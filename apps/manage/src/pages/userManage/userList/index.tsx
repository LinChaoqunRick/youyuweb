import { Button, Form, Input, Tag, Avatar } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getAreaNameByCode } from '@youyu/shared/utils/locate-utils.ts';
import { ReactTable, ReactTableRef } from '@youyu/shared/components-react';
import { ReactTableColumns } from '@youyu/shared/types/components-react';
import { GET_USER_PAGE } from '@youyu/shared/apis';

interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  sex: number;
  email: string;
  adcode: number;
  adname: string;
  homepage: string;
  githubId: string;
  qqId: string;
  level: number;
  registerDate: string;
  birthday: string;
  signature: string;
  status: string;
}

function UserList() {
  const [form] = Form.useForm();
  const [params, setParams] = useState<Record<string, unknown> | undefined>();
  const tableRef = useRef<ReactTableRef>(null);

  const columns: ReactTableColumns<User> = useMemo(
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
            <div style={{ position: 'absolute', left: '32%', top: '10px' }}>
              <Avatar src={data} size={36} />
            </div>
          );
        },
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: '12%',
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: '12%',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width: '8%',
        render: (data: number) => {
          if (data === 0) return '男';
          if (data === 1) return '女';
          return '未知';
        },
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: '15%',
        render: (data: string) => {
          return data || '-';
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
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        render: (data: string) => {
          return data === '0' ? <Tag color="#87d068">启用</Tag> : <Tag color="#f50">禁用</Tag>;
        },
      },
      {
        title: '注册时间',
        dataIndex: 'registerDate',
        key: 'registerDate',
        width: '14%',
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
          <Form.Item label="用户名" name="username">
            <Input placeholder="请输入用户名" allowClear />
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
          <ReactTable ref={tableRef} url={GET_USER_PAGE} showSelection={false} columns={columns} params={params} />
        )}
      </div>
    </div>
  );
}

export default UserList;
