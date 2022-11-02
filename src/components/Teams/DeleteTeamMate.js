import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button } from '../UI'
import { Dialog } from '../Shared'
import useStyles from '../Shared/FileVisor/styles'
import teamsActions from '../../state/actions/teams'

const DeleteTeamMate = ({
  open,
  onClose,
  deleteMate,
  setFetchMate,
  teamId
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const onDeleteTeamMember = () => {
    setLoading(true)
    dispatch(teamsActions.deleteTeamMate(teamId, deleteMate)).then(() => {
      setLoading(false)
      setFetchMate(true)
      onClose()
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            ¿Esta seguro que desea borrar al integrante?
          </Typography>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button loading={loading} onClick={onDeleteTeamMember}>
                Borrar
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default DeleteTeamMate
