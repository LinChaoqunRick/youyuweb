import React from 'react';

function DataItem(props: any) {
  const {
    idName = 'id', propName = 'name', valueName = 'value', data,
  } = props;
  return (
    <div className="date-item-bt rounded-sm" key={data[idName]}>
      <div className="data-item-bt-title max-w-[180px] truncate" title={data[propName]}>{data[propName]}</div>
      <span className="data-item-bt-value" title={data[valueName]}>{data[valueName]}</span>
    </div>
  );
}

export default DataItem;
