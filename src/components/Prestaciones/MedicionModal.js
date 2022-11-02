//  import { useSelector } from 'react-redux'
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
import { LabeledRow, Wrapper, Button, Text } from '../UI'
import { useToggle } from '../../hooks'
import EditMedicion from './Dialogs/EditMedicion'
import DeleteMedicion from './Dialogs/DeleteMedicion'

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

const MedicionModal = ({ open, onClose, toggleOpenMedida }) => {
  const classes = useStyles()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  //  const { isMobile } = useSelector((state) => state.ui)
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose} fullScreen={false}>
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
                <Typography className={classes.heading}>
                  SCRENNING VISUAL (APORTE EMPRESA)
                </Typography>
                <Box>
                  <Button onClick={toggleOpenMedida}>Agregar</Button>
                </Box>
              </Box>
            </Box>
          </Wrapper>
          <Grid container spacing={2}>
            <Box mx={4} my={4}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={toggleOpenEdit}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={toggleOpenDelete}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <LabeledRow label="Nombre:">
                  <Text>Diagnóstico Inicial</Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12}>
                <LabeledRow label="Tipo:">
                  <Text>Texto</Text>
                </LabeledRow>
                <LabeledRow label="Descripción:">
                  <Box borderLeft={1} my={4}>
                    <Text>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for 'lorem ipsum' will
                      uncover many web sites still in their infancy. Var
                    </Text>
                  </Box>
                </LabeledRow>
              </Grid>
            </Box>
          </Grid>
          <Grid container spacing={2}>
            <Box mx={4} my={4} bgcolor="grey.400" boxShadow={1}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={toggleOpenEdit}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={toggleOpenDelete}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <LabeledRow label="Nombre:">
                  <Text>Diagnóstico Secundario</Text>
                </LabeledRow>
              </Grid>
              <Grid item xs={12}>
                <LabeledRow label="Tipo:">
                  <Text>Número con Decimales</Text>
                </LabeledRow>
                <LabeledRow label="Descripción:">
                  <Box borderLeft={1} my={4}>
                    <Text>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English. Many desktop publishing
                      packages and web page editors now use Lorem Ipsum as their
                      default model text, and a search for 'lorem ipsum' will
                      uncover many web sites still in their infancy. Var
                    </Text>
                  </Box>
                </LabeledRow>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Drawer>
      <DeleteMedicion open={openDelete} onClose={toggleOpenDelete} />
      <EditMedicion open={openEdit} onClose={toggleOpenEdit} />
    </div>
  )
}

export default MedicionModal
