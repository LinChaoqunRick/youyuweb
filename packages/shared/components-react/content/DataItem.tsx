import React from 'react';

interface DataItemProps {
  idName?: string;
  propName?: string;
  valueName?: string;
  data: any;
  rank?: number;
}

function DataItem(props: DataItemProps) {
  const {
    idName = 'id', propName = 'name', valueName = 'value', data, rank,
  } = props;

  // 根据排名确定样式
  const getRankStyle = () => {
    if (!rank) return {};
    const colors = ['#FF4D4F', '#FF7A45', '#FAAD14']; // 红、橙、黄
    const bgColors = ['rgba(255, 77, 79, 0.08)', 'rgba(255, 122, 69, 0.08)', 'rgba(250, 173, 20, 0.08)'];
    return {
      backgroundColor: bgColors[rank - 1] || 'transparent',
      borderColor: colors[rank - 1] || 'var(--border-color)',
      borderWidth: rank <= 3 ? 2 : 1,
    };
  };

  const getRankBadgeStyle = () => {
    if (!rank || rank > 3) return {};
    const colors = ['#FF4D4F', '#FF7A45', '#FAAD14']; // 红、橙、黄
    return {
      backgroundColor: colors[rank - 1],
      color: '#fff',
    };
  };

  return (
    <div className="date-item-bt rounded-sm" key={data[idName]} style={getRankStyle()}>
      <div className="data-item-bt-content">
        {rank && rank <= 3 && (
          <span className="data-item-rank-badge" style={getRankBadgeStyle()}>{rank}</span>
        )}
        <div className="data-item-bt-title max-w-[140px] truncate" title={data[propName]}>
          {data[propName]}
        </div>
      </div>
      <span className="data-item-bt-value" title={data[valueName]}>{data[valueName]}</span>
    </div>
  );
}

export default DataItem;
