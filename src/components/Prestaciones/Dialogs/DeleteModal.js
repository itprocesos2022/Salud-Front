import { Box, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'
import useStyles from '../Steps/styles'

const DeleteModal = ({ open, onClose, setDetail }) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            ¿Esta seguro que desea borrar la descripción?
          </Typography>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  onClose()
                  setDetail()
                }}
              >
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
