import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import { useToggle } from '../../hooks'
import employeesActions from '../../state/actions/employees'
import { ActionsTable, Button } from '../UI'
import JobForm from './JobForm'
import { ConfirmDelete, DataTable } from '../Shared'
import { formatCurrency, formatDate } from '../../formatters'

const HistoryJobs = ({ employeeId }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { idEmployee } = useParams()
  const [list, setList] = useState([])
  const [currentEmployeeId] = useState(idEmployee || employeeId)
  const [current, setCurrent] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const { employee } = useSelector((state) => state.employees)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const fetchData = () => {
    dispatch(
      employeesActions.getEmployeeJobs({ employee_id: currentEmployeeId })
    ).then((data) => {
      setList(
        data.map((item) => ({
          ...item,
          startDate: formatDate(item.admission_date),
          endDate: item.leave_date ? formatDate(item.leave_date) : '---',
          stringSalary: formatCurrency(item.salary)
        }))
      )
    })
  }

  const createEvent = (values) =>
    dispatch(
      employeesActions.createEmployeeJob({
        ...values,
        employee_id: parseInt(currentEmployeeId, 10),
        created_by: user.id
      })
    )

  const updateEvent = (values) => {
    if (!values.leave_date) {
      delete values.leave_date
    }
    if (!values.leave_motive) {
      delete values.leave_motive
    }
    return dispatch(
      employeesActions.updateEmployeeJob(current.id, {
        ...values,
        state: current.state,
        employee_id: parseInt(currentEmployeeId, 10),
        created_by: current.created_by
      })
    )
  }
  const patchEvent = (id) => {
    dispatch(
      employeesActions.patchEmployeeJob(id, {
        state: 'DELETED'
      })
    ).then(() => {
      enqueueSnackbar('Especializacion eliminada', { variant: 'success' })
      fetchData()
      toggleOpenDelete()
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        ml={2}
      >
        <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
          Historial de trabajos
        </Typography>
        <Button onClick={toggleOpenAdd}>Nuevo trabajo</Button>
      </Box>
      <Box>
        <DataTable
          emptyMessage="Este trabajador no tiene trabajos en su historial"
          columns={[
            {
              name: 'Nombre de empresa',
              selector: (row) => row.business_name,
              sortable: true
            },
            {
              name: 'Nombre de Obra',
              selector: (row) => row.construction_name,
              hide: 'md',
              sortable: true
            },
            {
              name: 'Fecha de inicio',
              hide: 'md',
              selector: (row) => row.startDate
            },
            {
              name: 'Fecha de fin',
              selector: (row) => row.endDate
            },

            {
              name: 'Plazo de contrato',
              selector: (row) => row.contract_term,
              hide: 'md'
            },
            {
              name: 'Tipo de contrato',
              selector: (row) => row.contract_type,
              hide: 'md'
            },
            {
              name: 'Ingreso',
              selector: (row) => row.stringSalary,
              hide: 'md'
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  onEdit={() => {
                    setCurrent(row)
                    toggleOpenEdit()
                  }}
                  onDelete={() => {
                    setCurrent(row)
                    toggleOpenDelete()
                  }}
                />
              )
            }
          ]}
          data={list}
          pagination
        />
      </Box>
      {openAdd && (
        <JobForm
          successMessage="Especializaci??n creado"
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={createEvent}
          successFunction={fetchData}
          specialty_id={employee?.specialty?.specialty_id || ''}
          specialty_detail_id={employee?.specialty?.specialty_detail_id || ''}
        />
      )}
      {current && openEdit && (
        <JobForm
          type="UPDATE"
          successMessage="Especializaci??n actualizado"
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={updateEvent}
          data={current}
          successFunction={fetchData}
        />
      )}
      {current && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => patchEvent(current.id)}
          message={
            <Typography variant="h6">
              ??Est??s seguro de eliminar esta especializaci??n?
            </Typography>
          }
        />
      )}
    </Box>
  )
}

HistoryJobs.propTypes = {}

export default HistoryJobs
