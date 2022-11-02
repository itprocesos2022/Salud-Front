import { useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Tabs } from '../Shared'

const CompanyTabs = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const { idCompany } = useParams()

  const getValue = () => {
    if (location.pathname.includes('relations')) return 3
    if (location.pathname.includes('programs')) return 2
    if (location.pathname.includes('constructions')) return 1

    return 0
  }

  const [tab] = useState(getValue())

  const getRoute = (value) => {
    if (value === 3) return 'relations'
    if (value === 2) return 'programs'
    if (value === 1) return 'constructions'
    return 'details'
  }

  const handleTabChange = (__, newValue) => {
    history.push(`/scam/company/${idCompany}/${getRoute(newValue)}`)
  }

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        tabs={['Detalles', 'Obras', 'Programas', 'Relaciones']}
      >
        {children}
      </Tabs>
    </Box>
  )
}

export default CompanyTabs
