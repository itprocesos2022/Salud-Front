import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Box, Typography, Button, Grid, TextField } from '@material-ui/core'
import { Dialog } from '../Shared'
import { SubmitButton, Select } from '../UI'
import yearsActions from '../../state/actions/years'
import prestacionesActions from '../../state/actions/prestaciones'
import programasActions from '../../state/actions/programas'

const ProgramForm = ({ open, onClose, type, data, reFetch }) => {
  const dispatch = useDispatch()
  // const [filters, setFilters] = useState({
  //   page: 1,
  //   size: 10,
  //   search: ''
  // })
  const tiposDePrograma = ['Preventivo', 'Social']
  const [years, setYears] = useState([])
  const [prestacionesList, setPrestacionesList] = useState([])
  const [programData, setProgramData] = useState({})
  // const searchChange = (e) => {
  //   setFilters({ ...filters, search: e.target.value })
  // }

  const handleEdit = () => {
    programasActions.editPrograma(programData).then(() => {
      reFetch()
      onClose()
    })
    // dispatch(programasActions.editPrograma(programData))
    // onClose()
  }
  useEffect(() => {
    if (data) {
      setProgramData(data)
    }
  }, [data])
  useEffect(() => {
    dispatch(yearsActions.getYears()).then((yearsData) => {
      setYears(yearsData.years.rows)
    })
  }, [])
  useEffect(() => {
    prestacionesActions
      .getPrestacionesWithoutDispatch()
      .then((prestacionData) => {
        setPrestacionesList(
          prestacionData.prestaciones.rows.map((e) => e.nombre_prestacion)
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <Dialog open={open} onClose={onClose} maxWidth={'lg'}>
      <Box>
        <Typography variant="h5" align="center">
          {type === 'UPDATE' ? 'Editar' : 'Crear'} Programa
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre"
              name="name"
              value={programData.nombre}
              onChange={(e) =>
                setProgramData({ ...programData, nombre: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Tipo"
              defaultValue={programData.age}
              onChange={(e) =>
                setProgramData({ ...programData, tipo: e.target.value })
              }
            >
              {tiposDePrograma.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Select>
            {/* <TextField label="Tipo" name="type" value={programData.tipo} /> */}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Select
              label="Año"
              defaultValue={programData.age}
              onChange={(e) =>
                setProgramData({ ...programData, age: e.target.value })
              }
            >
              {years.map((e) => (
                <option value={e.year}>{e.year}</option>
              ))}
            </Select>
            {/* <TextField label="Año" name="year" value={programData.age} /> */}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Presupuesto"
              name="budget"
              value={programData.presupuesto}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Cupos"
              name="quotas"
              value={programData.cupos}
              onChange={(e) =>
                setProgramData({ ...programData, cupos: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Select
              onChange={(e) => {
                setProgramData({
                  ...programData,
                  prestacion: e.target.value
                })
              }}
              label="Prestación"
              defaultValue={programData.prestacion}
            >
              {prestacionesList && (
                <>
                  <option value="">Seleccione una opción.</option>
                  {prestacionesList.map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </>
              )}
            </Select>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign="center" marginTop="10px">
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <SubmitButton onClick={handleEdit}>
          {type === 'UPDATE' ? 'Actualizar' : 'Crear'}
        </SubmitButton>
      </Box>
    </Dialog>
  )
}

export default ProgramForm
