import { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Button, LabeledRow } from '../UI'
import { useToggle } from '../../hooks'
import EditDescription from './Dialogs/EditDescription'
import prestacionesActions from '../../state/actions/prestaciones'

const PrestacionDetail = () => {
  const dispatch = useDispatch()
  const { prestacion } = useSelector((state) => state.prestaciones)
  const [updateDetail, setUpdateDetail] = useState(false)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const updateDescription = (description) =>
    dispatch(prestacionesActions.editPrestacion(description, prestacion.id))
      .then(() => setUpdateDetail(true))
      .catch((ex) => ex)

  useEffect(() => {
    setUpdateDetail(false)
    if (prestacion.id) {
      dispatch(prestacionesActions.setPrestacion(prestacion.id))
    }
  }, [updateDetail])

  return (
    <div>
      <Grid container>
        <Grid item xs={10} md={10} lg={10}>
          <LabeledRow label="Tipo:">{prestacion?.type}</LabeledRow>
        </Grid>
        <Grid item xs={2} md={2} lg={2}>
          <Button onClick={toggleOpenEdit}>Editar descripción</Button>
        </Grid>
      </Grid>
      <Grid container item xs={8} md={8} lg={8}>
        <Typography variant="h6">
          {prestacion?.descripcion_prestacion}
        </Typography>
      </Grid>
      {openEdit && (
        <EditDescription
          open={openEdit}
          onClose={toggleOpenEdit}
          prestacion={prestacion}
          updateDescription={updateDescription}
          successMessage="Descripción editada correctamente."
        />
      )}
    </div>
  )
}

export default PrestacionDetail
