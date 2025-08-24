import { Table } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import http from '../../network';
import { PageResult } from '../../types/vo/common';
import type { TablePaginationConfig, ColumnsType } from 'antd/es/table';

interface ReactTableProps<T> {
  url: string;
  columns: ColumnsType<T>;
  params: Record<string, any>; // 查询条件
}

export function ReactTable<T>(props: ReactTableProps<T>) {
  const {
    url, columns, params, ...rest
  } = props;

  const [tableData, setTableData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total: number) => `共 ${total} 条`,
    showSizeChanger: true,
    size: 'small',
  });

  // 居中对齐
  columns?.forEach(column => {
    if (!column.align) {
      column.align = 'center';
    }
  });

  // 请求数据
  const getTableData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await http.post<PageResult<T>>(url, {
        ...params,
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      });
      setTableData(res.data.list as T[]);
      setPagination(prev => ({ ...prev, total: res.data.total }));
    } finally {
      setLoading(false);
    }
  }, [url, params, pagination.current, pagination.pageSize]);

  // 依赖驱动请求
  useEffect(() => {
    getTableData();
  }, [getTableData]);

  // 当 params 改变时，重置到第一页
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      current: 1,
    }));
  }, [params]);

  // 处理分页变化
  const handleChange = (pager: TablePaginationConfig) => {
    setPagination(prev => ({
      ...prev,
      current: pager.current!,
      pageSize: pager.pageSize!,
    }));
  };

  return (
    <div className="react-table">
      <Table<T>
        rowKey="id"
        dataSource={tableData}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
}

export default ReactTable;
