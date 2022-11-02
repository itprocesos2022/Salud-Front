import { Dialog } from '../Shared'
import StepOne from './Steps/StepOne'

const DialogPrestacion = ({
  open,
  onClose,
  submitFunction,
  type,
  successMessage
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
    <StepOne
      onClose={onClose}
      submitFunction={submitFunction}
      type={type}
      successMessage={successMessage}
    />
  </Dialog>
)

export default DialogPrestacion
