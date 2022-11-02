import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { IconButton, Box } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import { useDispatch, useSelector } from 'react-redux'
import PrestacionTabs from '../../components/Prestaciones/PrestacionTabs'
import prestacionesActions from '../../state/actions/prestaciones'
import { PageHeading, Wrapper } from '../../components/UI'

const Prestacion = ({ children }) => {
  const dispatch = useDispatch()
  const { idPrestacion } = useParams()
  const history = useHistory()
  const { prestacion } = useSelector((state) => state.prestaciones)

  const onBack = () => {
    history.push('/scam/prestaciones')
  }

  useEffect(() => {
    if (idPrestacion) {
      dispatch(prestacionesActions.setPrestacion(idPrestacion))
    }
  }, [idPrestacion])

  return (
    <div>
      <Wrapper>
        <Box marginBottom="10px" display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <IconButton onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
            <PageHeading>{prestacion.nombre_prestacion}</PageHeading>
          </Box>
        </Box>
        <PrestacionTabs>{children}</PrestacionTabs>
      </Wrapper>
    </div>
  )
}
export default Prestacion
