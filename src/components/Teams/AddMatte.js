import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { Autocomplete } from '@material-ui/lab'
import { Box, Typography, Grid } from '@material-ui/core'
import { Dialog } from '../Shared'
import { RutTextField, Select, TextField, SubmitButton, Button } from '../UI'
import { rutValidation } from '../../validations'
import teamsActions from '../../state/actions/teams'
import { useSuccess } from '../../hooks'

const validationSchema = Yup.object({
  run: Yup.string()
    .required('Ingrese run')
    .test('validRUN', 'Ingrese run válido', (v) => rutValidation(v)),
  names: Yup.string().required('Ingrese Nombres'),
  paternal_surname: Yup.string().required('Ingrese apellido paterno'),
  maternal_surname: Yup.string()
})

const notify = (message) => toast.error(message)
const AddMatte = ({ open, onClose, type, data, id, setFetchMate }) => {
  const dispatch = useDispatch()
  const { success, changeSuccess } = useSuccess()
  const { isMobile } = useSelector((state) => state.ui)
  const [values, setValues] = useState([])
  const prestaciones = useSelector((state) => state.prestaciones.list.rows)

  const formik = useFormik({
    validateOnMount: true,
    validationSchema,
    validateOnBlur: true,
    initialValues: {
      names: type === 'UPDATE' ? data.name : '',
      paternal_surname: type === 'UPDATE' ? data.paternal_surname : '',
      maternal_surname: type === 'UPDATE' ? data.maternal_surname : '',
      rut: type === 'UPDATE' ? data.run : '',
      prestacion: type === 'UPDATE' ? data.prestacion : ''
    },
    onSubmit: (value) => {
      const submitData = {
        integrantes: {
          nombres: value.names,
          rut: value.run,
          apellidos: `${value.paternal_surname} ${value.maternal_surname}`,
          prestaciones: values.map((item) => ({
            id_prestacion: item.id
          }))
        }
      }
      dispatch(teamsActions.createTeamMate(id, submitData))
        .then(() => {
          formik.setSubmitting(false)
          setTimeout(() => {
            changeSuccess(true)
          }, 1000)
          onClose()
          setFetchMate(true)
        })
        .catch((err) => {
          formik.setSubmitting(false)
          notify(err)
          changeSuccess(false)
        })
    }
  })
  return (
    <Dialog open={open} onClose={onClose} fullWidth fullScreen={isMobile}>
      <Box>
        <Box mb={2} display="flex" justifyContent="center">
          <Typography
            style={{
              fontSize: '20px',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}
          >
            Añadir Integrante
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Select
              label="Tipo de profesional"
              placeHolder="SELECCIONE TIPO"
              name="type_id"
              required
              value={formik.values.type_id}
              onChange={formik.handleChange}
              error={formik.touched.type_id && Boolean(formik.errors.type_id)}
              helperText={formik.touched.type_id && formik.errors.type_id}
            >
              <option value="EXISTENTE">EXISTENTE</option>
              <option value="NUEVO">NUEVO</option>
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              label="Profesional"
              name="profesional"
              disabled={formik.values.type_id === 'NUEVO'}
              value={formik.values.profesional}
              onChange={formik.handleChange}
              error={
                formik.touched.profesional && Boolean(formik.errors.profesional)
              }
              helperText={
                formik.touched.profesional && formik.errors.profesional
              }
            >
              <option value="">SELECCIONE PROFESIONAL</option>
            </Select>
          </Grid>
          <Grid item xs={6}>
            {formik.values.type_id === 'NUEVO' && (
              <TextField
                label="Nombres"
                required
                name="names"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.names}
                helperText={formik.touched.nombre && formik.errors.names}
                error={formik.touched.names && Boolean(formik.errors.names)}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {formik.values.type_id === 'NUEVO' && (
              <RutTextField
                label="Run"
                required
                name="run"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.run}
                helperText={formik.touched.run && formik.errors.run}
                error={formik.touched.run && Boolean(formik.errors.run)}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {formik.values.type_id === 'NUEVO' && (
              <TextField
                label="Apellido Paterno"
                required
                name="paternal_surname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.paternal_surname}
                helperText={
                  formik.touched.paternal_surname &&
                  formik.errors.paternal_surname
                }
                error={
                  formik.touched.paternal_surname &&
                  Boolean(formik.errors.paternal_surname)
                }
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {formik.values.type_id === 'NUEVO' && (
              <TextField
                label="Apellido Materno"
                required
                name="maternal_surname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.maternal_surname}
                helperText={
                  formik.touched.maternal_surname &&
                  formik.errors.maternal_surname
                }
                error={
                  formik.touched.maternal_surname &&
                  Boolean(formik.errors.maternal_surname)
                }
              />
            )}
          </Grid>
          <Grid item xs={12} md={12}>
            <Autocomplete
              multiple
              value={values}
              options={prestaciones}
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
        </Grid>
        <Box display="flex" justifyContent="center" mt="50px" mb="20px">
          <Button onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <SubmitButton
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
            disabled={!formik.isValid || formik.isSubmitting}
            success={success}
          >
            Crear Profesional
          </SubmitButton>
        </Box>
      </Box>
      <Toaster />
    </Dialog>
  )
}

export default AddMatte
