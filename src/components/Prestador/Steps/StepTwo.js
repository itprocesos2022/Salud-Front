import { Box, Grid } from '@material-ui/core'
import {
  ArrowForward as NextIcon,
  ArrowBack as BackIcon
} from '@material-ui/icons'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { TextField, Button, SubmitButton } from '../../UI'
import useStyles from './styles'

const validationSchema = Yup.object().shape({
  nombre_prestador: Yup.string().required('Ingrese nombre de contacto'),
  telefono: Yup.string().required('Ingrese teléfono de contacto'),
  email: Yup.string().required('Ingrese correo electrónico de contacto')
})

const StepTwo = ({ create, setCreate, setData, defaultValues }) => {
  const classes = useStyles()
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
      nombre_prestador: defaultValues.contacto.nombre_prestador || '',
      telefono: defaultValues.contacto.telefono || '',
      email: defaultValues.contacto.email || ''
    },
    onSubmit: (values) => {
      const body = { ...values }
      setData({ ...defaultValues, contacto: body })
      handleNext()
    }
  })

  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="nombre_prestador"
              label="Nombre de Contacto:"
              required
              value={formik.values.nombre_prestador}
              onChange={formik.handleChange}
              error={
                formik.touched.nombre_prestador &&
                Boolean(formik.errors.nombre_prestador)
              }
              helperText={
                formik.touched.nombre_prestador &&
                formik.errors.nombre_prestador
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="telefono"
              label="Teléfono de Contacto:"
              required
              value={formik.values.telefono}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email de Contacto:"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              disabled={!formik.isValid || formik.isSubmitting}
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

export default StepTwo
