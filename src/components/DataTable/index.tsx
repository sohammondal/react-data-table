import React from 'react'
import { css } from 'styled-components/macro'

import * as Styled from './styles'
import { DataTableProps } from './types'

export const DataTable = <T, K extends keyof T>({
  columns,
  rows,
  onRowClick,
}: DataTableProps<T, K>) => {
  return (
    <Styled.Table>
      <Styled.THeader>
        <Styled.TRow>
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
