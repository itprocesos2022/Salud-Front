import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTheme } from '@material-ui/core/styles'
import authActions from '../../state/actions/auth'
import useStyles from './styles'
import useMenu from '../../hooks/useMenu'
import LeftDrawer from './LeftDrawer'

const ResponsiveDrawer = ({ ...props }) => {
  const { window } = props
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { open, anchorEl, handleClose, handleOpen } = useMenu()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  /* const onCalendarClick = () => {
    history.push('/sictra/calendar')
  } 
  */
  const onProfileClick = () => {
    history.push('/sictra/perfil')
  }
  const onScam = () => {
    history.push('/scam/home')
  }

  const logoutUser = () => {
    dispatch(authActions.logout())
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="transparent"
        classes={{ root: classes.rootAppBar }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            justifyContent="flex-end"
            width="100%"
            alignItems="center"
          >
            <Box display={'flex'}>
              {user &&
                (user.profilePicture !== '' ? (
                  <Avatar
                    className={classes.avatar}
                    src={user.profilePicture}
                  ></Avatar>
                ) : (
                  <Avatar className={classes.avatar}>
                    {user.name.charAt(0)}
                  </Avatar>
                ))}
              {user && (
                <Box ml={1}>
                  <Typography
                    className={classes.name}
                  >{`${user.names} ${user.paternal_surname}`}</Typography>
                  <Typography className={classes.role}>
                    {user.role.name}
                  </Typography>
                </Box>
              )}

              <IconButton onClick={handleOpen}>
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          </Box>
          <Menu
            id="menu-profile"
            open={open}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            classes={{ paper: classes.menuOptionRoot }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <MenuItem className={classes.menuItem}>Mi Calendario</MenuItem>
            <MenuItem className={classes.menuItem} onClick={onProfileClick}>
              Perfil
            </MenuItem>
            <Divider />
            <MenuItem className={classes.menuItem} onClick={onScam}>
              Ir a Scam
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={logoutUser}>
              Cerrar sesi??n
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="options">
        <Hidden lgUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <LeftDrawer />
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
              paperAnchorDockedLeft: classes.paperAnchorDockedLeft
            }}
            variant="permanent"
            open
          >
            <LeftDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func
}

export default ResponsiveDrawer
