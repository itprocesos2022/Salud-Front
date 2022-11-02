import { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Select } from '../UI'
import { Dialog } from '../Shared'
import useStyles from './Steps/styles'
import prestacionesActions from '../../state/actions/prestaciones'

const TypeDialog = ({ open, onClose, setUpdate }) => {
  const classes = useStyles()
  const [selectedType, setSelectedType] = useState()
  const dispatch = useDispatch()
  const { idPrestacion } = useParams()
  const { beneficiary_types } = useSelector((state) => state.prestaciones)

  useEffect(() => {
    dispatch(prestacionesActions.getBeneficiaryType())
  }, [])

  const createAsociation = () => {
    dispatch(
      prestacionesActions.createAsociationTypePrestacion(idPrestacion, {
        idType: selectedType
      })
    )
      .then(() => {
        setUpdate(true)
        onClose()
      })
      .catch((ex) => ex)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">Agregar Tipo</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                label="Seleccione un tipo"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Sin Tipo</option>
                {beneficiary_types.map((type) => (
                  <option value={type.id}>{type.nombre_beneficiario}</option>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cerrar
              </Button>
              <Button onClick={createAsociation}>Agregar</Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default TypeDialog
