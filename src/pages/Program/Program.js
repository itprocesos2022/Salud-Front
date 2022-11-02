import { useParams, useHistory } from 'react-router-dom'
import { IconButton, Box } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import DeleteIcon from '@material-ui/icons/Delete'
import { useToggle } from '../../hooks'
import { PageHeading, Wrapper } from '../../components/UI'
import ProgramTabs from '../../components/Programs/ProgramTabs'
import DeleteProgram from '../../components/Programs/DeleteProgram'

const Program = ({ children }) => {
  const { idProgram } = useParams()
  const history = useHistory()

  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const onBack = () => {
    history.push('/scam/programs')
  }

  return (
    <div>
      <Wrapper>
        <Box marginBottom="10px" display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <IconButton onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
            <PageHeading>Programa {idProgram}</PageHeading>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <IconButton>
              <DeleteIcon onClick={toggleOpenDelete} color="error" />
            </IconButton>
          </Box>
        </Box>
        <ProgramTabs>{children}</ProgramTabs>
      </Wrapper>
      <DeleteProgram open={openDelete} onClose={toggleOpenDelete} />
    </div>
  )
}

export default Program
