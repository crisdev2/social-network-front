import styled from '@emotion/styled'
import { FC, useEffect } from 'react'
import { login, logout, useUserSelector } from '../../features/userSlice'
import UserLayout from './UserLayout'
import AnonymousLayout from './AnonymousLayout'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const StyledLayout = styled.div`
`

const Layout: FC<Props> = (props) => {
  const user = useUserSelector()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const parseJwt = (token: string | null) => {
    if (!token) return null
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  const data = parseJwt(localStorage.getItem('access_token'))

  useEffect(() => {
    if (data) {
      dispatch(login(data))
    } else {
      dispatch(logout())
    }
  }, [data])

  return (
    <StyledLayout>
      {user.isAuthenticated ?
        <UserLayout>{props.children}</UserLayout>
        :
        <AnonymousLayout>{props.children}</AnonymousLayout>
      }
    </StyledLayout>
  )
}

interface Props {
  children?: React.ReactNode | string
}

export default Layout