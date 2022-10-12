import styled from 'styled-components'

import { flexColCenter, flexRow, hw } from 'theme/common.styles'

export const Container = styled.main`
  min-height: 100vh;
  ${flexColCenter}
`

export const Album = styled.div`
  ${flexRow}
  img {
    ${hw.custom(50, 'px')}
    margin-right: 10px;
  }
`

export const SearchBar = styled.input`
  width: 50%;
  height: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
`
