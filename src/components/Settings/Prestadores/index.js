import { Box, Typography } from '@material-ui/core'
import { DataTable } from '../../Shared'
import { Wrapper, ActionsTable } from '../../UI'

const Prestadores = () => (
  <Wrapper>
    <Box>
      <Box display="flex" justifyContent="start">
        <Typography variant="h6">Prestadores</Typography>
      </Box>
      <Box>
        <DataTable
          columns={[
            {
              name: 'Rut',
              selector: (row) => row.rut,
              sortable: true
            },
            {
              name: 'Razón social',
              selector: (row) => row.name
            },
            {
              name: 'Región',
              selector: (row) => row.region
            },
            {
              name: 'Mostrar',
              center: true,
              cell: (row) => <ActionsTable {...row} onSwitch={() => {}} />
            }
          ]}
          data={[
            {
              id: 1,
              rut: '76188148-5',
              name: 'AZAPA DOS CONSTRUCTORA SPA',
              region: 'Metropolitana'
            },
            {
              id: 2,
              rut: '96942400-2',
              name: 'MEGASALUD SPA',
              region: 'Metropolitana'
            }
          ]}
        />
      </Box>
    </Box>
  </Wrapper>
)

export default Prestadores
