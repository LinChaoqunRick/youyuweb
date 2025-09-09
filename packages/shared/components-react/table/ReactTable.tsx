import { Button, Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ButtonColorType } from 'antd/lib/button';
import {
  useState, useEffect, useRef, useMemo,
} from 'react';
import http from '../../network';
import { PageResult } from '../../types/vo/common';
import type { TablePaginationConfig, ColumnsType } from 'antd/es/table';

interface BatchButton<T> {
  name: string;
  color?: ButtonColorType;
  onClick: (data: Array<T>) => void;
}

interface ReactTableProps<T extends AnyObject> extends TableProps {
  url: string;
  columns: ColumnsType<T>;
  params: Record<string, any>; // 查询条件
  onDataLoaded?: (data: Array<T>) => void;
  showBatchDelete?: boolean;
  batchButtons?: Array<BatchButton<T>>;
}

function ReactTableFooter<T extends AnyObject>(props: Partial<ReactTableProps<T>>) {
  const { showBatchDelete, batchButtons } = props;
  return (
    <div className="react-table-footer">
      {showBatchDelete && (
        <Button color="danger" variant="filled">
          删除
        </Button>
      )}
      {batchButtons?.map(button => (
        <Button key={button.name} color={button.color} variant="filled" onClick={() => button.onClick([1])}>
          {button.name}
        </Button>
      ))}
    </div>
  );
}

export function ReactTable<T extends AnyObject>(props: ReactTableProps<T>) {
  const {
    url, columns, params, onDataLoaded, showBatchDelete, batchButtons, ...rest
  } = props;

  const tableRef = useRef<HTMLElement | null>(null);
  const [y, setY] = useState(0);
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

  const showFooter = useMemo(() => {
    return showBatchDelete || batchButtons !== undefined;
  }, [showBatchDelete, batchButtons]);

  // 居中对齐
  columns?.forEach(column => {
    if (!column.align) {
      column.align = 'center';
    }
  });

  // 请求数据
  const getTableData = async () => {
    setLoading(true);
    try {
      const res = await http.post<PageResult<T>>(url, {
        ...params,
        pageNum: pagination.current,
        pageSize: pagination.pageSize,
      });
      if (onDataLoaded) {
        onDataLoaded(res.data.list);
      }
      setTableData(res.data.list);
      setPagination(prev => ({ ...prev, total: res.data.total }));
    } finally {
      setLoading(false);
    }
  };

  // 计算表格可视区域（x/y）
  useEffect(() => {
    const recalc = () => {
      if (!tableRef.current) return;
      const rect = tableRef.current.getBoundingClientRect();
      const nextY = window.innerHeight - rect.top - 55 - 56 - 12; // 55: table-header | 56: pagination | 12 :padding
      setY(nextY);
    };

    // 初始计算
    recalc();

    // 监听窗口尺寸变化
    const onResize = () => recalc();
    window.addEventListener('resize', onResize);

    // 监听容器尺寸变化（包括打开控制台导致布局变化等）
    const observer = new ResizeObserver(() => recalc());
    if (tableRef.current) {
      observer.observe(tableRef.current);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, []);

  // 依赖驱动请求
  useEffect(() => {
    getTableData();
  }, [params]);

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
    getTableData();
  };

  return (
    // @ts-ignore
    <div className="react-table" ref={tableRef}>
      <Table<T>
        rowKey="id"
        dataSource={tableData}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onChange={handleChange}
        footer={showFooter ? () => ReactTableFooter<T>(props) : undefined}
        rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-even' : 'table-row-odd')}
        scroll={{
          y,
        }}
        {...rest}
      />
    </div>
  );
}

export default ReactTable;
