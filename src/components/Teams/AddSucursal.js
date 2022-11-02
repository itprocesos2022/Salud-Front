import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Select, SubmitButton, TextField } from '../UI'
import { Dialog } from '../Shared'
import useStyles from '../Prestador/Dialogs/styles'
import regiones from '../../resources/regions.json'
import sucursalActions from '../../state/actions/Sucursales'
import prestadoresActions from '../../state/actions/prestadores'
import { phoneValidator } from '../../validations'

const validationSchema = Yup.object({
  nombre_sucursal: Yup.string().required('Ingrese nombre'),
  email_sucursal: Yup.string().email('Ingrese correo válido'),
  telefono_sucursal: Yup.string('Ingrese teléfono').test(
    'Check phone',
    'Ingrese teléfono válido',
    (v) => phoneValidator(v)
  )
})

const NewSucursal = ({ open, onClose, type, data, setCargaSucursal }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const formik = useFormik({
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema,
    initialValues: {
      nombre_sucursal: type !== 'Create' ? data.nombre_sucursal : '',
      direccion_sucursal: type !== 'Create' ? data.direccion_sucursal : '',
      region_sucursal: type !== 'Create' ? data.region_sucursal : '',
      comuna_sucursal: type !== 'Create' ? data.comuna_sucursal : '',
      tipo_sucursal: type !== 'Create' ? data.tipo_sucursal : 'tipo_sucursal',
      telefono_sucursal: type !== 'Create' ? data.telefono_sucursal : '',
      email_sucursal: type !== 'Create' ? data.email_sucursal : '',
      prestador_id: type !== 'Create' ? parseInt(data.prestador_id, 10) : ''
    }
  })
  const [loading, setLoading] = useState(false)
  const [comuns, setComuns] = useState([])
  const [prestadores, setPrestadores] = useState([])

  const createNewSucursal = () => {
    setLoading(true)
    dispatch(sucursalActions.createSucursal(formik.values)).then(() => {
      setLoading(false)
      setCargaSucursal(true)
      onClose()
    })
  }

  const editSucursal = () => {
    setLoading(true)
    dispatch(sucursalActions.editSucursal(data.id, formik.values)).then(() => {
      setLoading(false)
      setCargaSucursal(true)
      onClose()
    })
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regiones.regions.find((item) => item.number === value)
        setComuns(region?.communes || [])
        formik.setFieldValue('region_sucursal', region.name || '')
        break
      }
      case 'comuna': {
        const commune = comuns.find((item) => item.name === value)
        formik.setFieldValue('comuna_sucursal', commune.name || '')
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    dispatch(prestadoresActions.getPrestadores()).then((res) =>
      setPrestadores(res.prestadores.rows)
    )
  }, [open])
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            {data ? 'Editar ' : 'Nueva '} Sucursal
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                label="Prestador"
                name="prestador_id"
                required
                onChange={formik.handleChange}
              >
                <option value={''} selected>
                  SELECCIONE UN PRESTADOR
                </option>
                {prestadores.map((item, index) => (
                  <option key={`prestador--${index}`} value={`${item.id}`}>
                    {`${item.razon_social}`}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre de la Sucursal"
                name="nombre_sucursal"
                value={formik.values.nombre_sucursal}
                onChange={formik.handleChange}
                required
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
            <Grid item xs={12}>
              <TextField
                label="Dirección Legal"
                name="direccion_sucursal"
                value={formik.values.direccion_sucursal}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono"
                name="telefono_sucursal"
                value={formik.values.telefono_sucursal}
                onChange={formik.handleChange}
                inputProps={{
                  maxLength: 9
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email_sucursal"
                value={formik.values.email_sucursal}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cerrar
              </Button>
              <SubmitButton
                loading={loading}
                onClick={data ? editSucursal : createNewSucursal}
                disabled={
                  !formik.values.nombre_sucursal ||
                  !formik.values.direccion_sucursal ||
                  !formik.values.comuna_sucursal ||
                  !formik.values.region_sucursal ||
                  !formik.values.telefono_sucursal ||
                  !formik.values.email_sucursal ||
                  !formik.isValid
                }
              >
                {data ? 'Editar' : 'Crear'}
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default NewSucursal
