import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import { DataTable } from '../Shared'
import { ActionsTable, Button } from '../UI'
import { useToggle } from '../../hooks'
import TypeDialog from './TypeDialog'
import ConfirmClose from './Dialogs/ConfirmClose'
import prestacionesActions from '../../state/actions/prestaciones'

const Prestaciontype = () => {
  const dispatch = useDispatch()
  const { idPrestacion } = useParams()
  const [update, setUpdate] = useState(false)
  const [selectedType, setSelectedType] = useState()
  const { type } = useSelector((state) => state.prestaciones)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openClose, toggleOpen: toggleOpenClose } = useToggle()

  useEffect(() => {
    dispatch(prestacionesActions.getAsociationTypePrestacion(idPrestacion))
  }, [])

  useEffect(() => {
    if (update) {
      setUpdate(false)
      dispatch(prestacionesActions.getAsociationTypePrestacion(idPrestacion))
    }
  }, [update])

  const deleteType = () => {
    dispatch(
      prestacionesActions.deleteAsociationTypePrestacion(idPrestacion, {
        idBeneficiario: selectedType.id
      })
    )
      .then(() => setUpdate(true))
      .catch((ex) => ex)
  }
  return (
    <div>
      <Box>
        <Box display="flex" justifyContent="left">
          <Button onClick={toggleOpenAdd}>Agregar tipo</Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <DataTable
            highlightOnHover
            pointerOnHover
            onRowClicked={() => {}}
            columns={[
              {
                name: '',
                selector: (row) => row.nombre_beneficiario,
                sortable: true,
                center: true
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <div onClick={() => setSelectedType(row)}>
                    <ActionsTable {...row} onDelete={toggleOpenClose} />
                  </div>
                )
              }
            ]}
            data={type}
          />
        </Box>
      </Box>
      <ConfirmClose
        open={openClose}
        onClose={toggleOpenClose}
        submitFunction={deleteType}
      />
      {openAdd && (
        <TypeDialog
          open={openAdd}
          onClose={toggleOpenAdd}
          setUpdate={setUpdate}
        />
      )}
    </div>
  )
}

export default Prestaciontype
