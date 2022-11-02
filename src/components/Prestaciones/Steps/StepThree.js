import { Box, Typography, Grid } from '@material-ui/core'
import {
  ArrowForward as NextIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import { TextField, Button, Select, SearchInput } from '../../UI'
import useStyles from './styles'

const StepThree = ({ onClose, create, setCreate }) => {
  const classes = useStyles()
  const handleBack = () => {
    setCreate({ ...create, step: create.step - 1 })
  }
  return (
    <Box>
      <Box>
        <Typography align="center">Crear Medida</Typography>
        <Box p={2}>
          <SearchInput placeholder="Busca una medida creada" />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Nombre de la Medida" />
          </Grid>
          <Grid item xs={12}>
            <Select label="Tipo de le Medida">
              <option value="">Sin Tipo</option>
              <option value="">Tipo 1</option>
              <option value="">Tipo 2</option>
              <option value="">Tipo 3</option>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Descripción de la Medida" />
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
            <Button onClick={onClose} endIcon={<NextIcon />}>
              Crear
            </Button>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default StepThree
