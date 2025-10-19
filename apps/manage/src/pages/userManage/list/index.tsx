import { useState } from 'react';

function UserList() {
  const [count, setCount] = useState(0);

  // 普通函数 - 捕获创建时的 count 值
  const handleClick = () => {
    setCount(prev => prev + 1);
    console.log('count:', count); // 也会打印 1
  };

  return (
    <button onClick={handleClick} type="button">
      点击次数: {count}
    </button>
  );
}

export default UserList;
