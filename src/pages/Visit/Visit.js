import { Box, IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { useHistory, useParams } from 'react-router-dom'
import { PageHeading } from '../../components/UI'
import VisitDetail from '../../components/Visits/VisitDetail'

const Visit = () => {
  const { idVisit } = useParams()
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  return (
    <div>
      <Box marginBottom="10px" display="flex" alignItems="center">
        <IconButton onClick={goBack}>
          <ArrowBack />
        </IconButton>
        <PageHeading>{`Visita ${idVisit}`}</PageHeading>
      </Box>
      <VisitDetail />
    </div>
  )
}

export default Visit
