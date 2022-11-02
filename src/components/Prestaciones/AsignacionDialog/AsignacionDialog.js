import { useState } from 'react'
import { Box, Typography, ButtonGroup, Button } from '@material-ui/core'
import { Dialog } from '../../Shared'
import useStyles from '../Steps/styles'
import PrestadoresDialog from './PrestadoresDialog'
import SucursalesDialog from './SucursalesDialog'

const AsignacionDialog = ({ open, onClose }) => {
  const classes = useStyles()
  const [prestadores, setPrestadores] = useState(false)
  const [sucursales, setSucursales] = useState(false)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        {!prestadores && !sucursales && (
          <Box className={classes.actions}>
            <Typography align="center">Seleccione Asignación</Typography>
            <ButtonGroup className={classes.actions}>
              <Button
                onClick={() => {
                  setPrestadores(!prestadores)
                  setSucursales(false)
                }}
              >
                Prestadores
              </Button>
              <Button
                onClick={() => {
                  setSucursales(!sucursales)
                  setPrestadores(false)
                }}
              >
                Sucursales
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Box>
      {prestadores && <PrestadoresDialog setPrestadores={setPrestadores} />}
      {sucursales && <SucursalesDialog setSucursales={setSucursales} />}
    </Dialog>
  )
}

export default AsignacionDialog
