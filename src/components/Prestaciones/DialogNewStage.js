import { Box, Typography, Grid } from '@material-ui/core'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { Dialog } from '../Shared'
import { useSuccess } from '../../hooks'
import { TextField, Button, SubmitButton } from '../UI'
import useStyles from './Steps/styles'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese nombre de la etapa'),
  order: Yup.string().required('Ingrese orden de la etapa'),
  description: Yup.string().required('Ingrese descripción de la etapa')
})

const DialogPrestacion = ({
  open,
  onClose,
  submitFunction,
  successMessage,
  type,
  data
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      name: type !== 'ADD' ? data.name : '',
      order: type !== 'ADD' ? data.order : '',
      description: type !== 'ADD' ? data.description : ''
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
        <Box>
          <Typography align="center">
            {type !== 'ADD' ? 'Editar ' : 'Crear '}etapa
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Nombre de la Etapa"
                required
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="order"
                label="Orden de la Etapa"
                required
                value={formik.values.order}
                onChange={formik.handleChange}
                error={formik.touched.order && Boolean(formik.errors.order)}
                helperText={formik.touched.order && formik.errors.order}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Descripción de la Etapa"
                required
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
          </Grid>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton onClick={formik.handleSubmit} success={success}>
                Guardar
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default DialogPrestacion
