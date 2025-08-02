import { Button, Result } from 'antd';

function AppError() {
  return (
    <div className="app-error">
      <Result
        status="error"
        title="加载失败，请联系管理员或重试."
        extra={(
          <Button type="primary" key="console" onClick={() => location.reload()}>
            重试
          </Button>
        )}
      />
    </div>
  );
}

export default AppError;
