import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { Box, Grid } from '@material-ui/core'
import { Dialog } from '../Shared'
import { TextField, Button, SubmitButton, Select, RutTextField } from '../UI'
import prestadoresActions from '../../state/actions/prestadores'
import regiones from '../../resources/regions.json'
import useStyles from './Steps/styles'

const validationSchema = Yup.object().shape({
  prestador_rut: Yup.string().required('Ingrese rut del prestador'),
  direccion: Yup.string().required('Ingrese dirección del prestador'),
  comuna: Yup.string().required('Ingrese comuna del prestador'),
  region: Yup.string().required('Ingrese region del prestador'),
  nombre: Yup.string().required('Ingrese region del prestador')
})

const DialogPrestadores = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const submitFunction = (body) => {
    const creacionPrestador = {
      prestador_rut: body.prestador_rut,
      razon_social: body.razon_social,
      direccion: `${body.direccion}, ${body.comuna}, ${body.region}`,
      nombre: body.nombre
    }
    dispatch(prestadoresActions.createPrestador(creacionPrestador))
      .then((data) => {
        dispatch(prestadoresActions.updatePrestadores(true))
        onClose()
        enqueueSnackbar(data.message, { variant: 'success' })
      })
      .catch((ex) => ex)
  }

  // const { ref } = usePlacesWidget({
  //   apiKey: 'AIzaSyDu5MNkinB4TmnyRixzuu9SIbUeZY-dPGo',
  //   onPlaceSelected: (place) => {
  //     console.log(place)
  //   }
  // })

  const classes = useStyles()
  const [comuns, setComuns] = useState([])

  const [autocompleteValue, setAutocompleteValue] = useState(null)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      prestador_rut: '',
      direccion: 'ninguna',
      comuna: '',
      region: '',
      nombre: ''
    },
    onSubmit: (values) => {
      const body = {
        ...values,
        direccion: autocompleteValue.value.structured_formatting.main_text,
        razon_social: values.nombre
      }
      console.log(body)
      submitFunction(body)
    }
  })
  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regiones.regions.find((item) => item.number === value)
        setComuns(region?.communes || [])
        formik.setFieldValue('region', region.name || '')
        break
      }
      case 'comuna': {
        const commune = comuns.find((item) => item.name === value)
        formik.setFieldValue('comuna', commune.name || '')
        break
      }
      default:
        throw new Error('Error')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RutTextField
                name="prestador_rut"
                label="Rut Prestador"
                required
                value={formik.values.prestador_rut}
                onChange={formik.handleChange}
                error={
                  formik.touched.prestador_rut &&
                  Boolean(formik.errors.prestador_rut)
                }
                helperText={
                  formik.touched.prestador_rut && formik.errors.prestador_rut
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="nombre"
                label="Nombre del Prestador:"
                required
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                ref={ref}
                name="direccion"
                label="Dirección Legal"
                required
                value={formik.values.direccion}
                onChange={formik.handleChange}
                error={
                  formik.touched.direccion && Boolean(formik.errors.direccion)
                }
                helperText={formik.touched.direccion && formik.errors.direccion}
              /> */}
              <label>Dirección Legal: *</label>
              <GooglePlacesAutocomplete
                selectProps={{
                  value: autocompleteValue,
                  onChange: (e) => {
                    console.log(e)
                    setAutocompleteValue(e)
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Región"
                name="region"
                required
                onChange={handleSelectChange}
              >
                <option value={''} selected>
                  SELECCIONE UNA REGIÓN
                </option>
                {regiones.regions.map((item, index) => (
                  <option key={`region--${index}`} value={`${item.number}`}>
                    {`${item.romanNumber}.
                  ${item.name}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Comuna"
                name="comuna"
                required
                onChange={handleSelectChange}
              >
                <option value={''}>SELECCIONE UNA COMUNA</option>
                {comuns.map((item, index) => (
                  <option
                    key={`region--${index}
                `}
                    value={`${item.name}`}
                  >
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                disabled={
                  !formik.values.prestador_rut ||
                  !formik.values.region ||
                  !formik.values.comuna ||
                  !formik.values.nombre
                }
                loading={formik.isSubmitting}
                onClick={formik.handleSubmit}
              >
                Crear
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default DialogPrestadores
