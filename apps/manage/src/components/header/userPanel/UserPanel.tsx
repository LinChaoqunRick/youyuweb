import { ExclamationCircleOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { ACCOUNT_LOGOUT } from '@youyu/shared/apis';
import http from '@youyu/shared/network';
import { cleanCookieLocalStorage } from '@youyu/shared/utils';
import { Modal } from 'antd';
import { useCallback } from 'react';
import { ManageUser } from '@/types/login';
import './UserPanel.css';

function UserPanel({ user }: { user: ManageUser }) {
  const [modal, contextHolder] = Modal.useModal();

  const onLogOut = useCallback(() => {
    modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否确认退出登录',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        return http.post(ACCOUNT_LOGOUT).then(res => {
          cleanCookieLocalStorage();
          setTimeout(() => {
            location.reload();
          }, 500);
        });
      },
    });
  }, []);

  return (
    <div className="user-panel">
      {contextHolder}
      <div className="basic-info">
        <img src={user.avatar} alt="avatar" />
        <div>
          <span className="user-nickname">{user.nickname}</span>
          <span className="user-email">{user.email}</span>
        </div>
      </div>
      <div className="user-operations">
        <div className="user-btn">
          <LockOutlined />
          修改密码
        </div>
        <div className="user-btn" onClick={onLogOut}>
          <UploadOutlined />
          退出登录
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
