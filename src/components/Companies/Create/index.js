import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Stepper, Step, StepLabel, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import companiesActions from '../../../state/actions/companies'
import { Dialog } from '../../Shared'

function getSteps() {
  return ['Información de empresa', 'Otros datos']
}

function getStepContent(stepIndex, { onClose }) {
  switch (stepIndex) {
    case 0:
      return <StepOne onClose={onClose} />
    case 1:
      return <StepTwo onClose={onClose} />
    default:
      return <span>Paso no encontrado</span>
  }
}

const CreateDialog = ({ open, onClose, type, data, successFunction }) => {
  const steps = getSteps()
  const dispatch = useDispatch()
  const { create } = useSelector((state) => state.companies)
  const { isMobile } = useSelector((state) => state.ui)

  const handleBack = () => {
    if (create.step === 0) {
      onClose()
    } else {
      dispatch(
        companiesActions.updateCreate({ ...create, step: create.step - 1 })
      )
    }
  }

  const handleEnd = () => {
    if (successFunction) {
      successFunction()
    }
    dispatch(
      companiesActions.updateCreate({
        step: 0,
        type,
        company: null
      })
    )
    onClose()
  }

  useEffect(() => {
    dispatch(
      companiesActions.updateCreate({
        ...create,
        type,
        step: open ? 0 : create.step,
        company: type === 'UPDATE' ? data : null
      })
    )
  }, [type, open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={'lg'}
      fullWidth
      onBack={handleBack}
      fullScreen={isMobile}
    >
      <Box>
        <Stepper activeStep={create.step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {create.step === steps.length ? (
            <Box>
              <Typography align="center">{`Empresa ${
                type === 'UPDATE' ? 'actualizada' : 'creada'
              }  con éxito`}</Typography>
              <Box display="flex" justifyContent="center">
                <Button onClick={handleEnd}>Cerrar</Button>
              </Box>
            </Box>
          ) : (
            <>{getStepContent(create.step, { onClose })}</>
          )}
        </div>
      </Box>
    </Dialog>
  )
}

CreateDialog.defaultProps = {
  type: 'CREATE'
}

export default CreateDialog
