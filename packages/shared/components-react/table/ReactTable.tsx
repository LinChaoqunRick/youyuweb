import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button, Table, Modal, type TableProps,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import React, {
  useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle,
} from 'react';
import http from '../../network';
import { ReactTableProps, ReactTableRef, ColumnButton } from '../../types/components-react';
import type { PageResult } from '../../types/vo';
import type { TablePaginationConfig } from 'antd/es/table';

function ReactTableFooter<T extends AnyObject>(
  props: Partial<ReactTableProps<T>>,
  selectedRowKeys: React.Key[],
  selectedRows: T[],
  onDelete: (ids: string) => void,
) {
  const {
    showAdd, showDelete, batchButtons, onAdd,
  } = props;
  const disabled = useMemo(() => selectedRowKeys.length === 0, [selectedRowKeys]);
  return (
    <div className="react-table-footer">
      {showAdd && (
        <Button color="primary" variant="filled" onClick={() => onAdd?.()}>
          新增
        </Button>
      )}
      {showDelete && (
        <Button color="danger" variant="filled" disabled={disabled} onClick={() => onDelete(selectedRowKeys.join(','))}>
          删除
        </Button>
      )}
      {batchButtons?.map(button => (
        <Button
          key={button.title}
          color={button.color}
          variant="filled"
          disabled={disabled}
          onClick={() => button.onClick(selectedRowKeys, selectedRows)}
        >
          {button.title}
        </Button>
      ))}
    </div>
  );
}

function InnerReactTable<T extends AnyObject>(props: ReactTableProps<T>, ref: React.Ref<ReactTableRef>) {
  const {
    url, columns, params, deleteUrl, showSelection, showAdd, showEdit, showDelete, batchButtons,
    onEdit, onDataLoaded, ...rest
  } = props;
  const [modal, contextHolder] = Modal.useModal();
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [y, setY] = useState(0);
  const [tableData, setTableData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total: number) => `共 ${total} 条`,
    showSizeChanger: true,
    size: 'small',
  });

  function onDelete(ids: string) {
    const idsArray = ids.split(',');
    modal.confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: idsArray.length > 1 ? '你确定要删除这些数据？' : '你确定要删除该数据？',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        if (deleteUrl) {
          return http.post(deleteUrl, { ids }, { successTip: '操作成功' }).then(() => {
            getTableData();
          });
        }
        return Promise.reject();
      },
    });
  }

  const rowSelection: TableProps<T>['rowSelection'] = useMemo(() => ({
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
  }), [selectedRowKeys]);

  const showFooter = useMemo(() => {
    return showAdd || showDelete || batchButtons !== undefined;
  }, [showAdd, showDelete, batchButtons]);

  const innerColumns = useMemo(() => {
    return columns?.map(column => {
      // 默认居中对齐
      if (!column.align) {
        column.align = 'center';
      }
      // 设置操作按钮
      if (column.key === 'action') {
        column.render = (value, record, index) => {
          const columnButtons: ColumnButton<T>[] = [];
          if (showEdit) {
            columnButtons.push({
              title: '编辑',
              color: 'primary',
              onClick: value => onEdit?.(value),
            });
          }
          if (showDelete) {
            columnButtons.push({
              title: '删除',
              color: 'danger',
              onClick: data => onDelete(`${data.id}`),
            });
          }
          // 自定义按钮
          if (column.actions) {
            const columnActions: ColumnButton<T>[] = typeof column.actions === 'function'
              ? column.actions(value) : column.actions;
            columnButtons.push(...columnActions);
          }
          return columnButtons.map(button => {
            return (
              <Button
                color={button.color}
                variant="link"
                key={button.title}
                onClick={() => button.onClick && button.onClick(value, index)}
              >
                {button.title}
              </Button>
            );
          });
        };
      }
      return column;
    });
  }, [columns]);

  // 请求数据
  const getTableData = async () => {
    setLoading(true);
    setSelectedRowKeys([]);
    setSelectedRows([]);
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

  // 依赖驱动请求, 当 params 改变时，重置到第一页
  useEffect(() => {
    getTableData();
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

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    refresh() {
      getTableData();
    },
  }));

  return (
    <div className="react-table" ref={tableRef}>
      {contextHolder}
      <Table<T>
        rowKey="id"
        dataSource={tableData}
        columns={innerColumns}
        pagination={pagination}
        loading={loading}
        rowSelection={showSelection ? rowSelection : undefined}
        footer={showFooter ? () => ReactTableFooter<T>(props, selectedRowKeys, selectedRows, onDelete) : undefined}
        rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-even' : 'table-row-odd')}
        scroll={{
          y,
        }}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
}

InnerReactTable.ReactTableFooter = ReactTableFooter;

const ReactTable = forwardRef(InnerReactTable) as <T extends object>(
  props: ReactTableProps<T> & { ref?: React.Ref<ReactTableRef> },
) => ReturnType<typeof InnerReactTable>;

export default ReactTable;
