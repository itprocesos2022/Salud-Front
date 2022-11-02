import { Box, Typography } from '@material-ui/core'
import { useState } from 'react'

import teamsActions from '../../../state/actions/teams'
import { Button, TextField } from '../../UI'
import { Dialog } from '../../Shared'

const EditObservacion = ({ open, onClose, row }) => {
  const [observacionText, setObservacionText] = useState('')
  const editObservacion = () => {
    teamsActions.editTeam(row.id, { observacion: observacionText })()
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>Añadir observación</Typography>
      </Box>
      <Box>
        <TextField
          defaultValue={row?.observacion || 'No hay observación.'}
          onChange={(e) => {
            setObservacionText(e.target.value)
          }}
        ></TextField>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={editObservacion}>Añadir</Button>
      </Box>
    </Dialog>
  )
}

export default EditObservacion
