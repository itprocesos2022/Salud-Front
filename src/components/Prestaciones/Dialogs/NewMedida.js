import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { TextField, Button, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'
import medidasActions from '../../../state/actions/medidas'

const newMedida = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { idEtapa } = useParams()
  const [medida, setMedida] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [cargaMedida, setCargaMedida] = useState(true)
  const [selectedMedida, setSelectedMedida] = useState([])
  const cargaMedidas = () => {
    dispatch(medidasActions.getMedidas()).then((data) => {
      setMedida(data.medida.rows)
      setCargaMedida(false)
    })
  }

  const asignacionMedida = () => {
    // console.log(selectedMedida)
    // console.log(idEtapa)
    // console.log(enqueueSnackbar)
    setCargaMedida(true)
    const medidaAsignada = selectedMedida.map((pr) => pr.id)
    console.log(medidaAsignada)
    dispatch(medidasActions.asignarMedida(idEtapa, medidaAsignada)).then(
      (data) => {
        if (data.message === 'Asociación exitosa.') {
          onClose()
          enqueueSnackbar(data.message, { variant: 'success' })
          window.location.reload()
          setCargaMedida(false)
        } else {
          setCargaMedida(false)
          enqueueSnackbar('Algo salió mal, intentelo en unos minutos', {
            variant: 'error'
          })
        }
      }
    )
  }

  useEffect(() => {
    if (open) cargaMedidas()
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">Asignar Medida</Typography>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={medida}
              value={selectedMedida}
              onChange={(_, option) => setSelectedMedida(option)}
              getOptionLabel={(option) => option.TipoMedida.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medidas"
                  placeholder="Seleccione la medida"
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
                loading={cargaMedida}
                onClick={asignacionMedida}
                disabled={selectedMedida.length === 0}
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

export default newMedida
