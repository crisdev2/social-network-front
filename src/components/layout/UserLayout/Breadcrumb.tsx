import styled from '@emotion/styled'
import { Breadcrumbs, Skeleton } from '@mui/material'
import theme from '../../../utilities/theme'
import Icon from '../../shared/Icon'
import Link from '../../shared/Link'
import { IBreadcrumb } from '../../../models/breadcrumbModel'
import { FC } from 'react'

const StyledBreadcrumb = styled(Breadcrumbs)`
`

const StyledIcon = styled(Icon)`
  color: ${theme.breadcrumb.icon};
`

const Item = styled.span`
  color: ${theme.breadcrumb.item};
`

const Breadcrumb: FC = () => {
  const breadcrumb: IBreadcrumb[] = [
    {
      title: "Home",
      path: "/",
      enabled: true
    },
    {
      title: "Posts",
      path: "/posts",
      enabled: true
    },
    {
      title: "Last posts",
      path: "/posts",
      enabled: false
    },
  ]
  return (
    <StyledBreadcrumb separator={<StyledIcon fontSize="small">navigate_next</StyledIcon>} aria-label="breadcrumb">
      {breadcrumb.map((item, index) => (
        item.enabled ?
          <Link underline="none" href={item.path} key={index}>{item.title}</Link>
          :
          <Item key={index}>{item.title}</Item>
      ))}
    </StyledBreadcrumb>
  )
}

export default Breadcrumb