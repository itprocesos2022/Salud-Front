import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import teamsActions from '../../../state/actions/teams'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'

const DeleteTeams = ({ open, onClose, toDeleteId }) => {
  const dispatch = useDispatch()
  const deleteTeam = () => {
    dispatch(teamsActions.DeleteTeam(toDeleteId))
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>¿Estas Seguro de Borrar este equipo?</Typography>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={deleteTeam}>Si</Button>
      </Box>
    </Dialog>
  )
}

export default DeleteTeams
