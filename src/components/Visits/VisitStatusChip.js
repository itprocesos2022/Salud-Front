import { Box, makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 5,
    padding: 8
  },
  started: {
    backgroundColor: '#f6e68f'
  },
  canceled: {
    backgroundColor: '#FFEBF6'
  },
  blue: {
    backgroundColor: '#aed5ff'
  },
  done: {
    backgroundColor: '#81d88d'
  }
}))

const VisitStatusChip = ({ visit }) => {
  const classes = useStyles()

  const getStatusClassName = (status) => {
    if (status === 'EN EJECUCIÓN' || status === 'PAUSADA')
      return classes.started
    if (status === 'PROGRAMADO' || status === 'REPROGRAMADO')
      return classes.blue
    if (status === 'TERMINADO' || status === 'CERRADO') return classes.done
    return classes.canceled
  }

  return (
    <Box
      className={clsx(
        classes.root,
        getStatusClassName(visit.estado_operativos_terreno.value)
      )}
    >
      {`${visit?.estado_operativos_terreno.value.charAt(
        0
      )}${visit?.estado_operativos_terreno.value.slice(1).toLowerCase()}`}
    </Box>
  )
}

export default VisitStatusChip
