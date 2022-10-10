import { useEffect, useState } from 'react'

import { DataRow } from './types'

export const useHook = () => {
  return
}

export function useRowSelection<T extends DataRow>(
  rows: Array<T>,
  onSelectionChange?: (selectedRows: string[] | 'All') => void,
) {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])

  useEffect(() => {
    const isAllRowsSelected = rows.length === selectedRowIds.length

    typeof onSelectionChange === 'function' &&
      onSelectionChange(isAllRowsSelected ? 'All' : selectedRowIds)
  }, [selectedRowIds, rows])

  const toggleSelectAllRows = () => {
    const isAllRowsSelected = rows.length === selectedRowIds.length
    const rowIds = isAllRowsSelected ? [] : rows.map((row) => row.id)
    setSelectedRowIds(rowIds)
  }

  const toogleSelectRow = (selectedRowId: string) => {
    if (selectedRowIds.includes(selectedRowId)) {
      setSelectedRowIds(selectedRowIds.filter((rowId) => rowId !== selectedRowId))
    } else {
      setSelectedRowIds([...selectedRowIds, selectedRowId])
    }
  }

  return {
    selectedRowIds,
    toogleSelectRow,
    toggleSelectAllRows,
  }
}
