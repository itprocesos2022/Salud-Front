import { useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Tabs } from '../../Shared'

const operativoObrasTabs = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const { idOperativo } = useParams()

  const getValue = () => {
    if (location.pathname.includes('observations')) return 2
    if (location.pathname.includes('attended')) return 1
    return 0
  }

  const [tab] = useState(getValue())

  const getRoute = (value) => {
    if (value === 2) return 'observations'
    if (value === 1) return 'attended'
    return 'details'
  }

  const handleTabChange = (__, newValue) => {
    history.push(`/scam/operativo/terreno/${idOperativo}/${getRoute(newValue)}`)
  }

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        tabs={['Detalles', 'Trabajadores Atendidos', 'Observaciones']}
      >
        {children}
      </Tabs>
    </Box>
  )
}

export default operativoObrasTabs
