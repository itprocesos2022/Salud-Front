import { useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Tabs } from '../Shared'

const PrestacionTabs = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const { idPrestacion } = useParams()

  const getValue = () => {
    if (location.pathname.includes('stages')) return 2
    if (location.pathname.includes('type')) return 1

    return 0
  }

  const [tab] = useState(getValue())

  const getRoute = (value) => {
    if (value === 2) return 'stages'
    if (value === 1) return 'type'
    return 'details'
  }

  const handleTabChange = (__, newValue) => {
    history.push(`/scam/prestacion/${idPrestacion}/${getRoute(newValue)}`)
  }

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        tabs={['Descripción', 'Tipo de Beneficiario', 'Etapas']}
      >
        {children}
      </Tabs>
    </Box>
  )
}

export default PrestacionTabs
