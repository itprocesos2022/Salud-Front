import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import PrestadorDetails from '../components/Prestador/PrestadorDetails'
import PrestadorSucursales from '../components/Prestador/PrestadorSucursales'
import PrestadorPrestaciones from '../components/Prestador/PrestadorPrestaciones'
import PrestadorTeams from '../components/Prestador/PrestadorTeams'

const Prestadores = lazy(() => import('../pages/Prestadores'))
const Prestador = lazy(() => import('../pages/Prestador'))

const PrestadorRoutes = [
  {
    path: '/scam/prestadores',
    key: 'PRESTADORES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestadores />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/prestador/:idPrestador/details',
    key: 'PRESTADOR',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestador>
              <PrestadorDetails />
            </Prestador>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/prestador/:idPrestador/sucursales',
    key: 'PRESTADOR',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestador>
              <PrestadorSucursales />
            </Prestador>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/prestador/:idPrestador/prestaciones',
    key: 'PRESTADOR',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestador>
              <PrestadorPrestaciones />
            </Prestador>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/prestador/:idPrestador/teams',
    key: 'PRESTADOR',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestador>
              <PrestadorTeams />
            </Prestador>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default PrestadorRoutes
