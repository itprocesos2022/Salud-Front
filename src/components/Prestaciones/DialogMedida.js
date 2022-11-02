import { Box, Typography, Grid } from '@material-ui/core'
import { TextField, Button, Select } from '../UI'
import { Dialog } from '../Shared'
import useStyles from './Steps/styles'

const DialogMedida = ({ open, onClose }) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">Crear Medida</Typography>
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
              <Button onClick={onClose} variant="outlined">
                Cerrar
              </Button>
              <Button onClick={onClose}>Crear</Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default DialogMedida
