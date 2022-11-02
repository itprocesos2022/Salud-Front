import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import {
  EmployeeJobs,
  EmployeeDetails,
  EmployeeInfoContact,
  EmployeeFamiliarGroup,
  SpecializationHistory
} from '../Employee'
import { Dialog, Tabs } from '../Shared'
import employeesActions from '../../state/actions/employees'

const JobsDialog = ({
  open,
  onClose,
  employeeId,
  employeeNames,
  employeeRun,
  customButon
}) => {
  const tabsComponents = {
    0: <EmployeeDetails employeeId={employeeId} />,
    1: <EmployeeInfoContact />,
    2: <EmployeeFamiliarGroup />,
    3: <SpecializationHistory employeeId={employeeId} />,
    4: <EmployeeJobs employeeId={employeeId} />
  }
  const [value, setValue] = useState(0)
  const { isMobile } = useSelector((state) => state.ui)

  const dispatch = useDispatch()

  useEffect(() => {
    if (open) {
      dispatch(employeesActions.getEmployeeDetails(employeeId))
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth
      fullWidth="lg"
      fullScreen={isMobile}
      customButon={customButon}
    >
      <Box>
        <Typography
          style={{
            fontSize: 14,
            opacity: 0.7,
            marginBottom: 5,
            textTransform: 'uppercase'
          }}
        >
          Trabajador:
        </Typography>
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>
          <a href={`/employee/${employeeId}/info`} target={'_blank'}>
            {employeeNames}
          </a>
        </Typography>
        <Typography>Run: {employeeRun}</Typography>
        <Tabs
          value={value}
          onChange={(__, newValue) => {
            setValue(newValue)
          }}
          tabs={[
            'Datos personales',
            'Contacto',
            'Grupo Familiar',
            'Especialidades',
            'Trabajos'
          ]}
        >
          {tabsComponents[value]}
        </Tabs>
      </Box>
    </Dialog>
  )
}

export default JobsDialog
