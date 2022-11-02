import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'

const Externo = lazy(() => import('../pages/Externo'))
const Sucursal = lazy(() => import('../pages/Sucursal'))

const ExternoRoutes = [
  {
    path: '/scam/externo',
    key: 'EXTERNO',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'PRESTADOR']}
        yes={() => (
          <Layout>
            <Externo />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/externo/sucursal/:idSucursal/details',
    key: 'EXTERNO-SUCURSAL',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'PRESTADOR']}
        yes={() => (
          <Layout>
            <Sucursal />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]
export default ExternoRoutes
