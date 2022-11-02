import { useState } from 'react'
import { Box } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Tabs } from '../Shared'

const ProgramTabs = ({ children }) => {
  const history = useHistory()
  const location = useLocation()
  const { idProgram } = useParams()

  const getValue = () => {
    if (location.pathname.includes('history')) return 1

    return 0
  }

  const [tab] = useState(getValue())

  const getRoute = (value) => {
    if (value === 1) return 'history'
    return 'details'
  }

  const handleTabChange = (__, newValue) => {
    history.push(`/scam/program/${idProgram}/${getRoute(newValue)}`)
  }

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        tabs={['Detalle', 'Historial']}
      >
        {children}
      </Tabs>
    </Box>
  )
}

export default ProgramTabs
