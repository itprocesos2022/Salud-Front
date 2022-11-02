import { Box, Typography, Grid } from '@material-ui/core'
import { Dialog } from '../Shared'
import { TextField, Button } from '../UI'

const ConstructionNewModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
    <Box>
      <Box>
        <Box mb={4}>
          <Typography align="center">Crear Obra</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Nombre de Obra" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Dirección de Obra" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Teléfono" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Encargado de Obra" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Teléfono Encargado" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Email Encargado" />
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

export default ConstructionNewModal
