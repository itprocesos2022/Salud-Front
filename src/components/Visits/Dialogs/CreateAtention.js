import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { TextField, Button, SubmitButton } from '../../UI'
import { COLORS } from '../../../utils/generateColor'
import { Dialog } from '../../Shared'
import EmployeeRow from './EmployeeRow'
import prestacionesActions from '../../../state/actions/prestaciones'
import medidasActions from '../../../state/actions/medidas'

const CreateAtention = ({ open, onClose, selectedUser, idPrestacion }) => {
  const dispatch = useDispatch()
  const [Etapa, setEtapa] = useState([])
  const [selectedEtapa, setSelectedEtapa] = useState()
  const [cargaEtapa, setCargaEtapa] = useState(true)
  const [medidas, setMedidas] = useState([])
  const EtapaPrestacion = () => {
    dispatch(prestacionesActions.getEtapas(idPrestacion)).then((data) => {
      setEtapa(data.etapas)
      setCargaEtapa(false)
    })
  }
  const MedidasEtapa = () => {
    dispatch(medidasActions.getMedidasByEtapa(selectedEtapa.id)).then(
      (data) => {
        setMedidas(data.rows)
      }
    )
  }
  useEffect(() => {
    EtapaPrestacion()
  }, [])

  useEffect(() => {
    if (selectedEtapa) MedidasEtapa()
  }, [selectedEtapa])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography container spacing={2} align="center">
            Crear Atención
          </Typography>
          <EmployeeRow
            selectable={false}
            option={{ ...selectedUser, avatarBg: COLORS[1] }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                options={Etapa}
                value={selectedEtapa}
                onChange={(_, option) => setSelectedEtapa(option)}
                getOptionLabel={(option) => option?.nombre_etapa}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Etapa"
                    placeholder="Seleccione la Etapa"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {medidas.length > 0 &&
                medidas.map((medida) => (
                  <div>
                    {medida.medida.nombre_tipo_medida}{' '}
                    <Grid>
                      <Grid item xs={12} md={6}>
                        <TextField />
                      </Grid>
                    </Grid>
                  </div>
                ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Valor Medida" />
            </Grid>
          </Grid>
          <Box>
            <div>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton loading={cargaEtapa} disabled={!selectedEtapa}>
                Crear
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
export default CreateAtention
