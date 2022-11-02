import { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useSuccess, useToggle } from '../../../hooks'
import { ConfirmDelete, DataTable } from '../../Shared'
import { Wrapper, Button, ActionsTable } from '../../UI'
import CreateMedida from './CreateMedida'
import medidasActions from '../../../state/actions/medidas'

const Medidas = () => {
  const dispatch = useDispatch()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [loading, setLoading] = useState(false)
  const [medidas, setMedidas] = useState([])
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const [currentMedida, setCurrentMedida] = useState(null)

  const getMedidas = () => {
    setLoading(true)
    dispatch(medidasActions.getMedidas()).then((data) => {
      setLoading(false)
      setMedidas(data.medida.rows)
    })
  }
  const createMedida = (values) => {
    const parsedValues = {
      ...values,
      valor_minimo: parseFloat(values.valor_minimo),
      valor_maximo: parseFloat(values.valor_maximo)
    }
    dispatch(medidasActions.createMedida(parsedValues)).then(() =>
      toggleOpenAdd()
    )
  }

  const editMedida = (values) => {
    const parsedValues = {
      ...values,
      valor_minimo: parseFloat(values.valor_minimo),
      valor_maximo: parseFloat(values.valor_maximo)
    }
    dispatch(medidasActions.updateMedida(currentMedida.id, parsedValues)).then(
      () => toggleOpenUpdate()
    )
  }

  const deleteMedida = (id) => {
    setDeleting(true)
    dispatch(medidasActions.deleteMedida(id))
      .then(() => {
        setDeleting(false)
        toggleOpenDelete()
        changeSuccess(false)
        setCurrentMedida(null)
        getMedidas()
      })
      .catch(() => {
        setDeleting(false)
        changeSuccess(false)
      })
  }
  useEffect(() => {
    getMedidas()
  }, [])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Lista de medidas</Typography>
          <Button onClick={toggleOpenAdd}>Nueva medida</Button>
        </Box>
        <Box>
          <DataTable
            progressPending={loading}
            columns={[
              {
                name: 'Tipo de medida',
                selector: (row) => row.TipoMedida.name,
                sortable: true
              },
              {
                name: 'Unidad de medida ',
                selector: (row) => row.UnidadMedida.name
              },
              {
                name: 'Valor mínimo',
                selector: (row) => row.valor_minimo || '',
                center: true
              },
              {
                name: 'Valor máximo',
                selector: (row) => row.valor_maximo || '',
                center: true
              },
              {
                name: '',
                selector: '',
                right: true,
                cell: (row) => (
                  <ActionsTable
                    {...row}
                    onEdit={() => {
                      setCurrentMedida(row)
                      toggleOpenUpdate()
                    }}
                    onDelete={() => {
                      setCurrentMedida(row)
                      toggleOpenDelete()
                    }}
                  />
                )
              }
            ]}
            data={medidas}
          />
        </Box>
      </Box>
      <CreateMedida
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createMedida}
        successFunction={getMedidas}
      />
      {currentMedida && openUpdate && (
        <CreateMedida
          open={openUpdate}
          type="UPDATE"
          data={currentMedida}
          onClose={toggleOpenUpdate}
          submitFunction={editMedida}
          successFunction={getMedidas}
        />
      )}
      {currentMedida && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={deleting}
          success={success}
          onConfirm={() => deleteMedida(currentMedida.id)}
          message={
            <span>
              ¿Estás seguro de eliminar esta medida:
              <strong> {currentMedida.TipoMedida.name}</strong>?
            </span>
          }
        />
      )}
    </Wrapper>
  )
}

export default Medidas
