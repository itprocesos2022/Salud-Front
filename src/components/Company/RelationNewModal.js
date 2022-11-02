import { Box, Typography, Grid } from '@material-ui/core'
import { Dialog } from '../Shared'
import { TextField, Button } from '../UI'

const RelationNewModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
    <Box>
      <Box>
        <Box mb={4}>
          <Typography align="center">Asociar nueva Empresa</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Razón Social" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Rut" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Tipo de relación" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Dirección" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Comuna" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Región" />
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

export default RelationNewModal
