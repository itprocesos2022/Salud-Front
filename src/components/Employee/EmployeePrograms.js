import { Box, Typography } from '@material-ui/core'
import { DataTable } from '../Shared'
import { Button } from '../UI'

const EmployeePrograms = () => (
  <div>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      ml={2}
    >
      <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
        Historial de programas
      </Typography>
      <Button>Nuevo programa</Button>
    </Box>
    <DataTable
      highlightOnHover
      pointerOnHover
      pagination
      columns={[
        {
          name: 'Nombre',
          selector: (row) => row.name,
          center: true,
          sortable: true
        },
        {
          name: 'Fecha',
          selector: (row) => row.date,
          center: true,
          sortable: true
        }
      ]}
      data={[
        {
          id: 1,
          name: 'Dental',
          date: '03/02/2022'
        },
        {
          id: 2,
          name: 'Dental',
          date: '08/10/2021'
        }
      ]}
    />
  </div>
)

export default EmployeePrograms
