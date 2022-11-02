import {
  Grid,
  makeStyles,
  Typography,
  Box,
  IconButton
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import programasActions from '../../state/actions/programas'
import { LabeledRow, Text } from '../UI'
import { useToggle } from '../../hooks'
import EditProgram from './ProgramForm'

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  }
}))

const ProgramDetail = () => {
  const { idProgram } = useParams()
  const classes = useStyles()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const [programData, setProgramData] = useState()

  const fetchData = () => {
    programasActions
      .getOnePrograma(idProgram)()
      .then((data) => {
        setProgramData(data.programa)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [idProgram])
  return (
    <div>
      <Grid container fluid>
        <Grid item xs={12} md={5}>
          <Typography className={classes.heading}>Detalle</Typography>
          <LabeledRow label={'Nombre'}>
            <Text>{programData?.nombre}</Text>
          </LabeledRow>
          <LabeledRow label={'Tipo'}>
            <Text>{programData?.tipo}</Text>
          </LabeledRow>
          <LabeledRow label={'Año de vigencia'}>
            <Text>{programData?.age}</Text>
          </LabeledRow>
          <LabeledRow label={'Prestación'}>
            <Text>{programData?.prestacion}</Text>
          </LabeledRow>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography className={classes.heading}>Presupuesto</Typography>
          <LabeledRow label={'Cupos'}>
            <Text>{programData?.cupos}</Text>
          </LabeledRow>
          <LabeledRow label={'Monto'}>
            <Text>${programData?.presupuesto}</Text>
          </LabeledRow>
        </Grid>
        <Grid item xs={12} md={2}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton>
              <EditIcon onClick={toggleOpenEdit} color="primary" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <EditProgram
        open={openEdit}
        onClose={toggleOpenEdit}
        data={programData}
        type="UPDATE"
        reFetch={fetchData}
      />
    </div>
  )
}

export default ProgramDetail
