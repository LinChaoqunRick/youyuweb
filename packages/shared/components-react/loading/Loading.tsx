import './Loading.css';
import React from 'react';

interface LoadingProps {
  spinning?: boolean;
  children?: React.ReactNode;
}

function Loading(props: LoadingProps) {
  const { spinning = true, children } = props;
  return (
    <div className="loader-wrapper">
      <div className={`s-loader ${spinning ? 'loading' : ''}`} />
      {children}
    </div>
  );
}

export default Loading;
