import { Box, Typography, Grid } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import programasActions from '../../state/actions/programas'
import prestacionesActions from '../../state/actions/prestaciones'
import yearsActions from '../../state/actions/years'
import { Dialog } from '../Shared'
import { TextField, Button, Select } from '../UI'

const CreateProgram = ({ open, onClose }) => {
  const [prestacionesList, setPrestacionesList] = useState([])
  const [newProgramData, setNewProgramData] = useState({})
  const [years, setYears] = useState([])

  const dispatch = useDispatch()

  const tiposDePrograma = ['Preventivo', 'Social']

  const buttonIsDisabled = () =>
    !newProgramData.nombre ||
    !newProgramData.tipo ||
    !newProgramData.age ||
    !newProgramData.prestacion ||
    !newProgramData.presupuesto ||
    !newProgramData.cupos ||
    newProgramData.age.length !== 4

  const handleNewProgram = () => {
    if (!/^\d+$/.test(newProgramData.age)) {
      alert('El año de vigencia debe ser un número')
      return
    }
    if (!/^\d+$/.test(newProgramData.cupos)) {
      alert('Los cupos deben ser un número')
      return
    }
    if (!/^\d+$/.test(newProgramData.presupuesto)) {
      alert('El presupuesto debe ser un número')
      return
    }

    dispatch(programasActions.createPrograma(newProgramData))
    onClose()
  }
  useEffect(() => {
    prestacionesActions
      .getPrestacionesWithoutDispatch()
      .then((data) => {
        setPrestacionesList(
          data.prestaciones.rows.map((e) => e.nombre_prestacion)
        )
        setNewProgramData({
          ...newProgramData,
          prestacion: prestacionesList[0]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    dispatch(yearsActions.getYears()).then((data) => {
      setYears(data.years.rows)
    })
  }, [])
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Box mb={4}>
            <Typography align="center">Crear Programa</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                onChange={(e) => {
                  setNewProgramData({
                    ...newProgramData,
                    nombre: e.target.value
                  })
                }}
                label="Nombre del Programa"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                onChange={(e) => {
                  setNewProgramData({ ...newProgramData, tipo: e.target.value })
                }}
                label="Tipo de programa"
              >
                <option value="">Seleccione una opción.</option>

                {tiposDePrograma.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <TextField
                maxLength={4}
                type="tel"
                onChange={(e) => {
                  setNewProgramData({ ...newProgramData, age: e.target.value })
                }}
                label="Año del Programa"
              /> */}
              <Select label="Año del programa">
                <option value="">Seleccione una opción.</option>
                {years.map((e) => (
                  <option value={e.year}>{e.year}</option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="tel"
                onChange={(e) => {
                  setNewProgramData({
                    ...newProgramData,
                    presupuesto: e.target.value
                  })
                }}
                label="Presupuesto"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type="tel"
                onChange={(e) => {
                  setNewProgramData({
                    ...newProgramData,
                    cupos: e.target.value
                  })
                }}
                label="Cupos"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                onChange={(e) => {
                  setNewProgramData({
                    ...newProgramData,
                    prestacion: e.target.value
                  })
                }}
                label="Prestación"
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
          <Box display="flex" justifyContent="center">
            <Button onClick={onClose} variant="outlined">
              Cancelar
            </Button>
            <Button disabled={buttonIsDisabled()} onClick={handleNewProgram}>
              Crear
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default CreateProgram
