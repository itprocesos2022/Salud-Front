import { Box, Typography, Grid } from '@material-ui/core'
import { Dialog, DatePicker } from '../Shared'
import { TextField, Button } from '../UI'

const WorkerNewModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
    <Box>
      <Box>
        <Box mb={4}>
          <Typography align="center">Crear Titular</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Run" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Nombre" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Sexo" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker label="Fecha de Nacimiento" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Domicilio" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Comuna" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Teléfono(1)" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Teléfono(2)" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Email" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Previsión" />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField label="Cargo Laboral" />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={onClose}>Crear</Button>
        </Box>
      </Box>
    </Box>
  </Dialog>
)

export default WorkerNewModal
