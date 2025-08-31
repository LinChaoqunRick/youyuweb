import newLangCN from './new_cn';
import newLangEN from './new_en';
import oldLangCN from './old_cn';
import oldLangEN from './old_en';

function UserList() {
  function isEqual(val1, val2) {
    if (val1 === val2) return true;
    if (val1 === null || val2 === null) return false;

    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length !== val2.length) return false;
      return val1.every((item, i) => isEqual(item, val2[i]));
    }

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

  function diffObjects(oldObj, newObj) {
    const result = {};

    for (const key in newObj) {
      if (!Object.prototype.hasOwnProperty.call(oldObj, key)) {
        result[key] = newObj[key];
      } else if (
        typeof newObj[key] === 'object'
        && newObj[key] !== null
        && typeof oldObj[key] === 'object'
        && oldObj[key] !== null
      ) {
        if (Array.isArray(newObj[key]) && Array.isArray(oldObj[key])) {
          const arrDiff = diffArrays(oldObj[key], newObj[key]);
          if (arrDiff.length > 0) result[key] = arrDiff;
        } else {
          const objDiff = diffObjects(oldObj[key], newObj[key]);
          if (Object.keys(objDiff).length > 0) {
            result[key] = objDiff;
          }
        }
      } else if (!isEqual(oldObj[key], newObj[key])) {
        result[key] = newObj[key];
      }
    }

    return result;
  }

  function diffArrays(oldArr, newArr) {
    const diffs = [];

    for (const newItem of newArr) {
      // 在旧数组里找“业务相等”的对象
      const matchedOld = oldArr.find(oldItem => isEqual(oldItem, newItem));

      if (!matchedOld) {
        // 如果没找到完全相等的，就再看看有没有相同结构但值不同的
        const maybeOld = oldArr.find(oldItem => typeof oldItem === 'object' && typeof newItem === 'object');

        if (maybeOld && typeof newItem === 'object') {
          const objDiff = diffObjects(maybeOld, newItem);
          if (Object.keys(objDiff).length > 0) {
            diffs.push(newItem); // 直接返回新值
            continue;
          }
        }

        // 真正新增
        diffs.push(newItem);
      }
    }

    return diffs;
  }

  console.log('CN:', diffObjects(oldLangCN, newLangCN));
  console.log('EN:', diffObjects(oldLangEN, newLangEN));

  return <div>UserList</div>;
}

export default UserList;
