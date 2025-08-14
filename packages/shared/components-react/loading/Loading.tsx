import { Spin } from 'antd';
import './Loading.css';

function Loading(props: any) {
  return (
    <Spin {...props} indicator={<div className="spinner-loader" />} />
  );
}

export default Loading;
