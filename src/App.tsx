import React from 'react'

import { Album, Container } from 'App.styles'
import { DataTable } from 'components/DataTable'
import { useJSONPlaceHolderData } from 'hooks/useJSONPlaceHolderData'

function App(): React.ReactElement {
  const dataBuilder = (photo: { id: number; title: string; thumbnailUrl: string }) => ({
    id: `${photo.id}`,
    album: (
      <Album>
        <img src={photo.thumbnailUrl} alt={photo.title} />
        <p>{photo.title}</p>
      </Album>
    ),
  })

  const { data, hasMore, isLoading, error, loadMore } = useJSONPlaceHolderData<{
    id: string
    album: React.ReactElement
  }>({ resourceUrl: 'https://jsonplaceholder.typicode.com/photos' }, dataBuilder)

  return (
    <Container>
      <h1>React Data Table</h1>
      <DataTable
        columns={[
          {
            id: 'id',
            label: 'Album ID',
            numeric: true,
          },
          {
            id: 'album',
            label: 'Album Details',
          },
        ]}
        rows={data}
        onRowClick={console.log}
        onSelectionChange={console.log}
        infiniteScrollProps={{
          loading: isLoading,
          hasNextPage: hasMore,
          onLoadMore: loadMore,
          disabled: error,
          rootMargin: '0px 0px 10px 0px',
          delayInMs: 1000,
        }}
      />
    </Container>
  )
}

export default App
