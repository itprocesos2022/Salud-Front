import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import OperativoObrasTabs from '../../components/Operativos/OperativosObras/OperativoObrasTabs'
import { PageHeading, Wrapper, Button } from '../../components/UI'
import { useToggle } from '../../hooks'
import DeleteOperativo from '../../components/Operativos/OperativosObras/deleteOperativoTerreno'
import operativosActions from '../../state/actions/operativos'

const OperativoTerreno = ({ children }) => {
  const dispatch = useDispatch()
  const { idOperativo } = useParams()
  const history = useHistory()
  const [operativo, setOperativo] = useState()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const onBack = () => {
    history.push('/scam/operativos')
  }

  const fetchOperativoDetails = () => {
    dispatch(operativosActions.getOperativosTerrenoDetails(idOperativo)).then(
      (data) => {
        setOperativo(data)
      }
    )
  }

  useEffect(() => {
    fetchOperativoDetails()
  }, [idOperativo])

  return (
    <div>
      <Wrapper>
        <Box marginBottom="10px" display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <IconButton onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
            <PageHeading>Operativo {idOperativo}</PageHeading>
          </Box>
          <Box>
            <Button
              danger
              onClick={toggleOpenDelete}
              disabled={
                operativo?.operativosTerrenos.estado_operativos_terreno
                  .value === 'CANCELADO'
              }
            >
              Cancelar
            </Button>
          </Box>
        </Box>
        <OperativoObrasTabs>{children}</OperativoObrasTabs>
      </Wrapper>
      <DeleteOperativo open={openDelete} onClose={toggleOpenDelete} />
    </div>
  )
}

export default OperativoTerreno
