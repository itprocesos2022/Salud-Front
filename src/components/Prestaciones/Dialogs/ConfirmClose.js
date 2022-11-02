import { Box, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'

const ConfirmClose = ({ open, onClose, submitFunction }) => (
  <Dialog open={open} onClose={onClose}>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>
        ¿Estas Seguro de Borrar este tipo de beneficiario?
      </Typography>
    </Box>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={onClose}>Cancelar</Button>
      <Button
        onClick={() => {
          onClose()
          submitFunction()
        }}
      >
        Si
      </Button>
    </Box>
  </Dialog>
)

export default ConfirmClose
