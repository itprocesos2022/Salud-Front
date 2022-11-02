import { Box, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useToggle } from '../../../hooks'
import { DataTable } from '../../Shared'
import { ActionsTable } from '../../UI'
import AttendedEmployeesForm from './AttendedEmployeesForm'

const AttendedEmployees = () => {
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  return (
    <div>
      <Box>
        <Box display="flex" justifyContent="center">
          <IconButton onClick>
            <AddIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="center">
          <DataTable
            highlightOnHover
            pointerOnHover
            onRowClicked={() => {}}
            columns={[
              {
                name: '',
                selector: (row) => row.nombre_beneficiario,
                sortable: true,
                center: true
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <div onClick>
                    <ActionsTable {...row} onDelete />
                  </div>
                )
              }
            ]}
            data={[]}
          />
        </Box>
      </Box>
      {openAdd && (
        <AttendedEmployeesForm open={openAdd} onClose={toggleOpenAdd} />
      )}
    </div>
  )
}

export default AttendedEmployees
