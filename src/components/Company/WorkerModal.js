import { useSelector } from 'react-redux'
import { FiArrowLeft as BackIcon } from 'react-icons/fi'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  Drawer,
  Typography,
  IconButton,
  Box,
  makeStyles,
  Grid
} from '@material-ui/core'
import { LabeledRow, Wrapper, Text } from '../UI'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '70%'
    }
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subHeading: {
    fontWeight: 'bold',
    marginBottom: 5
  }
}))

const WorkerModal = ({ open, onClose }) => {
  const classes = useStyles()
  const { isMobile } = useSelector((state) => state.ui)
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      className={classes.paper}
    >
      <Box>
        <Wrapper>
          <Box p={1}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton onClick={onClose}>
                <BackIcon />
              </IconButton>
              <Typography className={classes.heading}>José Ortega</Typography>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Wrapper>
        <Grid container spacing={2}>
          <Box mx={4} my={4}>
            <Grid item xs={12}>
              <Typography className={classes.heading}>Detalle</Typography>
            </Grid>
            <Grid item xs={12}>
              <LabeledRow label="Rut">
                <Text>12123456-1</Text>
              </LabeledRow>
              <LabeledRow label="Sexo">
                <Text>Masculino</Text>
              </LabeledRow>
              <LabeledRow label="Fecha de Nacimiento">
                <Text>19/03/2003</Text>
              </LabeledRow>
              <LabeledRow label="Domicilio:">
                <Text>San Agustin 03541</Text>
              </LabeledRow>
              <LabeledRow label="Comuna:">
                <Text>San Bernardo</Text>
              </LabeledRow>
              <LabeledRow label="Región:">
                <Text>Metropolitana</Text>
              </LabeledRow>
              <LabeledRow label="Teléfono:">
                <Text>996389801</Text>
              </LabeledRow>
              <LabeledRow label="Previsión:">
                <Text>Fonasa</Text>
              </LabeledRow>
              <LabeledRow label="Cargo:">
                <Text>Gerente</Text>
              </LabeledRow>
              <Typography className={classes.heading}>Contacto</Typography>
              <LabeledRow label="Nombre:">
                <Text>Paula Perez Olivos</Text>
              </LabeledRow>
              <LabeledRow label="Teléfono:">
                <Text>996389801</Text>
              </LabeledRow>
              <LabeledRow label="Email">
                <Text>paula.perez@ecasa.cl</Text>
              </LabeledRow>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Drawer>
  )
}

export default WorkerModal
