import { Box, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'

const PrestacionDelete = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>¿Estas Seguro de Borrar esta prestación?</Typography>
    </Box>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={onClose}>Cancelar</Button>
      <Button onClick={onClose}>Si</Button>
    </Box>
  </Dialog>
)

export default PrestacionDelete
