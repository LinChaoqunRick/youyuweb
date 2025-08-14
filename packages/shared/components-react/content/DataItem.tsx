import React from 'react';

function DataItem(props: any) {
  const {
    idName = 'id', propName = 'name', valueName = 'value', data,
  } = props;
  return (
    <div className="date-item-bt rounded-sm" key={data[idName]}>
      <span className="data-item-bt-title">{data[propName]}:</span>
      <span className="data-item-bt-value">{data[valueName]}</span>
    </div>
  );
}

export default DataItem;
