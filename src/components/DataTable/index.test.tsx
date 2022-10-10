import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { DataTable } from './index'

import { rows, columns } from './mock'

describe('Test DataTable component', () => {
  beforeEach(() => {
    render(<DataTable rows={rows} columns={columns} />)
  })

  it('should render table headers', async () => {
    columns.forEach((col) => {
      expect(screen.getByText(col.label)).toBeVisible()
    })
  })

  it('should render table rows', async () => {
    rows.forEach((row) => {
      columns.forEach((col) => {
        expect(screen.getByText(row[col.id])).toBeVisible()
      })
    })
  })

  it('should select all checkboxes when user clicks on top checkbox', () => {
    const selectAllCheckbox = screen.getByTestId('select-all-checkbox')
    expect(selectAllCheckbox).not.toBeChecked()
    fireEvent.click(selectAllCheckbox)

    expect(selectAllCheckbox).toBeChecked()
    rows.forEach((_, index) => {
      const checkbox = screen.getByTestId(`select-checkbox-${index}`)
      expect(checkbox).toBeChecked()
    })
  })

  it('should auto select top checkbox when user clicks individual row checkboxes', () => {
    const selectAllCheckbox = screen.getByTestId('select-all-checkbox')
    expect(selectAllCheckbox).not.toBeChecked()

    rows.forEach((_, index) => {
      const checkbox = screen.getByTestId(`select-checkbox-${index}`)
      fireEvent.click(checkbox)
    })

    expect(selectAllCheckbox).toBeChecked()
  })
})
