import { Box, Typography, Grid } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import { TextField, Button, Select, RutTextField } from '../../UI'
import { Dialog } from '../../Shared'
import useStyles from './styles'
import regiones from '../../../resources/regions.json'
import prestacionesActions from '../../../state/actions/prestadores'

const EditDescription = ({
  open,
  onClose,
  prestador,
  setPrestador,
  setCargaPrestador
}) => {
  const classes = useStyles()
  const { idPrestador } = useParams()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [comuns, setComuns] = useState([])
  const [prestadorValues, setPrestadorValues] = useState({
    rut: '',
    razonSocial: '',
    direccion: '',
    comuna: '',
    region: '',
    telefono: '',
    email: '',
    nombre: ''
  })

  const onEditPrestador = () => {
    setLoading(true)
    const prestadorData = {
      prestador_rut: prestadorValues.rut,
      razon_social: prestadorValues.razonSocial,
      direccion: `${prestadorValues.direccion.value.terms[0].value}, ${prestadorValues.comuna}, ${prestadorValues.region}`,
      nombre: prestadorValues.nombre,
      telefono: prestadorValues.telefono,
      email: prestadorValues.email
    }
    dispatch(
      prestacionesActions.editPrestador(idPrestador, prestadorData)
    ).then(() => {
      setLoading(false)
      setPrestador(true)
      setCargaPrestador(true)
      onClose()
    })
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'region': {
        const region = regiones.regions.find((item) => item.number === value)
        setComuns(region?.communes || [])
        setPrestadorValues({ ...prestadorValues, region: region.name })
        break
      }
      case 'comuna': {
        const commune = comuns.find((item) => item.name === value)
        setPrestadorValues({ ...prestadorValues, comuna: commune.name })
        break
      }
      default:
        throw new Error('Error')
    }
  }

  useEffect(() => {
    console.log(prestador)
    setPrestadorValues({
      rut: prestador?.prestador_rut,
      razonSocial: prestador?.razon_social,
      direccion: prestador?.address?.split(',')[0],
      comuna: prestador?.address?.split(',')[1],
      region: prestador?.address?.split(',')[2],
      telefono: prestador?.prestadores_contacto?.telefono_1,
      email: prestador?.prestadores_contacto?.email_contacto,
      nombre: prestador?.prestadores_contacto?.nombre_contacto
    })
    console.log(prestadorValues)
  }, [prestador])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography container spacing={2} align="center">
            Editar Detalles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <RutTextField
                label="Rut"
                name="prestador_rut"
                value={prestadorValues.rut}
                onChange={(e) =>
                  setPrestadorValues({
                    ...prestadorValues,
                    rut: e.target.value
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <TextField
                label="Dirección"
                name="address"
                value={prestadorValues.direccion}
                onChange={(e) =>
                  setPrestadorValues({
                    ...prestadorValues,
                    direccion: e.target.value
                  })
                }
              /> */}
              <label>Dirección</label>
              <GooglePlacesAutocomplete
                selectProps={{
                  value: prestadorValues.direccion,
                  onChange: (e) => {
                    console.log(e)
                    setPrestadorValues({
                      ...prestadorValues,
                      direccion: e
                    })
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                label="Región"
                name="region"
                required
                onChange={handleSelectChange}
              >
                <option value={''}>SELECCIONE UNA REGIÓN</option>
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
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono"
                name="phone"
                maxLength={10}
                value={prestadorValues.telefono}
                onChange={(e) =>
                  setPrestadorValues({
                    ...prestadorValues,
                    telefono: e.target.value.replace(/\D/g, '')
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="Email"
                value={prestadorValues.email}
                onChange={(e) =>
                  setPrestadorValues({
                    ...prestadorValues,
                    email: e.target.value
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                name="name"
                value={prestadorValues.nombre}
                onChange={(e) =>
                  setPrestadorValues({
                    ...prestadorValues,
                    nombre: e.target.value
                  })
                }
              />
            </Grid>
          </Grid>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button
                loading={loading}
                onClick={() => {
                  console.log(prestadorValues.direccion)
                  onEditPrestador()
                }}
              >
                Editar
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default EditDescription
