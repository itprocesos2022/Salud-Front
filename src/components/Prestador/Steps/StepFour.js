import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid } from '@material-ui/core'
import { ArrowBack as BackIcon } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import { TextField, Button, SubmitButton } from '../../UI'
import useStyles from './styles'
import prestacionesActions from '../../../state/actions/prestaciones'

const StepFour = ({ onClose, create, setCreate, submitFunction }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [cargaPrestacion, setCargaPrestacion] = useState(true)
  const [selectedPrestacion, setSelectedPrestacion] = useState([])
  const [prestacion, setPrestacion] = useState([])
  const handleBack = () => {
    setCreate({ ...create, step: create.step - 1 })
  }

  const prestaciones = () => {
    dispatch(prestacionesActions.getPrestaciones()).then((data) => {
      setPrestacion(data.prestaciones.rows)
      setCargaPrestacion(false)
    })
  }

  useEffect(() => {
    if (cargaPrestacion) prestaciones()
  }, [cargaPrestacion])

  const createPrestador = () => {
    submitFunction()
    onClose()
  }

  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
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
        </Grid>
        <Box>
          <div className={classes.actions}>
            <Button
              onClick={handleBack}
              variant="outlined"
              startIcon={<BackIcon />}
            >
              Volver
            </Button>

            <SubmitButton loading={cargaPrestacion} onClick={createPrestador}>
              Crear
            </SubmitButton>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default StepFour
