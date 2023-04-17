import styled from '@emotion/styled'
import { Card, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import theme from '../../../utilities/theme'
import Logo from '../../../assets/logo-white.svg'
import LoginForm from './LoginForm'

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  width: 416px;
  max-width: 100%;
`

const LoginHeader = styled.div`
  padding: 18px 36px;
  background: ${theme.color.primary};
  text-align: center;
`

const LoginContent = styled(CardContent)`
  padding: 2.25rem;
`

const Title = styled(Typography)`
  color: ${theme.color.pageTitle};
  text-align: center;
  margin-bottom: 10px;
`

const SubTitle = styled(Typography)`
  color: ${theme.color.textMuted};
  text-align: center;
  margin-bottom: 2.25rem;
`

const Login: FC = () => {
  return (
    <StyledCard>
      <LoginHeader>
        <img src={Logo} alt="Logo" title="Simple App" height={54} color="#fff" />
      </LoginHeader>
      <LoginContent>
        <Title
          variant="h4"
          // @ts-ignore
          component="h1"
        >Sign In</Title>
        <SubTitle variant="body2">Enter your email address and password to access admin panel.</SubTitle>
        <LoginForm />
      </LoginContent>
    </StyledCard>
  )
}

export default Login