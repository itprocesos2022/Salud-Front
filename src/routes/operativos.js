import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import OperativosObrasDetails from '../components/Operativos/OperativosObras/details'
import OperativosObraAttended from '../components/Operativos/OperativosObras/attendedEmployees'
import OperativosObraObservation from '../components/Operativos/OperativosObras/observations'

const Operativos = lazy(() => import('../pages/Operativos'))
const Login = lazy(() => import('../pages/Login'))
const Operativo = lazy(() => import('../pages/Operativo/terreno'))

const OperativosRoutes = [
  {
    path: '/scam/operativos',
    key: 'OPERATIVOS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Operativos />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/operativo/terreno/:idOperativo/details',
    key: 'OPERATIVO-TERRENO-DETAILS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'PRESTADOR']}
        yes={() => (
          <Layout>
            <Operativo>
              <OperativosObrasDetails />
            </Operativo>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/operativo/terreno/:idOperativo/attended',
    key: 'OPERATIVO-TERRENO-ATTENDED',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'PRESTADOR']}
        yes={() => (
          <Layout>
            <Operativo>
              <OperativosObraAttended />
            </Operativo>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/operativo/terreno/:idOperativo/observations',
    key: 'OPERATIVO-TERRENO-OBSERVATIONS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'PRESTADOR']}
        yes={() => (
          <Layout>
            <Operativo>
              <OperativosObraObservation />
            </Operativo>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default OperativosRoutes
