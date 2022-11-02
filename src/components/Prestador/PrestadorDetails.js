import { Typography, Box, Grid, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { LabeledRow, Text } from '../UI'
import { useToggle } from '../../hooks'
import useStyles from './Dialogs/styles'
import EditDescription from './Dialogs/EditDescription'
import prestacionesActions from '../../state/actions/prestadores'

const Details = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { idPrestador } = useParams()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const [prestador, setPrestador] = useState()
  const [cargaPrestador, setCargaPrestador] = useState(true)
  const fetchPrestador = () => {
    dispatch(prestacionesActions.getOnePrestador(idPrestador)).then((data) => {
      setPrestador(data.prestador)
      console.log(data.prestador)
      setCargaPrestador(false)
    })
  }

  useEffect(() => {
    if (cargaPrestador) {
      fetchPrestador()
    }
  }, [cargaPrestador])

  return (
    <div>
      <Grid container fluid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Box>
              <Typography className={classes.heading}>Información</Typography>
              <Box>
                <LabeledRow label="Rut">
                  <Text>{prestador?.prestador_rut}</Text>
                </LabeledRow>
                <LabeledRow label="Razón Social">
                  <Text> {prestador?.razon_social}</Text>
                </LabeledRow>
                <LabeledRow label="Dirección:">
                  <Text>{prestador?.address?.split(',')[0]}</Text>
                </LabeledRow>
                <LabeledRow label="Comuna:">
                  <Text>{prestador?.address?.split(',')[1]}</Text>
                </LabeledRow>
                <LabeledRow label="Región:">
                  <Text>{prestador?.address?.split(',')[2]} </Text>
                </LabeledRow>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box>
              <Typography className={classes.heading}>Contacto</Typography>
            </Box>
            <LabeledRow label="Teléfono:">
              <Text>{prestador?.prestadores_contacto?.telefono_1}</Text>
            </LabeledRow>
            <LabeledRow label="Nombre:">
              <Text>{prestador?.prestadores_contacto?.nombre_contacto} </Text>
            </LabeledRow>
            <LabeledRow label="Email:">
              <Text>{prestador?.prestadores_contacto?.email_contacto}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton>
                <EditIcon color="primary" onClick={toggleOpenEdit} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <EditDescription
        open={openEdit}
        onClose={toggleOpenEdit}
        prestador={prestador}
        setPrestador={setPrestador}
        setCargaPrestador={setCargaPrestador}
      />
    </div>
  )
}

export default Details
