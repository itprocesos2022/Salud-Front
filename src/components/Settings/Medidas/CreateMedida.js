import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Dialog } from '../../Shared'
import { Button, SubmitButton, TextField } from '../../UI'
import { useSuccess } from '../../../hooks'
import medidasActions from '../../../state/actions/medidas'

const validationSchema = Yup.object({
  nombre_tipo_dato: Yup.string().required('Ingrese tipo de dato'),
  nombre_tipo_medida: Yup.string().required('Ingrese tipo de medida'),
  nombre_unidad_medida: Yup.string().required('Ingrese unidad de la medida')
})

const createMedida = ({
  open,
  onClose,
  type,
  data,
  submitFunction,
  successFunction
}) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const [tipoMedida, setTipoMedida] = useState([])
  const [tipoDato, setTipoDato] = useState([])
  const [unidadMedida, setUnidadMedida] = useState([])
  const { success, changeSuccess } = useSuccess()
  const formik = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      id_tipo_medida: type === 'UPDATE' ? data.id_tipo_medida : '',
      id_tipo_dato: type === 'UPDATE' ? data.id_tipo_dato : '',
      id_unidad_medida: type === 'UPDATE' ? data.id_unidad_medida : '',
      valor_minimo: type === 'UPDATE' ? data.valor_minimo : '',
      valor_maximo: type === 'UPDATE' ? data.valor_maximo : '',
      nombre_tipo_medida: type === 'UPDATE' ? data.nombre_tipo_medida : '',
      nombre_tipo_dato: type === 'UPDATE' ? data.nombre_tipo_dato : '',
      nombre_unidad_medida: type === 'UPDATE' ? data.nombre_unidad_medida : ''
    },
    onSubmit: (values) => {
      submitFunction(values)
        .then(() => {
          formik.setSubmitting(false)
          changeSuccess(false)
          if (successFunction) {
            successFunction()
          }
          onClose()
        })
        .catch(() => {
          changeSuccess(false)
          formik.setSubmitting(false)
        })
    }
  })

  const FetchMedidaType = () => {
    dispatch(medidasActions.getTipoMedida()).then((elementos) => {
      setTipoMedida(elementos.tipo_medidas)
    })
    dispatch(medidasActions.getTipoDato()).then((dato) => {
      setTipoDato(dato.tipo_datos)
    })
    dispatch(medidasActions.getUnidadMedida()).then((unidad) => {
      setUnidadMedida(unidad.unidad_medida)
    })
  }

  useEffect(() => {
    FetchMedidaType()
  }, [])

  const handleUnidadMedida = (value) => {
    if (value) {
      formik.setFieldValue('id_unidad_medida', value.id)
      formik.setFieldValue('nombre_unidad_medida', value.name)
    }
    if (!value) {
      formik.setFieldValue('id_unidad_medida', '')
      formik.setFieldValue('nombre_unidad_medida', '')
    }
  }

  const handleTipoMedida = (value) => {
    if (value) {
      formik.setFieldValue('id_tipo_medida', value.id)
      formik.setFieldValue('nombre_tipo_medida', value.name)
    }
    if (!value) {
      formik.setFieldValue('id_tipo_medida', '')
      formik.setFieldValue('nombre_tipo_medida', '')
    }
  }

  const handleTipoDato = (value) => {
    if (value) {
      formik.setFieldValue('id_tipo_dato', value.id)
      formik.setFieldValue('nombre_tipo_dato', value.name)
    }
    if (!value) {
      formik.setFieldValue('id_tipo_dato', '')
      formik.setFieldValue('nombre_tipo_dato', '')
    }
  }

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
          {`${type === 'UPDATE' ? 'Editar' : 'Nueva'} medida`}
        </Typography>
        <Grid container>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Valor mínimo"
              name="valor_minimo"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.valor_minimo}
              helperText={
                formik.touched.valor_minimo && formik.errors.valor_minimo
              }
              error={
                formik.touched.valor_minomo &&
                Boolean(formik.errors.valor_minimo)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Valor máximo"
              name="valor_maximo"
              onChange={formik.handleChange}
              onBlur={formik.handleChange}
              value={formik.values.valor_maximo}
              helperText={
                formik.touched.valor_maximo && formik.errors.valor_maximo
              }
              error={
                formik.touched.valor_maximo &&
                Boolean(formik.errors.valor_maximo)
              }
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
            {`${type === 'UPDATE' ? 'Actualizar' : 'Crear'} medida`}
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
