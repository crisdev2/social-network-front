import styled from '@emotion/styled'
import { FC, useEffect, useState } from 'react'
import theme from '../../../utilities/theme'
import Container from './Container'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useUserSelector } from '../../../features/userSlice'
import { redirect, useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  width: 100%;
  position: relative;
`

const Main = styled.div`
  background: ${theme.bg.body};
  margin-left: 260px;
  overflow: hidden;
  padding: 70px 12px 65px;
  min-height: 100vh;
  box-sizing: border-box;
  transition: all 0.2s;
  &[data-condensed] {
    margin-left: 70px;
  }
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`

const UserLayout: FC<Props> = (props) => {
  const user = useUserSelector()
  const navigate = useNavigate()
  
  const [condensed, setCondensed] = useState<boolean>(false);
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const toggleCondensed = () => {
    if (window.innerWidth > 768) {
      setCondensed(!condensed)
    } else {
      setShowMobile(!showMobile)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        if (condensed) setCondensed(false)
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [condensed])

  useEffect(() => {
    if (user) {
      if (user.isAuthenticated === false) navigate('/login')
    }
  }, [user])

  return (
    <Wrapper>
      <Sidebar condensed={condensed} showMobile={showMobile} />
      <Main data-condensed={condensed ? "": undefined}>
        <Navbar toggleCondensed={toggleCondensed} condensed={condensed} showMobile={showMobile} />
        <Container>{props.children}</Container>
      </Main>
    </Wrapper>
  )
}

interface Props {
  children?: React.ReactNode;
}

export default UserLayout