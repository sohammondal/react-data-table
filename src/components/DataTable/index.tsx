import React from 'react'
import useInfiniteScroll, { UseInfiniteScrollHookArgs } from 'react-infinite-scroll-hook'
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
  infiniteScrollProps,
}: DataTableProps<T, K>) => {
  const { selectedRowIds, toogleSelectRow, toggleSelectAllRows, isAllRowsSelected } =
    useRowSelection(rows, onSelectionChange)

  const [sentryRef] = useInfiniteScroll({
    ...(infiniteScrollProps || ({} as UseInfiniteScrollHookArgs)),
  })

  return (
    <>
      <Styled.Table>
        <Styled.THeader>
          <Styled.TRow>
            {showCheckbox && (
              <Styled.THead key={`thead-checkbox-all`}>
                <Styled.ItemWrapper>
                  <input
                    type='checkbox'
                    checked={isAllRowsSelected}
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
            <Styled.TRow key={row.id}>
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
                    key={`row-${row.id}-${columnKey}`}
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
      {(infiniteScrollProps?.loading || infiniteScrollProps?.hasNextPage) && (
        <h3 ref={sentryRef}>Loading...</h3>
      )}
    </>
  )
}

export * from './types'
