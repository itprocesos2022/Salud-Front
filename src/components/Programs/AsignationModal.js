import { Box, Typography, Button } from '@material-ui/core'
import { Dialog } from '../Shared'
import { SearchInput, SubmitButton } from '../UI'

const AsignationModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <Box display="flex" justifyContent="center">
      <Typography variant="h6">Asociar</Typography>
    </Box>
    <Box>
      <SearchInput placeholder="Buscar..." />
    </Box>
    <Box textAlign="center" marginTop="10px">
      <Button onClick={onClose} variant="outlined">
        Cancelar
      </Button>
      <SubmitButton>Asociar</SubmitButton>
    </Box>
  </Dialog>
)

export default AsignationModal
