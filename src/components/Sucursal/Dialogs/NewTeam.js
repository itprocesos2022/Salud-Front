import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { TextField, Button, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'
import teamsActions from '../../../state/actions/teams'
import sucursalesActions from '../../../state/actions/Sucursales'

const newPrestacion = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { idSucursal } = useParams()
  const { user } = useSelector((state) => state.auth)
  const [team, setTeam] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [cargaTeam, setCargaTeam] = useState(true)
  const [selectedTeam, setSelectedTeam] = useState([])
  const cargaEquipos = () => {
    dispatch(
      teamsActions.getTeams({
        page: 0,
        size: 10,
        id_prestador: user.id,
        search: ''
      })
    ).then(
      (data) =>
        data.equipos.rows ? setTeam(data.equipos.rows) : setTeam(data.equipos),
      setCargaTeam()
    )
  }

  const asignacionTeam = () => {
    setCargaTeam(true)
    const equipoAsignado = selectedTeam.map((eq) => ({
      id_equipo: eq.id
    }))
    dispatch(
      sucursalesActions.asignarEquipo(idSucursal, {
        equipo: equipoAsignado
      })
    ).then((data) => {
      if (data.message === 'Sucursal agregados al equipo correctamente.') {
        onClose()
        setCargaTeam(false)
        enqueueSnackbar('Equipo asignado correctamente', { variant: 'success' })
      } else {
        setCargaTeam(false)
        enqueueSnackbar('Algo salió mal, intentelo en unos minutos', {
          variant: 'error'
        })
      }
    })
  }
  useEffect(() => {
    if (open) cargaEquipos()
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">Asignar Equipo</Typography>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={team}
              value={selectedTeam}
              onChange={(_, option) => setSelectedTeam(option)}
              getOptionLabel={(option) => option.nombre}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Equipos"
                  placeholder="Seleccione el equipo"
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
                loading={cargaTeam}
                onClick={asignacionTeam}
                disabled={selectedTeam.length === 0}
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
