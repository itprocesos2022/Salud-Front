import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import { Button, PageHeading, Wrapper } from '../../components/UI'
import Tabs from '../../components/Company/Tabs'
import { useToggle } from '../../hooks'
import DeleteEmpresa from '../../components/Companies/DeleteDialog/DeleteModal'
import companiesActions from '../../state/actions/companies'

const Company = ({ children }) => {
  const dispatch = useDispatch()
  const { idCompany } = useParams()
  const { company } = useSelector((state) => state.companies)
  const history = useHistory()
  const { open: showDeleteEmpresa, toggleOpen: toggleDeleteEmpresa } =
    useToggle()
  const goBack = () => {
    history.push('/scam/companies')
  }

  const fetchCompanyDetails = () => {
    dispatch(companiesActions.getCompany(idCompany))
  }
  useEffect(() => {
    fetchCompanyDetails()
  }, [])
  return (
    <div>
      <Box>
        <Wrapper>
          <Box
            marginBottom="10px"
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <IconButton onClick={goBack}>
                <ArrowBackIcon />
              </IconButton>
              <PageHeading>{company?.business_name}</PageHeading>
            </Box>
            <Box>
              <Button
                danger
                disabled={company?.state === 'DELETED'}
                onClick={toggleDeleteEmpresa}
              >
                Eliminar
              </Button>
            </Box>
          </Box>
          <Tabs>{children}</Tabs>
        </Wrapper>
      </Box>
      <DeleteEmpresa
        open={showDeleteEmpresa}
        onClose={toggleDeleteEmpresa}
        companyId={idCompany}
      />
    </div>
  )
}

export default Company
