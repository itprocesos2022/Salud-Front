import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import Details from '../components/Company/Details'
import CompanyConstructions from '../components/Company/Constructions'
import Programs from '../components/Company/Programs'
import Relations from '../components/Company/Relations'

const Companies = lazy(() => import('../pages/Companies'))
const Company = lazy(() => import('../pages/Company'))

const rootName = 'company'

const companyRoutes = [
  {
    path: `/scam/companies`,
    key: 'COMPANIES',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <Companies />
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idCompany/details`,
    key: 'COMPANY-DETAILS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <Company>
              <Details />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idCompany/constructions`,
    key: 'COMPANY-CONSTRUCTIONS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyConstructions />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idCompany/programs`,
    key: 'COMPANY-PROGRAMS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <Company>
              <Programs />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/scam/${rootName}/:idCompany/relations`,
    key: 'COMPANY-RELATIONS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <Company>
              <Relations />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  }
]

export default companyRoutes
