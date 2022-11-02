import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import SictraLayout from '../components/SictraLayout'
import Can from '../components/Can'
import companyRoutes from './company'
import employeeRoutes from './employee'
import PrestacionesRoutes from './prestaciones'
import PrestadorRoutes from './PrestadorRoutes'
import ProgramsRoutes from './ProgramsRoutes'
import ExternoRoutes from './ExternoRoutes'
import Forbidden from '../pages/Forbidden'
import Operativos from './operativos'

const Login = lazy(() => import('../pages/Login'))
const Home = lazy(() => import('../pages/Home'))
const SelectSystem = lazy(() => import('../pages/SelectSystem'))
const Sictra = lazy(() => import('../pages/Sictra'))
const Settings = lazy(() => import('../pages/Settings'))
const Construction = lazy(() => import('../pages/Construction'))
const Constructions = lazy(() => import('../pages/Constructions'))
const Users = lazy(() => import('../pages/Users'))
const Calendar = lazy(() => import('../pages/Calendar'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const Visits = lazy(() => import('../pages/Visits'))
const VisitsToClose = lazy(() => import('../pages/Visits/VisitsToClose'))
const Visit = lazy(() => import('../pages/Visit'))

const routes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    component: ({ authenticated }) =>
      authenticated ? <Redirect to="/select" /> : <Redirect to="/login" />
  },
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    component: Login
  },
  {
    path: '/select',
    key: 'SELECT',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => <SelectSystem />}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/home',
    key: 'scam',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Home />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/obras',
    key: 'CONSTRUCTION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Constructions />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/obras/:idConstruction',
    key: 'CONSTRUCTIONS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Construction />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/settings',
    key: 'SETTINGS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Settings />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/users',
    key: 'USERS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Users />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/calendar',
    key: 'USERS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Calendar />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/visits',
    key: 'VISITS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Visits />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/visits-close',
    key: 'VISITS-TO-CLOSE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <VisitsToClose />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/visit/:idVisit',
    key: 'VISIT-PAGE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Visit />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/perfil',
    key: 'PROFILE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Profile />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/sictra/home',
    key: 'SICTRA',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <SictraLayout>
            <Sictra />
          </SictraLayout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/sictra/perfil',
    key: 'PROFILE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <SictraLayout>
            <Profile />
          </SictraLayout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/sictra/users',
    key: 'USERS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <SictraLayout>
            <Users />
          </SictraLayout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  ...ExternoRoutes,
  ...companyRoutes,
  ...employeeRoutes,
  ...PrestacionesRoutes,
  ...PrestadorRoutes,
  ...ProgramsRoutes,
  ...Operativos
]
export default routes
