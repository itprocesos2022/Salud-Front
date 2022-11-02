import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Box, Typography, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { Button, Select, SubmitButton, TextField } from '../../UI'
import { Dialog } from '../../Shared'
import useStyles from './styles'
import regiones from '../../../resources/regions.json'
import sucursalActions from '../../../state/actions/Sucursales'

const validationSchema = Yup.object().shape({
  nombre_sucursal: Yup.string().required('Ingrese nombre de la sucursal'),
  direccion_sucursal: Yup.string().required(
    'Ingrese la direccion de la sucursal'
  ),
  region_sucursal: Yup.string().required('Ingrese region de la sucursal'),
  comuna_sucursal: Yup.string().required('Ingrese comuna de la sucursal'),
  tipo_sucursal: Yup.string().required('Ingrese tipo de la sucursal'),
  telefono_sucursal: Yup.string()
    .test('len', 'longitud de 9 digitos', (val) => val?.length === 9)
    .required('Ingrese teléfono de la sucursal'),
  email_sucursal: Yup.string().email().required('Ingrese email de la sucursal')
})

const NewSucursal = ({ open, onClose, type, data, setCargaSucursal }) => {
  const [autocompleteValue, setAutocompleteValue] = useState(null)
  const dispatch = useDispatch()
  const { idPrestador } = useParams()
  const classes = useStyles()
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      nombre_sucursal: type !== 'CREATE' ? data.nombre_sucursal : '',
      direccion_sucursal:
        type !== 'CREATE' ? data.direccion_sucursal : 'ninguna',
      region_sucursal: type !== 'CREATE' ? data.region_sucursal : '',
      comuna_sucursal: type !== 'CREATE' ? data.comuna_sucursal : '',
      tipo_sucursal: type !== 'CREATE' ? data.tipo_sucursal : 'tipo_sucursal',
      telefono_sucursal: type !== 'CREATE' ? data.telefono_sucursal : '',
      email_sucursal: type !== 'CREATE' ? data.email_sucursal : '',
      prestador_id:
        type !== 'CREATE'
          ? parseInt(data.prestador_id, 10)
          : parseInt(idPrestador, 10)
    }
  })
  const [loading, setLoading] = useState(false)
  const [comuns, setComuns] = useState([])
  const createNewSucursal = () => {
    if (formik.values.telefono_sucursal.length !== 9) {
      alert('El telefono debe tener 9 digitos')
      return
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formik.values.email_sucursal)) {
      alert('El email no es valido')
      return
    }
    setLoading(true)
    const sucursalBody = {
      ...formik.values,
      direccion_sucursal: autocompleteValue.label
    }
    dispatch(sucursalActions.createSucursal(sucursalBody)).then(() => {
      setLoading(false)
      setCargaSucursal(true)
      onClose()
    })
  }
  const editSucursal = () => {
    setLoading(true)
    dispatch(sucursalActions.editSucursal(data.id, formik.values)).then(() => {
      setLoading(false)
      setCargaSucursal(true)
      onClose()
    })
  }
  const number = (numero) => {
    formik.setFieldValue(
      'telefono_sucursal',
      numero.target.value.replace(/\D/g, '')
    )
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regiones.regions.find((item) => item.number === value)
        setComuns(region?.communes || [])
        formik.setFieldValue('region_sucursal', region.name || '')
        formik.setFieldValue('comuna_sucursal', '')
        break
      }
      case 'comuna': {
        const commune = comuns.find((item) => item.name === value)
        formik.setFieldValue('comuna_sucursal', commune.name || '')
        break
      }
      default:
        throw new Error('Error')
    }
  }
  useEffect(() => {
    if (type !== 'CREATE') {
      const { communes } = regiones.regions.find(
        (item) => item.name === formik.values.region_sucursal
      )
      setComuns(communes)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            {data ? 'Editar ' : 'Nueva '} Sucursal
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre de la Sucursal"
                name="nombre_sucursal"
                required
                value={formik.values.nombre_sucursal}
                onChange={formik.handleChange}
                error={
                  formik.touched.nombre_sucursal &&
                  Boolean(formik.errors.nombre_sucursal)
                }
                helperText={
                  formik.touched.nombre_sucursal &&
                  formik.errors.nombre_sucursal
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Región"
                name="region"
                required
                onChange={handleSelectChange}
                error={
                  formik.touched.region_sucursal &&
                  Boolean(formik.errors.region_sucursal)
                }
                helperText={
                  formik.touched.region_sucursal &&
                  formik.errors.region_sucursal
                }
              >
                <option value={''} selected>
                  SELECCIONE UNA REGIÓN
                </option>
                {regiones.regions.map((item, index) => (
                  <option
                    selected={
                      type !== 'CREATE'
                        ? item.name === formik.values.region_sucursal
                        : false
                    }
                    key={`region--${index}`}
                    value={`${item.number}`}
                  >
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
                error={
                  formik.touched.comuna_sucursal &&
                  Boolean(formik.errors.comuna_sucursal)
                }
                helperText={
                  formik.touched.comuna_sucursal &&
                  formik.errors.comuna_sucursal
                }
              >
                <option value={''}>SELECCIONE UNA COMUNA</option>
                {comuns.map((item, index) => (
                  <option
                    selected={
                      type !== 'CREATE'
                        ? item.name === formik.values.comuna_sucursal
                        : false
                    }
                    key={`region--${index}
                `}
                    value={`${item.name}`}
                  >
                    {item.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                label="Dirección Legal"
                name="direccion_sucursal"
                required
                value={formik.values.direccion_sucursal}
                onChange={formik.handleChange}
                error={
                  formik.touched.direccion_sucursal &&
                  Boolean(formik.errors.direccion_sucursal)
                }
                helperText={
                  formik.touched.direccion_sucursal &&
                  formik.errors.direccion_sucursal
                }
              /> */}
              <label>Dirección Legal: *</label>
              <GooglePlacesAutocomplete
                selectProps={{
                  value: autocompleteValue,
                  onChange: setAutocompleteValue
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono (+56)"
                name="telefono_sucursal"
                required
                value={formik.values.telefono_sucursal}
                maxLength={9}
                error={
                  formik.touched.telefono_sucursal &&
                  Boolean(formik.errors.telefono_sucursal)
                }
                helperText={
                  formik.touched.telefono_sucursal &&
                  formik.errors.telefono_sucursal
                }
                onChange={number}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email_sucursal"
                required
                value={formik.values.email_sucursal}
                type="email"
                onChange={formik.handleChange}
                error={
                  formik.touched.email_sucursal &&
                  Boolean(formik.errors.email_sucursal)
                }
                helperText={
                  formik.touched.email_sucursal && formik.errors.email_sucursal
                }
              />
            </Grid>
          </Grid>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cerrar
              </Button>
              <SubmitButton
                loading={loading}
                onClick={data ? editSucursal : createNewSucursal}
                disabled={Object.values(formik.values).includes('')}
              >
                {data ? 'Editar' : 'Crear'}
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default NewSucursal
