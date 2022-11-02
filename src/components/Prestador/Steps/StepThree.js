import { useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import {
  ArrowForward as NextIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { TextField, Button, Select, SubmitButton } from '../../UI'
import useStyles from './styles'
import regiones from '../../../resources/regions.json'

const validationSchema = Yup.object().shape({
  nombre_sucursal: Yup.string().required('Ingrese nombre de sucursal'),
  direccion_sucursal: Yup.string().required('Ingrese dirección de sucursal'),
  tipo_sucursal: Yup.string().required('Seleccione tipo de sucursal'),
  region_sucursal: Yup.string().required('Ingrese región de sucursal'),
  comuna_sucursal: Yup.string().required('Ingrese comuna de sucursal'),
  telefono_sucursal: Yup.string().required(
    'Ingrese número de contacto de sucursal'
  )
})

const StepThree = ({ create, setCreate, setData, defaultValues }) => {
  const classes = useStyles()
  const [comuns, setComuns] = useState([])
  const handleNext = () => {
    setCreate({ ...create, step: create.step + 1 })
  }
  const handleBack = () => {
    setCreate({ ...create, step: create.step - 1 })
  }

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      nombre_sucursal: defaultValues.sucursal.nombre_sucursal || '',
      direccion_sucursal: defaultValues.sucursal.direccion_sucursal || '',
      tipo_sucursal: defaultValues.sucursal.tipo_sucursal || '',
      region_sucursal: defaultValues.sucursal.region_sucursal || '',
      comuna_sucursal: defaultValues.sucursal.comuna_sucursal || '',
      telefono_sucursal: defaultValues.sucursal.telefono_sucursal || ''
    },
    onSubmit: (values) => {
      const body = { ...values }
      setData({ ...defaultValues, sucursal: body })
      handleNext()
    }
  })

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region_sucursal': {
        const region = regiones.regions.find((item) => item.number === value)
        setComuns(region?.communes || [])
        formik.setFieldValue('region_sucursal', region.name || '')
        break
      }
      case 'comuna_sucursal': {
        const commune = comuns.find((item) => item.name === value)
        formik.setFieldValue('comuna_sucursal', commune.name || '')
        break
      }
      default:
        throw new Error('Error')
    }
  }

  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="nombre_sucursal"
              label="Nombre de la Sucursal"
              required
              value={formik.values.nombre_sucursal}
              onChange={formik.handleChange}
              error={
                formik.touched.nombre_sucursal &&
                Boolean(formik.errors.nombre_sucursal)
              }
              helperText={
                formik.touched.nombre_sucursal && formik.errors.nombre_sucursal
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="direccion_sucursal"
              label="Dirección Legal"
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
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              name="tipo_sucursal"
              label="Tipo de Sucursal"
              required
              value={formik.values.tipo_sucursal}
              onChange={formik.handleChange}
              error={
                formik.touched.tipo_sucursal &&
                Boolean(formik.errors.tipo_sucursal)
              }
              helperText={
                formik.touched.tipo_sucursal && formik.errors.tipo_sucursal
              }
            >
              <option value="SIN TIPO">SIN TIPO</option>
              <option value="SUCURSAL">SUCURSAL</option>
              <option value="CASA MATRIZ">CASA MATRIZ</option>
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Región"
              name="region_sucursal"
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
              name="comuna_sucursal"
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
          <Grid item xs={12}>
            <TextField
              name="telefono_sucursal"
              label="Teléfono"
              required
              value={formik.values.telefono_sucursal}
              onChange={formik.handleChange}
              error={
                formik.touched.telefono_sucursal &&
                Boolean(formik.errors.telefono_sucursal)
              }
              helperText={
                formik.touched.telefono_sucursal &&
                formik.errors.telefono_sucursal
              }
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
            <SubmitButton
              disabled={
                !formik.values.nombre_sucursal ||
                !formik.values.direccion_sucursal ||
                !formik.values.tipo_sucursal ||
                !formik.values.region_sucursal ||
                !formik.values.comuna_sucursal ||
                !formik.values.telefono_sucursal
              }
              loading={formik.isSubmitting}
              onClick={formik.handleSubmit}
              endIcon={<NextIcon />}
            >
              Siguiente
            </SubmitButton>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default StepThree
