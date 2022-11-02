import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import { EmployeeTabs } from '../../components/Employee'
import { PageHeading, Text, Wrapper } from '../../components/UI'
import employeesActions from '../../state/actions/employees'

const Employee = ({ children }) => {
  const dispatch = useDispatch()
  const { idEmployee } = useParams()
  const [loading, setLoading] = useState(false)
  const { employee } = useSelector((state) => state.employees)
  const history = useHistory()

  const goBack = () => {
    history.push('/scam/employees')
  }

  const getEmployee = () => {
    setLoading(true)
    dispatch(employeesActions.getEmployeeDetails(idEmployee))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getEmployee()
  }, [idEmployee])
  return (
    <Wrapper>
      <Box>
        <Box marginBottom="10px" display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <IconButton onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>
            <Text>
              <PageHeading>
                {employee &&
                  `${employee.names} ${employee.paternal_surname} ${employee?.maternal_surname}`}
              </PageHeading>
            </Text>
          </Box>
        </Box>
        <EmployeeTabs loading={loading}>{children}</EmployeeTabs>
      </Box>
    </Wrapper>
  )
}

export default memo(Employee)
