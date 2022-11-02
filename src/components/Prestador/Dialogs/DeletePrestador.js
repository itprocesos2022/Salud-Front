import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'
import useStyles from './styles'
import prestacionesActions from '../../../state/actions/prestadores'

const DeletePrestador = ({ open, onClose, deletePrestador }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const prestadorDelete = () => {
    setLoading(true)
    dispatch(prestacionesActions.deletePrestador(deletePrestador)).then(() => {
      setLoading(false)
      dispatch(prestacionesActions.updatePrestadores(true))
      onClose()
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            ¿Está seguro que desea borrar al Prestador?
          </Typography>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button loading={loading} onClick={prestadorDelete}>
                Borrar
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default DeletePrestador
