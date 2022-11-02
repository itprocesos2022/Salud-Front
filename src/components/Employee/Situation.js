import { Grid } from '@material-ui/core'
import PensionSituation from './PensionSituation'
import HousingSituation from './HousingSituation'

const Situation = () => (
  <Grid container spacing={1}>
    <Grid item xs={12} md={6}>
      <PensionSituation />
    </Grid>
    <Grid item xs={12} md={6}>
      <HousingSituation />
    </Grid>
  </Grid>
)

export default Situation
