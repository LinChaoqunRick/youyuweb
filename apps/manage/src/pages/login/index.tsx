import { ACCOUNT_LOGIN } from '@youyu/shared/apis';
import http from '@youyu/shared/network';
import { Button, Checkbox, Flex, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import './index.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Logo from '@/components/common/logo/Logo.tsx';
import LanguageSwitch from '@/components/header/switch/LanguageSwitch';
import ThemeSwitch from '@/components/header/switch/ThemeSwitch';
import intl from 'react-intl-universal';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = values => {
    setLoading(true);
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
          content: `${intl.get('login.welcomeBack')}，${userInfo.nickname}`,
        });
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        navigate('/', { replace: true });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    console.log(errorInfo);
  };

  return (
    <div className="login-wrapper">
      {contextHolder}
      <div className="settings-bar">
        <ThemeSwitch />
        <LanguageSwitch />
      </div>
      <div className="image-view">
        <div className="system-info">
          <Logo />
          <div className="system-name">{intl.get('login.systemName')}</div>
        </div>
        <img
          className="view-image float"
          src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/login/data-yield.png"
          alt=""
        />
      </div>
      <div className="content-view">
        <div className="welcome-text">{intl.get('login.welcome')}</div>
        <div className="login-text">{intl.get('login.loginSubtitle')}</div>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="username" rules={[{ required: true, message: intl.get('login.usernameRequired') }]}>
            <Input size="large" prefix={<UserOutlined />} placeholder={intl.get('login.username')} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: intl.get('login.passwordRequired') }]}>
            <Input size="large" prefix={<LockOutlined />} type="password" placeholder={intl.get('login.password')} />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{intl.get('login.rememberMe')}</Checkbox>
              </Form.Item>
              <a href="">{intl.get('login.forgotPassword')}</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button size="large" block type="primary" htmlType="submit" loading={loading}>
              {intl.get('login.loginButton')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
