export type DataCol<T, K extends keyof T> = {
  id: K
  label: string
  numeric: boolean
  width?: string
}

export type DataTableProps<T, K extends keyof T> = {
  rows: Array<T>
  columns: Array<DataCol<T, K>>
  showCheckbox?: boolean
  onRowClick?: (rowData: T, rowIndex: number) => void
  onSelectionChange?: (selectedRows: string[] | 'All') => void
}

export type DataRow = {
  id: string
}
