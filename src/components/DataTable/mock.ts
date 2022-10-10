import { DataCol } from '.'

interface Data {
  id: string
  product: string
  price: string | number
}

export const columns: DataCol<Data, keyof Data>[] = [
  {
    id: 'product', // Uniq ID to identify column
    label: 'Product',
    numeric: false,
    width: '80px',
  },
  {
    id: 'price',
    label: 'Price',
    numeric: true, // Right Align
  },
]

export const rows = [
  {
    id: 'some_id1',
    product: 'chocolate', // Key is column id and value is
    price: 15.2,
  },
  {
    id: 'some_id2',
    product: 'cake',
    price: '$15.5',
  },
]
