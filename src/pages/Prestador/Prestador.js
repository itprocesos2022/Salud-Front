import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import PrestadorTabs from '../../components/Prestador/PrestadorTabs'
import { PageHeading, Wrapper } from '../../components/UI'
import prestacionesActions from '../../state/actions/prestadores'

const Prestador = ({ children }) => {
  const dispatch = useDispatch()
  const { idPrestador } = useParams()
  const history = useHistory()
  const [prestador, setPrestador] = useState([])
  const [loading, setLoading] = useState(true)
  const onBack = () => {
    history.push('/scam/prestadores')
  }
  const fetchPrestadorDetails = () => {
    dispatch(prestacionesActions.getOnePrestador(idPrestador)).then((data) => {
      setPrestador(data.prestador)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (loading) {
      fetchPrestadorDetails()
    }
  }, [loading])
  return (
    <div>
      <Wrapper>
        <Box marginBottom="10px" display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <IconButton onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
            <PageHeading>{prestador?.nombre_prestador}</PageHeading>
          </Box>
        </Box>
        <PrestadorTabs>{children}</PrestadorTabs>
      </Wrapper>
    </div>
  )
}

export default Prestador
