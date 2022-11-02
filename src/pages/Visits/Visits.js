import { Box } from '@material-ui/core'
import { PageHeading } from '../../components/UI'
import VisitList from '../../components/Visits/VisitList'

const Visits = () => (
  <Box justifyContent="flex-start">
    <PageHeading>Próximas visitas</PageHeading>

    <VisitList />
  </Box>
)

export default Visits
