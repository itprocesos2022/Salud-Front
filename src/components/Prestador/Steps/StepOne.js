import { useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import { ArrowForward as NextIcon } from '@material-ui/icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { TextField, Button, SubmitButton, Select, RutTextField } from '../../UI'
import regiones from '../../../resources/regions.json'
import useStyles from './styles'

const validationSchema = Yup.object().shape({
  prestador_rut: Yup.string().required('Ingrese rut del prestador'),
  razon_social: Yup.string().required('Ingrese razón social del prestador'),
  address: Yup.string().required('Ingrese dirección del prestador'),
  comuna: Yup.string().required('Ingrese comuna del prestador'),
  region: Yup.string().required('Ingrese region del prestador')
})

const StepOne = ({ onClose, create, setCreate, setData, defaultValues }) => {
  const classes = useStyles()
  const [comuns, setComuns] = useState([])
  const handleNext = () => {
    setCreate({ ...create, step: create.step + 1 })
  }
  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      prestador_rut: defaultValues.prestador.prestador_rut || '',
      razon_social: defaultValues.prestador.razon_social || '',
      address: defaultValues.prestador.address || '',
      comuna: defaultValues.prestador.comuna || '',
      region: defaultValues.prestador.region || ''
    },
    onSubmit: (values) => {
      const body = { ...values }
      setData({ ...defaultValues, prestador: body })
      handleNext()
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
              name="razon_social"
              label="Razón Social"
              required
              value={formik.values.razon_social}
              onChange={formik.handleChange}
              error={
                formik.touched.razon_social &&
                Boolean(formik.errors.razon_social)
              }
              helperText={
                formik.touched.razon_social && formik.errors.razon_social
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Dirección Legal"
              required
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
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
                !formik.values.razon_social ||
                !formik.values.address ||
                !formik.values.region ||
                !formik.values.comuna
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

export default StepOne
