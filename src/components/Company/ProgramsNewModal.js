import { Box, Typography, Grid } from '@material-ui/core'
import { Dialog } from '../Shared'
import { TextField, Button } from '../UI'

const ProgramsNewModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
    <Box>
      <Box>
        <Box mb={4}>
          <Typography align="center">Crear Programa</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Nombre del Programa" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Tipo de Programa" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Año del Programa" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Presupuesto" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Cupos" />
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

export default ProgramsNewModal
