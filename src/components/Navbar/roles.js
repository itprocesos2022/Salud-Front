import {
  DashboardOutlined as DashboardIcon,
  Settings as SettingsIcon,
  BusinessCenter as BusinessIcon,
  Domain as DomainIcon,
  People as UserIcon,
  AssignmentInd as EmployeeIcon,
  Storage as StorageIcon,
  Dns as DnsIcon,
  AddToQueue as AddToQueueIcon,
  CalendarToday as CalendarTodayIcon,
  AssignmentIndOutlined,
  Assignment as VisitIcon
} from '@material-ui/icons'

const modulesByRole = {
  COMMON: [{ title: 'Home', path: '/scam/home', icon: <DashboardIcon /> }],
  ADMIN: [
    {
      title: 'Prestaciones',
      path: '/scam/prestaciones',
      icon: <StorageIcon />
    },
    {
      title: 'Prestadores',
      path: '/scam/prestadores',
      icon: <DnsIcon />
    },
    {
      title: 'Empresas',
      path: '/scam/companies',
      icon: <BusinessIcon />
    },
    {
      title: 'Trabajadores',
      path: '/scam/employees',
      icon: <EmployeeIcon />
    },
    {
      title: 'Visitas',
      path: '/scam/visits',
      icon: <VisitIcon />
    },
    {
      title: 'Programas',
      path: '/scam/Programs',
      icon: <AddToQueueIcon />
    },
    {
      title: 'Prestador',
      path: '/scam/externo',
      icon: <DomainIcon />
    },
    {
      title: 'Operativos',
      path: '/scam/operativos',
      icon: <AssignmentIndOutlined />
    },
    {
      title: 'Calendario',
      path: '/scam/calendar',
      icon: <CalendarTodayIcon />
    },
    {
      index: 5,
      title: 'Usuarios',
      path: '/scam/users',
      icon: <UserIcon />
    },

    {
      title: 'Configuración',
      path: '/scam/settings',
      icon: <SettingsIcon />
    }
  ]
}

export default modulesByRole
