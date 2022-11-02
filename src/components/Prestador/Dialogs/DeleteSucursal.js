import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button, SubmitButton } from '../../UI'
import { Dialog } from '../../Shared'
import useStyles from '../../Shared/FileVisor/styles'
import sucursalActions from '../../../state/actions/Sucursales'

const DeleteSucursal = ({
  open,
  onClose,
  setCargaSucursal,
  deleteSucursal
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const onDeleteSucursal = () => {
    setLoading(true)
    dispatch(sucursalActions.deleteSucursal(deleteSucursal)).then(() => {
      setLoading(false)
      setCargaSucursal(true)
      onClose()
    })
  }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            ¿Esta seguro que desea borrar esta Sucursal?
          </Typography>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <SubmitButton loading={loading} onClick={onDeleteSucursal}>
                Borrar
              </SubmitButton>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
export default DeleteSucursal
