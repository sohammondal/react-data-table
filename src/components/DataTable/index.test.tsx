import { render, screen } from '@testing-library/react'
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
})
