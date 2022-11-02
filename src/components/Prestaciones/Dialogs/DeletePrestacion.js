import { Box, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'

const DeletePrestacion = ({ data, open, onClose, deleteFunction }) => (
  <Dialog open={open} onClose={onClose}>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>¿Estas Seguro de Borrar esta Prestacion?</Typography>
    </Box>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={onClose}>Cancelar</Button>
      <Button
        onClick={() => {
          deleteFunction(data, data.id)
          onClose()
        }}
      >
        Si
      </Button>
    </Box>
  </Dialog>
)

export default DeletePrestacion
