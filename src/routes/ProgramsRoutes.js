import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import ProgramDetail from '../components/Programs/ProgramDetail'
// import ProgramAsignation from '../components/Programs/ProgramAsignation'
import Programhistory from '../components/Programs/ProgramHistory'

const Programs = lazy(() => import('../pages/Programs'))
const Program = lazy(() => import('../pages/Program'))

const ProgramsRoutes = [
  {
    path: '/scam/programs',
    key: 'Programs',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Programs />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/program/:idProgram/details',
    key: 'PRESTACION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Program>
              <ProgramDetail />
            </Program>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scam/program/:idProgram/history',
    key: 'PROGRAMA-HISTORY',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Program>
              <Programhistory />
            </Program>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default ProgramsRoutes
