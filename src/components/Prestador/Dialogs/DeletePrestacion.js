import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Button, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'
import useStyles from './styles'
import prestacionesActions from '../../../state/actions/prestaciones'

const DeletePrestacion = ({
  open,
  onClose,
  deletePrestacion,
  setCargaPrestaciones
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const onDeletePrestacion = () => {
    setLoading(true)
    dispatch(prestacionesActions.deletePrestacion(deletePrestacion)).then(
      () => {
        setLoading(false)
        setCargaPrestaciones(true)
        onClose()
      }
    )
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            ¿Esta seguro que desea desasignar esta Prestación?
          </Typography>
          <Box>
            <div className={classes.centered}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton loading={loading} onClick={onDeletePrestacion}>
                Borrar
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
export default DeletePrestacion
