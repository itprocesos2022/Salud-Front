import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'
import useStyles from './styles'
import companiesActions from '../../../state/actions/companies'

const DeleteModal = ({ open, onClose, companyId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const deleteCompany = () => {
    setLoading(true)
    dispatch(companiesActions.blockCompany(companyId)).then(() => {
      setLoading(false)
      onClose()
    })
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            ¿Está seguro que desea borrar la Empresa?
          </Typography>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button loading={loading} onClick={deleteCompany}>
                Borrar
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default DeleteModal
