import { Box, Typography, Grid } from '@material-ui/core'
import {
  ArrowForward as NextIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import { TextField, Button } from '../../UI'
import useStyles from './styles'

const StepTwo = ({ create, setCreate }) => {
  const classes = useStyles()
  const handleNext = () => {
    setCreate({ ...create, step: create.step + 1 })
  }

  const handleBack = () => {
    setCreate({ ...create, step: create.step - 1 })
  }
  return (
    <Box>
      <Box>
        <Typography align="center">Crear Etapa</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Nombre de la Etapa" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Orden de la Etapa" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Descripción de la Etapa" />
          </Grid>
        </Grid>
        <Box>
          <div className={classes.actions}>
            <Button
              onClick={handleBack}
              variant="outlined"
              startIcon={<BackIcon />}
            >
              Volver
            </Button>
            <Button onClick={handleNext} endIcon={<NextIcon />}>
              Siguiente
            </Button>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default StepTwo
