import { Box, Typography, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button, TextField } from '../UI'
import { Dialog } from '../Shared'
import useStyles from '../Shared/FileVisor/styles'
import teamsActions from '../../state/actions/teams'

const EditTeamMate = ({
  open,
  onClose,
  teamMate,
  setTeamMate,
  setFetchMate,
  teamId
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const onEditMember = () => {
    setLoading(true)
    dispatch(teamsActions.editTeamMate(teamId, teamMate)).then(() => {
      setLoading(false)
      setFetchMate(true)
      onClose()
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">Editar al integrante</Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Rut"
                  value={teamMate.rut}
                  onChange={(e) => {
                    setTeamMate({
                      ...teamMate,
                      rut: e.target.value
                    })
                  }}
                />
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="Nombres"
                    value={teamMate.nombres}
                    onChange={(e) => {
                      setTeamMate({
                        ...teamMate,
                        nombres: e.target.value
                      })
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    label="Apellidos"
                    value={teamMate.apellidos}
                    onChange={(e) => {
                      setTeamMate({
                        ...teamMate,
                        apellidos: e.target.value
                      })
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button loading={loading} onClick={onEditMember}>
                Guardar
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default EditTeamMate
