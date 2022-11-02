import { Box, Typography } from '@material-ui/core'
import { Button, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'

const ModalDelete = ({ open, onClose, submitFunction }) => (
  <Dialog open={open} onClose={onClose}>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>¿Estas Seguro de Borrar esta etapa?</Typography>
    </Box>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={onClose}>Cancelar</Button>
      <SubmitButton
        onClick={() => {
          onClose()
          submitFunction()
        }}
      >
        Si
      </SubmitButton>
    </Box>
  </Dialog>
)

export default ModalDelete
