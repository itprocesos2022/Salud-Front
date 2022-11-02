import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import PrestacionDetail from '../components/Prestaciones/PrestacionDetail'
import PrestacionStages from '../components/Prestaciones/PrestacionStages'
import Prestaciontype from '../components/Prestaciones/PrestacionType'

const Prestaciones = lazy(() => import('../pages/Prestaciones'))
const Prestacion = lazy(() => import('../pages/Prestacion'))
const Etapa = lazy(() => import('../pages/Etapa'))

const PrestacionesRoutes = [
  {
    path: '/scam/prestaciones',
    key: 'PRESTACIONES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestaciones />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/prestacion/:idPrestacion/details',
    key: 'PRESTACION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestacion>
              <PrestacionDetail />
            </Prestacion>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/prestacion/:idPrestacion/type',
    key: 'PRESTACION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestacion>
              <Prestaciontype />
            </Prestacion>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/prestacion/:idPrestacion/stages',
    key: 'PRESTACION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Prestacion>
              <PrestacionStages />
            </Prestacion>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/prestacion/:idPrestacion/stages/:idEtapa',
    key: 'PRESTACION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Etapa />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default PrestacionesRoutes
