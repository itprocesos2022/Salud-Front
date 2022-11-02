import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { Autocomplete } from '@material-ui/lab'
import regionJSON from '../../resources/regions.json'
import { Dialog } from '../Shared'
import { TextField, Select, SubmitButton, Button } from '../UI'
import { useSuccess } from '../../hooks'

const notify = (message) => toast.error(message)

const validationSchema = Yup.object({
  nombre: Yup.string().required('Ingrese nombre'),
  region: Yup.string().required('Selecione región'),
  comuna: Yup.string().required('Seleccione comuna'),
  sucursal: Yup.string().optional('Ingrese sucursal')
})

const TeamsAdd = ({
  open,
  onClose,
  type,
  data,
  prestacion,
  id_prestador,
  submitFunction,
  sucursales
}) => {
  const [comuna, setComuna] = useState([])
  const { isMobile } = useSelector((state) => state.ui)
  const [values, setValues] = useState([])
  const { success, changeSuccess } = useSuccess()
  const { user } = useSelector((state) => state.auth)
  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    validationSchema,
    initialValues: {
      nombre: type === 'UPDATE' ? data?.nombre : '',
      region: type === 'UPDATE' ? data?.region : '',
      comuna: type === 'UPDATE' ? data?.comuna : '',
      sucursal: type === 'UPDATE' ? data?.sucursal : '',
      id_prestador: user.id
    },
    onSubmit: (value) => {
      const submitData = {
        nombre: value.nombre,
        region: value.region,
        comuna: value.comuna,
        sucursal: value.sucursal,
        id_prestador,
        prestaciones: values.map((item) => ({
          id_prestacion: item.id
        }))
      }
      submitFunction(submitData)
        .then(() => {
          formik.setSubmitting(false)
          setTimeout(() => {
            changeSuccess(true)
          }, 1000)
          onClose()
        })
        .catch((err) => {
          formik.setSubmitting(false)
          changeSuccess(false)
          notify(err)
        })
    }
  })
  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regionJSON.regions.find((item) => item.number === value)
        setComuna(region?.communes || [])
        formik.setFieldValue('region', region.name || '')
        break
      }
      case 'comuna': {
        const commune = comuna.find((item) => item.name === value)
        formik.setFieldValue('comuna', commune.name || '')
        break
      }
      default:
        throw new Error('Error')
    }
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Box display="flex" justifyContent="center">
          <Typography
            align="center"
            style={{
              fontSize: '20px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}
          >
            {`${type === 'UPDATE' ? 'Editar' : 'Crear'} Equipo`}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              label="Nombre del Equipo"
              required
              name="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
              helperText={formik.touched.nombre && formik.errors.nombre}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Autocomplete
              multiple
              options={prestacion}
              value={values}
              onChange={(__, newValue) => {
                setValues([...newValue])
              }}
              getOptionLabel={(option) => option.nombre_prestacion}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Prestaciones"
                  required
                  placeholder="Prestación"
                  error={
                    formik.touched.prestacion &&
                    Boolean(formik.errors.prestacion)
                  }
                  helperText={
                    formik.touched.prestacion && formik.errors.prestacion
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Región"
              name="region"
              required
              onChange={handleSelectChange}
              helperText={formik.touched.region && formik.errors.region}
              error={formik.touched.region && Boolean(formik.errors.region)}
            >
              <option value={'INVALID'}>SELECCIONE UNA REGIÓN</option>
              {regionJSON.regions.map((item, index) => (
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
              helperText={formik.touched.comuna && formik.errors.comuna}
              error={formik.touched.comuna && Boolean(formik.errors.comuna)}
            >
              <option value={`INVALID`}>SELECCIONE UNA COMUNA</option>
              {comuna.map((item, index) => (
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
          <Grid item xs={12} md={12}>
            <Select
              label="Seleccione sucursal"
              name="sucursal"
              value={formik.values.sucursal}
              onChange={formik.handleChange}
            >
              <option value={`INVALID`}>SELECCIONE UNA SUCURSAL</option>
              {sucursales?.map((item, index) => (
                <option key={`${index}`} value={`${item.nombre_sucursal}`}>
                  {item.nombre_sucursal}
                </option>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Box display="flex" justifycontent="center" mt="50px" mb="20px">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
            disabled={!formik.isValid || formik.isSubmitting}
            success={success}
          >
            {`${type === 'UPDATE' ? 'Editar' : 'Crear'} Equipo`}
          </SubmitButton>
        </Box>
      </Box>
      <Toaster />
    </Dialog>
  )
}

export default TeamsAdd
