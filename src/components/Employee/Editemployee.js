import { useSelector } from 'react-redux'
import { Box, Dialog, Grid, Typography } from '@material-ui/core'
import { Button, TextField } from '../UI'

const EditEmployee = ({ open, onClose }) => {
  const { isMobile } = useSelector((state) => state.ui)
  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile}>
      <Box>
        <Typography variant="h6" align="center">
          Editar Trabajador
        </Typography>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <TextField label="Run" placeholder="14.454.323-9" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Nombres" placeholder="Alejandro Marcos" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Apellido Paterno" placeholder="Perez" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Apellido Materno" placeholder="Astudillo" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Sexo" placeholder="Masculino" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Estado Civil" placeholder="Soltero" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Nacionalidad" placeholder="Chilena" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Etnia" placeholder="Mapuche" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Fecha de nacimiento" placeholder="02/04/1993" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Discapacidad" placeholder="No" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Credencial discapacidad" placeholder="No" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="Tipo de discapacidad" placeholder="Ninguna" />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField label="% Discapacidad" placeholder="0%" />
            </Grid>
          </Grid>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={onClose}>Guardar</Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default EditEmployee
