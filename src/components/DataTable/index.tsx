import React from 'react'
import { css } from 'styled-components/macro'

import * as Styled from './styles'
import { DataTableProps, DataRow } from './types'
import { useRowSelection } from './useRowSelection'

export const DataTable = <T extends DataRow, K extends keyof T>({
  columns,
  rows,
  onRowClick,
  showCheckbox = true,
  onSelectionChange,
}: DataTableProps<T, K>) => {
  const { selectedRowIds, toogleSelectRow, toggleSelectAllRows } = useRowSelection(
    rows,
    onSelectionChange,
  )

  return (
    <Styled.Table>
      <Styled.THeader>
        <Styled.TRow>
          {showCheckbox && (
            <Styled.THead key={`thead-checkbox-all`}>
              <Styled.ItemWrapper>
                <input
                  type='checkbox'
                  checked={rows.length === selectedRowIds.length}
                  onChange={toggleSelectAllRows}
                  data-testid='select-all-checkbox'
                />
              </Styled.ItemWrapper>
            </Styled.THead>
          )}
          {columns.map((column, index) => (
            <Styled.THead
              key={`thead-${index}`}
              css={css`
                text-align: ${column.numeric ? 'right' : 'inherit'};
              `}
            >
              <Styled.ItemWrapper
                css={css`
                  width: ${column.width};
                `}
              >
                {column.label}
              </Styled.ItemWrapper>
            </Styled.THead>
          ))}
        </Styled.TRow>
      </Styled.THeader>
      <Styled.TBody>
        {rows.map((row, rowKey) => (
          <Styled.TRow key={`trow-${rowKey}`}>
            {showCheckbox && (
              <Styled.TData key={`trow-checkbox`}>
                <Styled.ItemWrapper>
                  <input
                    type='checkbox'
                    checked={selectedRowIds.includes(row.id)}
                    onChange={() => {
                      toogleSelectRow(row.id)
                    }}
                    data-testid={`select-checkbox-${rowKey}`}
                  />
                </Styled.ItemWrapper>
              </Styled.TData>
            )}
            {columns.map((column, columnKey) => {
              return (
                <Styled.TData
                  key={columnKey}
                  onClick={() => {
                    typeof onRowClick === 'function' && onRowClick(row, rowKey)
                  }}
                  css={css`
                    text-align: ${column.numeric ? 'right' : 'inherit'};
                  `}
                >
                  <Styled.ItemWrapper>{row[column.id] as React.ReactNode}</Styled.ItemWrapper>
                </Styled.TData>
              )
            })}
          </Styled.TRow>
        ))}
      </Styled.TBody>
    </Styled.Table>
  )
}

export * from './types'