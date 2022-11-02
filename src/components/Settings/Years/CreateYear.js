import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Dialog, DatePicker } from '../../Shared'
import { Button, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import yearsActions from '../../../state/actions/years'

const validationSchema = Yup.object({
  year: Yup.string().required('Ingrese año'),
  desde: Yup.string().required('Ingrese desde cuando es vigente'),
  hasta: Yup.string().required('Ingrese hasta cuando es vigente')
})

const createMedida = ({ open, onClose, type, data, successFunction }) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { success } = useSuccess()
  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      year: type === 'UPDATE' ? data.year : '',
      desde: type === 'UPDATE' ? data.desde : '',
      hasta: type === 'UPDATE' ? data.hasta : ''
    },
    onSubmit: (values) => {
      const parsedValues = {
        year: values.year,
        desde: new Date(values.desde).toISOString().split('T')[0],
        hasta: new Date(values.hasta).toISOString().split('T')[0]
      }
      if (type === 'UPDATE') {
        dispatch(yearsActions.updateYear(data.id, parsedValues)).then(() => {
          onClose()
          successFunction()
          formik.setSubmitting(false)
        })
      } else {
        dispatch(yearsActions.createYear(parsedValues)).then(() => {
          onClose()
          successFunction()
          formik.setSubmitting(false)
        })
      }
    }
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <Box>
        <Typography
          align="center"
          variant="h6"
          style={{ marginBottom: '15px' }}
        >
          {`${type === 'UPDATE' ? 'Editar' : 'Nuevo'} año`}
        </Typography>
        <Grid container>
          {/* <Grid item xs={12}>
            <Autocomplete
              options={tipoMedida}
              onChange={(_, option) => handleTipoMedida(option)}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de Medida"
                  placeholder="Seleccione el tipo de Medida"
                />
              )}
              helperText={
                formik.touched.nombre_tipo_medida &&
                formik.errors.nombre_tipo_medida
              }
              error={
                formik.touched.nombre_tipo_medida &&
                Boolean(formik.errors.nombre_tipo_medida)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={tipoDato}
              //  value={selectedEtapa}
              onChange={(_, option) => handleTipoDato(option)}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de Dato"
                  placeholder="Seleccione el tipo de Dato"
                />
              )}
              helperText={
                formik.touched.nombre_tipo_dato &&
                formik.errors.nombre_tipo_dato
              }
              error={
                formik.touched.nombre_tipo_dato &&
                Boolean(formik.errors.nombre_tipo_dato)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={unidadMedida}
              //  value={selectedEtapa}
              onChange={(_, option) => handleUnidadMedida(option)}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Unidad de Medida"
                  placeholder="Seleccione la Unidad de Medida"
                />
              )}
              helperText={
                formik.touched.nombre_unidad_medida &&
                formik.errors.nombre_unidad_medida
              }
              error={
                formik.touched.nombre_unidad_medida &&
                Boolean(formik.errors.nombre_unidad_medida)
              }
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              label="Año"
              name="year"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.year}
              helperText={formik.touched.year && formik.errors.year}
              error={formik.touched.year && Boolean(formik.errors.year)}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              disabledFuture={false}
              value={formik.values.desde}
              label={'Vigencia desde'}
              onChange={(date) => {
                const parsedDate = new Date(date).toISOString()
                formik.setFieldValue('desde', parsedDate)
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              disabledFuture={false}
              value={formik.values.hasta}
              label={'Vigencia hasta'}
              onChange={(date) => {
                const parsedDate = new Date(date).toISOString()
                formik.setFieldValue('hasta', parsedDate)
              }}
            />
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop="15px">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
            disabled={!formik.isValid || formik.isSubmitting}
            success={success}
          >
            {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} año`}
          </SubmitButton>
        </Box>
      </Box>
    </Dialog>
  )
}

createMedida.propTypes = {
  type: 'CREATE'
}

export default createMedida
