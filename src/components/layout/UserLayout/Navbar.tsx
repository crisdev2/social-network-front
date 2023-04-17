import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import theme from '../../../utilities/theme'
import Icon from '../../shared/Icon'
import { login, logout, useUserSelector } from '../../../features/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const StyledNavbar = styled.div`
  background: ${theme.bg.content};
  position: fixed;
  top: 0;
  padding: 0 24px;
  min-height: 70px;
  left: 260px;
  right: 0;
  z-index: 6;
  box-shadow: 0 0 35px 0 rgba(154,161,171,.15);
  box-shadow: 0px 0px 35px 0px rgba(154,161,171,0.15);
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &[data-condensed] {
    left: 70px;
  }
  @media (max-width: 768px) {
    left: 0;
    &[data-show-mobile] {
      left: 260px;
    }
  }
`

const StyledButton = styled(Button)`
  color: ${theme.navbar.menu};
  height: 70px;
  line-height: 70px;
  width: 60px;
  font-size: 24px;
  margin-left: -24px;
  &:hover {
    background: transparent;
  }
`

const UserActions = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  background: ${theme.navbar.userbg};
  border: 1px solid ${theme.navbar.userborder};
  padding: 0 20px;
`

const UserData = styled.div`
  margin-right: 10px;
  color: ${theme.navbar.usercolor};
`

const UserImage = styled.img`
  border-radius: 100%;
  margin-right: 10px;
`

const Navbar: FC<Props> = ({ toggleCondensed, condensed, showMobile }) => {
  const user = useUserSelector()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }
  return (
    <StyledNavbar
      data-condensed={condensed ? "": undefined}
      data-show-mobile={showMobile ? "": undefined}
    >
      <StyledButton color="inherit" variant="text" onClick={toggleCondensed}>
        <Icon>menu</Icon>
      </StyledButton>
      <UserActions>
        {user.isAuthenticated && 
          <>
            <UserImage src={user.image} alt="User avatar" height={40} width={40} />
            <UserData>
              <Typography component="div" variant="h6">{user.username}</Typography>
              <Typography component="div" variant="overline">{user.role}</Typography>
            </UserData>
          </>
        }
        {user.isAuthenticated === false ?
          <Button variant="outlined" onClick={() => navigate('/login')}>Login</Button> :
          <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        }
      </UserActions>
    </StyledNavbar>
  )
}

interface Props {
  toggleCondensed: () => void
  condensed: boolean
  showMobile: boolean
}

export default Navbar