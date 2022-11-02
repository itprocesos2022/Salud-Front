import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import programasActions from '../../state/actions/programas'
import { Button } from '../UI'
import { Dialog } from '../Shared'

const DeleteProgram = ({ open, onClose, toDeleteId }) => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(programasActions.deletePrograma(toDeleteId))
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>¿Estas Seguro de Borrar este Programa?</Typography>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleDelete}>Si</Button>
      </Box>
    </Dialog>
  )
}

export default DeleteProgram
