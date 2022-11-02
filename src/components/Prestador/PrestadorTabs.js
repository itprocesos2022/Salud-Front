import { useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Tabs } from '../Shared'

const PrestadorTabs = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const { idPrestador } = useParams()

  const getValue = () => {
    if (location.pathname.includes('teams')) return 3
    if (location.pathname.includes('prestaciones')) return 2
    if (location.pathname.includes('sucursales')) return 1

    return 0
  }

  const [tab] = useState(getValue())

  const getRoute = (value) => {
    if (value === 3) return 'teams'
    if (value === 2) return 'prestaciones'
    if (value === 1) return 'sucursales'
    return 'details'
  }

  const handleTabChange = (__, newValue) => {
    history.push(`/scam/prestador/${idPrestador}/${getRoute(newValue)}`)
  }

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        tabs={['Detalles', 'Sucursales', 'Prestaciones', 'Equipos']}
      >
        {children}
      </Tabs>
    </Box>
  )
}

export default PrestadorTabs
