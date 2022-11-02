import { Box, Typography } from '@material-ui/core'
import { LabeledRow, Text } from '../../UI'
import { Dialog, DataTable } from '../../Shared'

const TeamDetail = ({ open, onClose, row }) => (
  <Dialog open={open} onClose={onClose}>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography style={{ fontSize: '1.5rem' }}>
        Detalles del equipo
      </Typography>
    </Box>
    <Box>
      <LabeledRow label="Nombre:">
        <Text>{row?.nombre}</Text>
      </LabeledRow>
      <LabeledRow label="Region:">
        <Text>{row?.region}</Text>
      </LabeledRow>
      <LabeledRow label="Comuna:">
        <Text>{row?.comuna}</Text>
      </LabeledRow>
    </Box>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography style={{ fontSize: '1.5rem' }}>Integrantes</Typography>
    </Box>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <DataTable
        emptyMessage="No hay integrantes"
        columns={[
          {
            name: 'Nombres',
            selector: (integrante) => integrante.nombres,
            sortable: true,
            hide: 'md'
          },
          {
            name: 'Apellidos',
            selector: (integrante) => integrante.apellidos,
            sortable: true,
            hide: 'md'
          },
          {
            name: 'Rut',
            selector: (integrante) => integrante.rut,
            sortable: true,
            hide: 'lg'
          }
        ]}
        data={row?.integrantes}
      />
    </Box>
  </Dialog>
)

export default TeamDetail
