import styled from '@emotion/styled'
import { Card, CardContent, Typography } from '@mui/material'
import { FC } from 'react'
import theme from '../../../utilities/theme'
import Logo from '../../../assets/logo-white.svg'
import SignUpForm from './SignUpForm'

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  width: 416px;
  max-width: 100%;
`

const SignUpHeader = styled.div`
  padding: 18px 36px;
  background: ${theme.color.primary};
  text-align: center;
`

const SignUpContent = styled(CardContent)`
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

const SignUp: FC = () => {
  return (
    <StyledCard>
      <SignUpHeader>
        <img src={Logo} alt="Logo" title="Simple App" height={54} color="#fff" />
      </SignUpHeader>
      <SignUpContent>
        <Title
          variant="h4"
          // @ts-ignore
          component="h1"
        >Free Sign Up</Title>
        <SubTitle variant="body2">Don't have an account? Create your account, it takes less than a minute.</SubTitle>
        <SignUpForm />
      </SignUpContent>
    </StyledCard>
  )
}

export default SignUp