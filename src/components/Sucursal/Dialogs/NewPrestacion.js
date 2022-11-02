import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { TextField, Button, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'
import prestacionesActions from '../../../state/actions/prestaciones'
import sucursalesActions from '../../../state/actions/Sucursales'

const newPrestacion = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { idSucursal } = useParams()
  const [prestacion, setPrestacion] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [CargaPrestacion, setCargaPrestacion] = useState(true)
  const [selectedPrestacion, setSelectedPrestacion] = useState([])
  const cargaPrestaciones = () => {
    dispatch(prestacionesActions.getPrestaciones()).then((data) => {
      setPrestacion(data.prestaciones.rows)
      setCargaPrestacion(false)
    })
  }

  const asignacionPrestacion = () => {
    setCargaPrestacion(true)
    const prestacionAsignada = selectedPrestacion.map((pr) => ({
      id_prestacion: pr.id
    }))
    dispatch(
      sucursalesActions.asignarPrestacion(idSucursal, {
        prestaciones: prestacionAsignada
      })
    ).then((data) => {
      if (
        data.message === 'Sucursal agregados a la prestacion correctamente.'
      ) {
        onClose()
        setCargaPrestacion(false)
        enqueueSnackbar('Prestación asignada correctamente', {
          variant: 'success'
        })
      } else {
        setCargaPrestacion(false)
        enqueueSnackbar('Algo salió mal, intentelo en unos minutos', {
          variant: 'error'
        })
      }
    })
  }

  useEffect(() => {
    if (open) cargaPrestaciones()
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">Asignar Prestación</Typography>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={prestacion}
              value={selectedPrestacion}
              onChange={(_, option) => setSelectedPrestacion(option)}
              getOptionLabel={(option) => option.nombre_prestacion}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Prestaciones"
                  placeholder="Seleccione la prestación"
                />
              )}
            />
          </Grid>
          <Box>
            <div>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                loading={CargaPrestacion}
                onClick={asignacionPrestacion}
                disabled={selectedPrestacion.length === 0}
              >
                Asignar
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default newPrestacion
