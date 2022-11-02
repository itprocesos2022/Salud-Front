import { Box } from '@material-ui/core'
import OperativosTerreno from '../../components/Operativos/OperativosObras/operativoTerreno'
import OperativosDerivacion from '../../components/Operativos/operativosDerivacion'

export default function Opertaivos() {
  return (
    <Box>
      <OperativosTerreno />
      <OperativosDerivacion />
    </Box>
  )
}
