import { ACCOUNT_LOGIN } from '@youyu/shared/apis';
import http from '@youyu/shared/network';
import {
  Button, Checkbox, Form, Input, message,
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    http.post(ACCOUNT_LOGIN, {
      grant_type: 'password', // oauth认证方式
      authType: 'password', // 校验方式设置成密码模式
      ...values,
    }, {
      headers: {
        Authorization: `Basic ${btoa('youyu-manage:12345666666')}`,
      },
    }).then(res => {
      const { userInfo, access_token, refresh_token } = res.data;
      messageApi.open({
        type: 'success',
        content: `欢迎回来，${userInfo.nickname}`,
      });
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      navigate('/', { replace: true });
    }).catch(err => {
      console.log(err);
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log(errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
