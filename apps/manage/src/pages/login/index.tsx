import { ACCOUNT_LOGIN } from '@youyu/shared/apis';
import http from '@youyu/shared/network';
import {
  Button, Checkbox, Flex, Form, Input, message,
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import './index.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '@/components/menu/Logo.tsx';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    http
      .post(
        ACCOUNT_LOGIN,
        {
          grant_type: 'password', // oauth认证方式
          authType: 'password', // 校验方式设置成密码模式
          ...values,
        },
        {
          headers: {
            Authorization: `Basic ${btoa('youyu-manage:12345666666')}`,
          },
        },
      )
      .then(res => {
        const { userInfo, access_token, refresh_token } = res.data;
        messageApi.open({
          type: 'success',
          content: `欢迎回来，${userInfo.nickname}`,
        });
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        navigate('/', { replace: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log(errorInfo);
  };

  return (
    <div className="login-wrapper">
      {contextHolder}
      <div className="image-view">
        <div className="system-info">
          <Logo />
          <div className="system-name">有语管理系统</div>
        </div>
        <img
          className="view-image float"
          src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/login/data-yield.png"
          alt=""
        />
      </div>
      <div className="content-view">
        <div className="welcome-text">Hi! 欢迎回来🏕️</div>
        <div className="login-text">登录来管理您的项目</div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input size="large" prefix={<LockOutlined />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a href="">忘记密码</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button size="large" block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
