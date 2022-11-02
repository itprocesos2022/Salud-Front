import { Box, Typography, Grid } from '@material-ui/core'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { Dialog } from '../Shared'
import { TextField, Button, SubmitButton } from '../UI'
import { useSuccess } from '../../hooks'
import useStyles from './Steps/styles'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese nombre de la prestación')
})

const DialogClone = ({
  open,
  onClose,
  data,
  submitFunction,
  successMessage
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      name: '',
      tope_prestacion: data.tope_prestacion,
      description: data.descripcion_prestacion,
      type: data.tipo_prestacion
    },
    onSubmit: (values, { resetForm }) => {
      const body = { ...values }
      submitFunction(body)
        .then(() => {
          formik.setSubmitting(false)
          resetForm()
          enqueueSnackbar(successMessage, { variant: 'success' })
          changeSuccess(true)
          onClose()
        })
        .catch((error) => {
          formik.setSubmitting(false)
          enqueueSnackbar(error, { variant: 'error' })
        })
    }
  })

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Typography align="center">
          ¿Que nombre desea asignarle a esta prestación?
        </Typography>
        <Grid className={classes.grid} item xs={12}>
          <TextField
            name="name"
            label="Nuevo Nombre Prestación"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Box>
          <div className={classes.actions}>
            <Button onClick={onClose} variant="outlined">
              Cerrar
            </Button>
            <SubmitButton
              disabled={!formik.isValid || formik.isSubmitting}
              loading={formik.isSubmitting}
              onClick={formik.handleSubmit}
              success={success}
            >
              Clonar
            </SubmitButton>
          </div>
        </Box>
      </Box>
    </Dialog>
  )
}

export default DialogClone
