import { Box, Typography } from '@material-ui/core'
import { Button, TextField, Select, TextArea } from '../../UI'
import { Dialog } from '../../Shared'

const EditMedicion = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>Editar Medicion</Typography>
    </Box>
    <Box>
      <TextField label="Nombre Medida" placeholder="Nombre Medida" />
    </Box>
    <Box>
      <Select label="Tipo de Medida">
        <option>Selecciona un Tipo</option>
        <option>Selecciona un Numero Con Decimales</option>
        <option>Texto</option>
        <option>Grados C°</option>
      </Select>
    </Box>
    <Box>
      <TextArea
        label="Descripcion de la Medida"
        placeholder="Descripcion de la Medida"
      ></TextArea>
    </Box>
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <Button onClick={onClose}>Cancelar</Button>
      <Button onClick={onClose}>Guardar</Button>
    </Box>
  </Dialog>
)

export default EditMedicion
