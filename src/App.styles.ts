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
