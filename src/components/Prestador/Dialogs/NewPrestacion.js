import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { TextField, Button, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'
import prestacionesActions from '../../../state/actions/prestadores'

const newPrestacion = ({ open, onClose, setCargaPrestaciones }) => {
  const dispatch = useDispatch()
  const { idPrestador } = useParams()
  const [prestacion, setPrestacion] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [precios, setPrecios] = useState({
    metropolitana: 0,
    region: 0,
    regionExtrema: 0
  })
  const [CargaPrestacion, setCargaPrestacion] = useState(true)
  const [selectedPrestacion, setSelectedPrestacion] = useState([])
  const cargaPrestaciones = () => {
    dispatch(prestacionesActions.getPrestacionNoAsignadas(idPrestador)).then(
      (data) => {
        setPrestacion(data.prestaciones)
        setCargaPrestacion(false)
      }
    )
  }
  const asignacionPrestacion = () => {
    setCargaPrestacion(true)
    const prestacionAsignada = selectedPrestacion.map((pr) => ({
      id_prestacion: pr.id
    }))
    dispatch(
      prestacionesActions.asignarPrestacion(
        idPrestador,
        {
          prestaciones: prestacionAsignada
        },
        {
          metropolitana: parseInt(precios.metropolitana, 10),
          region: parseInt(precios.region, 10),
          regionExtrema: parseInt(precios.regionExtrema, 10)
        }
      )
    ).then((data) => {
      if (
        data.message ===
        'El prestador ha sido agregado a la prestacion correctamente.'
      ) {
        onClose()
        setCargaPrestacion(false)
        setCargaPrestaciones(true)
        enqueueSnackbar(data.message, { variant: 'success' })
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
              options={prestacion.sort((a, b) => {
                if (
                  a.nombre_prestacion.toUpperCase() >
                  b.nombre_prestacion.toUpperCase()
                ) {
                  return 1
                }
                if (
                  a.nombre_prestacion.toUpperCase() <
                  b.nombre_prestacion.toUpperCase()
                ) {
                  return -1
                }
                return 0
              })}
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
          <Typography align="center">Precios</Typography>
          <Grid>
            <TextField
              label="Metropólitana"
              onChange={(e) =>
                setPrecios({ ...precios, metropolitana: e.target.value })
              }
              type="number"
              min={0}
              defaultValue={0}
            >
              Precio
            </TextField>
          </Grid>
          <Grid>
            <TextField
              label="Región"
              type="number"
              min={0}
              defaultValue={0}
              onChange={(e) =>
                setPrecios({ ...precios, region: e.target.value })
              }
            >
              Precio
            </TextField>
          </Grid>
          <Grid>
            <TextField
              label="Región Extrema"
              type="number"
              min={0}
              defaultValue={0}
              onChange={(e) =>
                setPrecios({ ...precios, regionExtrema: e.target.value })
              }
            >
              Precio
            </TextField>
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
