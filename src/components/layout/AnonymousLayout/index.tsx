import styled from '@emotion/styled'
import { FC, useEffect } from 'react';
import LoginBg from '../../../assets/login-bg.svg'
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserSelector } from '../../../features/userSlice';

const StyledAnonymousLayout = styled.div`
  background-image: url(${LoginBg});
  background-size: cover;
  background-position: 50%;
  height: 100vh;
  padding: 4.5rem 0;
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const AnonymousLayout: FC<Props> = (props) => {
  const navigate = useNavigate()
  const user = useUserSelector()

  useEffect(() => {
    if (user) {
      if (user.isAuthenticated === false && ['/login', '/signup'].includes(window.location.pathname) === false) navigate('/login')
    }
  }, [user])

  return (
    <StyledAnonymousLayout>
      <Container>
        <Content>
          {props.children}
        </Content>
      </Container>
    </StyledAnonymousLayout>
  )
}

interface Props {
  children?: React.ReactNode;
}

export default AnonymousLayout