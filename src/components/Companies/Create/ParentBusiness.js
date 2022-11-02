import { Box, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Dialog } from '../../Shared'
import { Button, SearchInput } from '../../UI'
import TreeCompany from './TreeCompany'

const ParentBusiness = ({
  type,
  open,
  onClose,
  data,
  selectedId,
  onChange
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <Typography
      style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '10px' }}
      align="center"
    >
      {type === 'PARENT'
        ? 'Selecciona una empresa madre'
        : 'Selecciona una empresa para la facturación'}
    </Typography>
    <Box marginTop="15px" marginBottom="15px">
      <SearchInput placeholder="Buscar por: razón social, rut" />
    </Box>
    <Box>
      <Alert severity="info">
        {type === 'PARENT' ? (
          <>
            La empresa seleccionada será la <strong>empresa madre</strong> de la
            nueva empresa
          </>
        ) : (
          <>
            La empresa seleccionada será la <strong>empresa facturadora</strong>{' '}
            de la obra
          </>
        )}
      </Alert>
    </Box>
    <TreeCompany data={data} selectedId={selectedId} onChange={onChange} />
    <Box textAlign="center">
      <Button onClick={onClose} variant="outlined">
        Cerrar
      </Button>
      <Button onClick={onClose}>Aceptar</Button>
    </Box>
  </Dialog>
)

ParentBusiness.defaultProps = {
  type: 'PARENT'
}

export default ParentBusiness
