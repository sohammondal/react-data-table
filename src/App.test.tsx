import { render, screen } from '@testing-library/react'
import React from 'react'

import App from './App'

it('renders React Data Table heading', () => {
  render(<App />)
  const h1Elem = screen.getByText(/react data table/i)
  expect(h1Elem).toBeInTheDocument()
})

it('renders DataTable with Album ID and Album Details as table headers', () => {
  render(<App />)
  const albumIdHeader = screen.getByText(/Album ID/i)
  const albumDetailsHeader = screen.getByText(/Album Details/i)

  expect(albumIdHeader).toBeInTheDocument()
  expect(albumDetailsHeader).toBeInTheDocument()
})
