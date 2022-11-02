import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { Button } from '../../UI'
import { Dialog } from '../../Shared'
import useStyles from './styles'
import operativosActions from '../../../state/actions/operativos'

const deleteOperativoTerreno = ({ open, onClose }) => {
  const { idOperativo } = useParams()
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const deleteOperativo = () => {
    setLoading(true)
    dispatch(operativosActions.deleteOperativoTerreno(idOperativo)).then(() => {
      setLoading(false)
      onClose()
    })
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth={true}>
      <Box>
        <Box>
          <Typography align="center">
            ¿Está seguro que desea cancelar este operativo?
          </Typography>
          <Box>
            <div className={classes.actions}>
              <Button onClick={onClose} variant="outlined">
                Cancelar
              </Button>
              <Button loading={loading} onClick={deleteOperativo}>
                Borrar
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default deleteOperativoTerreno
