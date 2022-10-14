import { useEffect, useState } from 'react'

import { DataRow } from './types'

export function useRowSelection<T extends DataRow>(
  rows: Array<T>,
  onSelectionChange?: (selectedRows: string[] | 'All') => void,
) {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([])
  const isAllRowsSelected = rows.every((row) => selectedRowIds.includes(row.id))

  /* onSelectionChange handler */
  useEffect(() => {
    if (typeof onSelectionChange !== 'function') return
    if (!selectedRowIds.length) return onSelectionChange([])

    onSelectionChange(isAllRowsSelected ? 'All' : selectedRowIds)
  }, [selectedRowIds, isAllRowsSelected])

  /* Reset state when no rows */
  useEffect(() => {
    if (!rows.length) setSelectedRowIds([])
  }, [rows])

  const toggleSelectAllRows = () => {
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
    isAllRowsSelected,
  }
}
