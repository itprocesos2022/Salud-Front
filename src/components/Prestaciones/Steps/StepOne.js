import { useState } from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { TextField, Button, Select, SubmitButton, TextArea } from '../../UI'
import { useSuccess } from '../../../hooks'
import useStyles from './styles'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese nombre de la prestación'),
  tope_prestacion: Yup.string().required('Ingrese un tope de prestación'),
  description: Yup.string().required('Ingrese una descripción'),
  type: Yup.string().required('Ingrese un tipo de prestación')
})

const StepOne = ({ onClose, data, submitFunction, type, successMessage }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const { success, changeSuccess } = useSuccess()
  const [readOnly] = useState(type === 'VIEW')

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    initialValues: {
      name: type !== 'ADD' ? data.name : '',
      tope_prestacion: type !== 'ADD' ? data.tope_prestacion : '0',
      description: type !== 'ADD' ? data.description : '',
      type: type !== 'ADD' ? data.type : 'DERIVACIÓN'
    },
    onSubmit: (values, { resetForm }) => {
      const body = {
        ...values,
        tope_prestacion: 0
      }
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
    <Box>
      <Box>
        <Box mb={2}>
          <Typography align="center">Crear Prestación</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Nombre de la Prestación"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              inputProps={{ readOnly }}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              name="tope_prestacion"
              label="Tope de la Prestación"
              required
              value={formik.values.tope_prestacion}
              onChange={formik.handleChange}
              error={
                formik.touched.tope_prestacion &&
                Boolean(formik.errors.tope_prestacion)
              }
              helperText={
                formik.touched.tope_prestacion && formik.errors.tope_prestacion
              }
              inputProps={{ readOnly }}
            />
          </Grid> */}
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
              inputProps={{ readOnly }}
            >
              <option value="DERIVACIÓN">DERIVACIÓN</option>
              <option value="TERRENO">TERRENO</option>
              <option value="DERIVACIÓN Y TERRENO">DERIVACIÓN Y TERRENO</option>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextArea
              name="description"
              label="Descripción de la Prestación"
              required
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              inputProps={{ readOnly }}
              rowsMin={8}
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
              Crear
            </SubmitButton>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default StepOne
