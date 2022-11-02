import {
  DashboardOutlined as DashboardIcon,
  People as UserIcon,
  Settings as SettingsIcon
} from '@material-ui/icons'

const modulesByRole = {
  COMMON: [{ title: 'Home', path: '/sictra/home', icon: <DashboardIcon /> }],
  ADMIN: [
    {
      index: 5,
      title: 'Usuarios',
      path: '/sictra/users',
      icon: <UserIcon />
    },

    {
      title: 'Configuración',
      icon: <SettingsIcon />
    }
  ]
}

export default modulesByRole
