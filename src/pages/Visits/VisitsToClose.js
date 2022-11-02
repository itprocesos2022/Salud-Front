import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import VisitsToClose from '../../components/Visits/VisitsToClose'

const CloseVisits = () => (
  <Box>
    <PageHeading> Visitas por cerrar</PageHeading>
    <VisitsToClose />
  </Box>
)

export default CloseVisits
