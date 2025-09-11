import { AnyObject } from 'antd/es/_util/type';
import React from 'react';
import type { TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { ButtonColorType } from 'antd/lib/button';

interface TableButton {
  title: string;
  color: ButtonColorType;
}

export interface ColumnButton<T> extends TableButton {
  onClick: (value: T, index: number) => void;
}

export interface BatchButton<T> extends TableButton {
  onClick: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
}

export interface ReactTableColumn<T> extends ColumnType<T> {
  actions?: ((_data: T) => ColumnButton<T>[]) | ColumnButton<T>[];
}

export type ReactTableColumns<T> = ReactTableColumn<T>[];

export interface ReactTableProps<T extends AnyObject> extends Omit<TableProps, 'columns'> {
  url: string;
  columns: ReactTableColumns<T>;
  params: Record<string, any>; // 查询条件
  deleteUrl?: string;
  showSelection?: boolean;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  batchButtons?: BatchButton<T>[];
  onDataLoaded?: (data: T[]) => void;
}

export interface ReactTableRef {
  refresh: () => void;
  // getSelectedRows: () => any[];
}
