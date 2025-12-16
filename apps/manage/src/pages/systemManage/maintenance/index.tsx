import { BACKUP_DATABASE, CLEAN_BACKUP_DATABASE } from '@youyu/shared/apis/system';
import http from '@youyu/shared/network';
import { Button, Card, Form, message } from 'antd';
import { useState } from 'react';

function Maintenance() {
  const [form] = Form.useForm();
  const [backupLoading, setBackupLoading] = useState(false);
  const [cleanLoading, setCleanLoading] = useState(false);

  const handleBackupDatabase = async () => {
    try {
      setBackupLoading(true);
      await http.post(BACKUP_DATABASE);
      message.success('数据库备份成功');
    } catch (error) {
      console.error('数据库备份错误:', error);
    } finally {
      setBackupLoading(false);
    }
  };

  const handleCleanBackup = async () => {
    try {
      setCleanLoading(true);
      await http.post(CLEAN_BACKUP_DATABASE);
      message.success('备份文件清除成功');
    } catch (error) {
      console.error('清除备份文件错误:', error);
    } finally {
      setCleanLoading(false);
    }
  };

  return (
    <div>
      <Card title="系统维护">
        <Form form={form} layout="horizontal" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="数据库备份">
            <Button type="primary" onClick={handleBackupDatabase} loading={backupLoading}>
              备份数据库
            </Button>
          </Form.Item>
          <Form.Item label="清除备份">
            <Button type="primary" danger onClick={handleCleanBackup} loading={cleanLoading}>
              清除备份文件
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Maintenance;
