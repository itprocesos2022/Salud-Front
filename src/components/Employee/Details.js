import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Button, LabeledRow, Text } from '../UI'
import { useToggle } from '../../hooks'
import { formatDate } from '../../formatters'
import { EmployeeForm } from '../Employees'
import employeesActions from '../../state/actions/employees'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const Details = ({ employeeId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [loading, setLoading] = useState(true)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { employee } = useSelector((state) => state.employees)
  const updateEmployeeInfo = (values) =>
    dispatch(
      employeesActions.updateEmployee(employee.id, {
        ...values,
        created_by: employee.created_by
      })
    )

  useEffect(() => {
    if (employee) {
      updateEmployeeInfo(employee)
        .then(() => {
          if (employee.id === employeeId) {
            setLoading(false)
          }
          if (!employeeId && employee.id) {
            setLoading(false)
          }
        })
        .catch(() => {
          if (employee.id === employeeId) {
            setLoading(false)
          }
          if (!employeeId && employee.id) {
            setLoading(false)
          }
        })
    }
  }, [employee])
  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        ml={2}
      >
        <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
          Datos personales
        </Typography>
        <Button onClick={toggleOpenEdit}>Editar</Button>
      </Box>
      <Box p={2}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <LabeledRow label={'Run:'}>
              <Text>{employee?.run}</Text>
            </LabeledRow>
            <LabeledRow label={'Nombres:'}>
              <Text>{employee?.names}</Text>
            </LabeledRow>
            <LabeledRow label={'Apellido paterno:'}>
              <Text>{employee?.paternal_surname}</Text>
            </LabeledRow>
            <LabeledRow label={'Apellido materno:'}>
              <Text>{employee?.maternal_surname}</Text>
            </LabeledRow>
            <LabeledRow label={'Sexo:'}>
              <Text>{employee?.gender}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <LabeledRow label={'Estado civil:'}>
              <Text>{employee?.marital_status.description}</Text>
            </LabeledRow>
            <LabeledRow label={'Nacionalidad:'}>
              <Text>{employee?.nationality.description}</Text>
            </LabeledRow>
            <LabeledRow label={'Escolaridad:'}>
              <Text>{employee?.scholarship.description}</Text>
            </LabeledRow>
            <LabeledRow label={'Etnia:'}>
              <Text>{employee?.etnia}</Text>
            </LabeledRow>
            <LabeledRow width={170} label={'Fecha de nacimiento:'}>
              <Text>{formatDate(employee?.born_date)}</Text>
            </LabeledRow>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography className={classes.heading}>
              Información económica
            </Typography>
            <LabeledRow label={'Nombre de banco'}>
              <Text>{employee?.bank?.description}</Text>
            </LabeledRow>
            <LabeledRow label={'Tipo de cuenta'}>
              <Text>{employee?.account_type}</Text>
            </LabeledRow>
            <LabeledRow label={'Número de cuenta'}>
              <Text>{employee?.account_number}</Text>
            </LabeledRow>
            <LabeledRow label={'RSH'}>
              <Text>{employee?.rsh}</Text>
            </LabeledRow>
            <LabeledRow label={'RSH %'}>
              <Text>{employee?.rsh_percentage || `---`}</Text>
            </LabeledRow>
            <LabeledRow label={'Estado RSH'}>
              <Text>{employee?.rsh_status}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={classes.heading}>
              Información de discapacidad
            </Typography>
            <LabeledRow width={200} label={'Discapacidad:'}>
              <Text>{employee?.disability}</Text>
            </LabeledRow>
            <LabeledRow width={200} label={'Credencial discapacidad:'}>
              <Text>{employee?.credential_disability}</Text>
            </LabeledRow>
            <LabeledRow width={200} label={'Tipo de discapacidad:'}>
              <Text>{employee?.disability_type}</Text>
            </LabeledRow>
            <LabeledRow width={200} label={'Discapacidad %:'}>
              <Text>{employee?.disability_percentage}</Text>
            </LabeledRow>
            <Typography className={classes.heading}>
              Información adicional
            </Typography>
            <LabeledRow width={200} label={'Vivo:'}>
              <Text>{employee?.alive}</Text>
            </LabeledRow>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6}>
          {employee?.comments && (
            <Grid item xs={12}>
              <Typography
                style={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  marginTop: '10px'
                }}
              >
                Comentarios
              </Typography>
              <Text loading={loading}>{employee?.comments}</Text>
            </Grid>
          )}
        </Grid>
      </Box>

      {openEdit && (
        <EmployeeForm
          open={openEdit}
          onClose={toggleOpenEdit}
          type="UPDATE"
          successMessage="Datos personales actualizados"
          data={employee}
          submitFunction={updateEmployeeInfo}
          successFunction={employeesActions.getEmployeeDetails}
        />
      )}
    </Box>
  )
}

export default Details
