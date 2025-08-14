import newLangCN from './new_cn';
import newLangEN from './new_en';
import oldLangCN from './old_cn';
import oldLangEN from './old_en';

function UserList() {
  function isEqual(val1, val2) {
    // 简单类型比较
    if (val1 === val2) return true;

    // null 情况
    if (val1 === null || val2 === null) return false;

    // 数组比较
    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) return false;
      return val1.every((item, i) => isEqual(item, val2[i]));
    }

    // 对象比较
    if (
      typeof val1 === 'object'
      && typeof val2 === 'object'
      && !Array.isArray(val1)
      && !Array.isArray(val2)
    ) {
      const keys1 = Object.keys(val1);
      const keys2 = Object.keys(val2);
      if (keys1.length !== keys2.length) return false;
      return keys1.every(key => isEqual(val1[key], val2[key]));
    }

    return false;
  }

  function findNewOrChanged(oldObj, newObj) {
    const result = {};

    for (const key in newObj) {
      if (!Object.prototype.hasOwnProperty.call(oldObj, key)) {
        // 新增属性
        result[key] = newObj[key];
      } else if (
        typeof newObj[key] === 'object'
        && newObj[key] !== null
        && typeof oldObj[key] === 'object'
        && oldObj[key] !== null
        && !Array.isArray(newObj[key])
        && !Array.isArray(oldObj[key])
      ) {
        // 嵌套对象，递归比较
        const diff = findNewOrChanged(oldObj[key], newObj[key]);
        if (Object.keys(diff).length > 0) {
          result[key] = diff;
        }
      } else if (!isEqual(oldObj[key], newObj[key])) {
        // 值不同（包括数组或基本类型）
        result[key] = newObj[key];
      }
    }

    return result;
  }

  console.log('CN:', findNewOrChanged(oldLangCN, newLangCN));
  console.log('EN:', findNewOrChanged(oldLangEN, newLangEN));

  return <div>UserList</div>;
}

export default UserList;
