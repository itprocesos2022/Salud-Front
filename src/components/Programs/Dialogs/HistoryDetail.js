import { Box, Typography } from '@material-ui/core'
import { Dialog } from '../../Shared'
import { SubmitButton, LabeledRow, Text } from '../../UI'

const HistoryDetailModal = ({ open, onClose, data }) => (
  <Dialog open={open} onClose={onClose}>
    <Box display="flex" justifyContent="center">
      <Typography variant="h6">Detalle</Typography>
    </Box>
    <Box>
      <LabeledRow label={'Obra'}>
        <Text> {data.name} </Text>
      </LabeledRow>
      <LabeledRow label={'Trabajador'}>
        <Text> {data.worker} </Text>
      </LabeledRow>
    </Box>
    <Box textAlign="center" marginTop="10px">
      <SubmitButton onClick={onClose}>Cerrar</SubmitButton>
    </Box>
  </Dialog>
)

export default HistoryDetailModal
