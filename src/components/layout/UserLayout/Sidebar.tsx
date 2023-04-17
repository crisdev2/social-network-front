import styled from '@emotion/styled'
import { List, ListSubheader } from '@mui/material'
import { FC } from 'react'
import theme from '../../../utilities/theme'
import SidebarItem from './SidebarItem'
import SimpleBar from 'simplebar-react'
import { Box } from '@mui/system'
import Logo from '../../../assets/logo.svg'
import 'simplebar-react/dist/simplebar.min.css'
import Menu from '../../../utilities/menu'

const StyledSidebar = styled.div`
  width: 260px;
  z-index: 10;
  background: ${theme.bg.sidebar};
  color: ${theme.menu.item};
  bottom: 0;
  position: fixed;
  top: 0;
  padding-top: 70px;
  transition: all 0.2s;
  &[data-condensed] {
    position: absolute;
    width: 70px;
    z-index: 5;
    padding-top: 70px;
  }
  @media (max-width: 768px) {
    position: fixed;
    width: 260px;
    left: -260px;
    transition: all 0.2s;
    z-index: 10;
    &[data-show-mobile] {
      left: 0px;
    }
  }
`

const LogoWrapper = styled.div`
  background: ${theme.bg.sidebar};
  width: 260px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  transition: all 0.2s;
  &[data-condensed] {
    width: 70px;
    z-index: 1;
  }
`

const MenuWrapper = styled(SimpleBar)`
  max-height: 100%;
`

const Sidebar: FC<Props> = ({ condensed, showMobile }) => {
  return (
    <StyledSidebar
      data-condensed={condensed ? "": undefined}
      data-show-mobile={showMobile ? "": undefined}
    >
      <LogoWrapper data-condensed={condensed ? "": undefined}>
        <img src={Logo} alt="Logo" title="Simple App" height={!condensed ? "72" : "36"} />
      </LogoWrapper>
      <Box component={!condensed ? MenuWrapper : 'div'}>
        {Menu.map((item, index) => (
          <List
            key={index}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={!condensed &&
              <ListSubheader component="div" disableSticky>
                {item.title}
              </ListSubheader>
            }
            sx={condensed ? {pt: 0, pb: 0} : undefined}
          >
            {item.child?.map((subitem, subindex) => (
              <SidebarItem item={subitem} key={subindex} condensed={condensed} level={1} />
            ))}
          </List>
        ))}
      </Box>
    </StyledSidebar>
  )
}

interface Props {
  condensed: boolean
  showMobile: boolean
}

export default Sidebar