import { Box, Typography, Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { TextArea, Button, SubmitButton, TextField, Select } from '../../UI'
import { Dialog } from '../../Shared'
import { useSuccess } from '../../../hooks'
import useStyles from '../Steps/styles'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese nombre de la prestacion'),
  description: Yup.string().required('Ingrese la descripcion de la Prestacion'),
  type: Yup.string().required('Ingrese el tipo de Prestacion')
})

const EditDescription = ({
  open,
  onClose,
  data,
  updateDescription,
  successMessage,
  prestacion
}) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      description: data,
      name: prestacion.nombre_prestacion,
      type: prestacion.type
    },
    onSubmit: (values, { resetForm }) => {
      const body = { ...values }
      updateDescription(body)
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
          <Typography align="center">Editar Descripción</Typography>
          <Grid item xs={12}>
            <TextField
              label="Nombre de la Prestación"
              name="name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              name="type"
              label="Tipo de prestación"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
              helperText={formik.touched.type && formik.errors.type}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <option value="DERIVACIÓN">DERIVACIÓN</option>
              <option value="TERRENO">TERRENO</option>
              <option value="DERIVACIÓN Y TERRENO">DERIVACIÓN Y TERRENO</option>
            </Select>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextArea
                label="Descripción"
                name="description"
                required
                value={formik.values.descripcion_prestacion}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton
                disabled={!formik.isValid || formik.isSubmitting}
                loading={formik.isSubmitting}
                onClick={formik.handleSubmit}
                success={success}
              >
                Editar
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default EditDescription
