import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import {
  EmployeeInfoContact,
  EmployeeDetails,
  SpecializationHistory,
  EmployeeJobs,
  EmployeeFamiliarGroup
} from '../components/Employee'
import EmployeePrograms from '../components/Employee/EmployeePrograms'

const Login = lazy(() => import('../pages/Login'))
const Employees = lazy(() => import('../pages/Employees'))
const Employee = lazy(() => import('../pages/Employee'))

const rootName = 'employee'

const companyRoutes = [
  {
    path: `/scam/${rootName}s`,
    key: 'EMPLOYEES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employees />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idEmployee/info`,
    key: 'EMPLOYEE-INFO',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeDetails />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idEmployee/contacts`,
    key: 'EMPLOYEE-CONTACT',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeInfoContact />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idEmployee/family`,
    key: 'EMPLOYEE-FAMILY',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeFamiliarGroup />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idEmployee/specialties`,
    key: 'EMPLOYEE-SPECIALTIES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <SpecializationHistory />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idEmployee/jobs-history`,
    key: 'EMPLOYEE-JOBS-HISTORY',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeJobs />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idEmployee/programs`,
    key: 'EMPLOYEE-PROGRAMS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeePrograms />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default companyRoutes
