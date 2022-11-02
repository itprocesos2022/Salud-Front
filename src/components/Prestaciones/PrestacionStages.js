import { useState, useEffect } from 'react'
import { IconButton, Box, Grid } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import { SearchInput, ActionsTable } from '../UI'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import DialogNewStage from './DialogNewStage'
import DialogMedida from './DialogMedida'
import ModalDelete from './Dialogs/ModalDelete'
import prestacionesActions from '../../state/actions/prestaciones'

const PrestacionStages = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [data, setData] = useState({
    id: '',
    name: '',
    order: '',
    description: ''
  })
  const [idEtapa, setIdEtapa] = useState()
  const [etapasState, setEtapasState] = useState([])
  const [etapasVisible, setEtapasVisible] = useState([])
  const { idPrestacion } = useParams()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { etapas } = useSelector((state) => state.prestaciones)
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })
  const [newStage, setNewStage] = useState(false)
  const [updateEtapas, setUpdateEtapas] = useState(false)

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openMedida, toggleOpen: toggleOpenMedida } = useToggle()

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handleRowClick = (row) => {
    history.push(`/scam/prestacion/${idPrestacion}/stages/${row.id}`)
  }

  useEffect(() => {
    if (filters.search) {
      const newEtapas = etapasState.filter(
        (f) =>
          f.nombre_etapa.includes(filters.search) ||
          f.descripcion_etapa.includes(filters.search)
      )
      setEtapasVisible(newEtapas)
    }
  }, [filters])

  useEffect(() => {
    setEtapasState(etapas)
  }, [etapas])

  useEffect(() => {
    setUpdateEtapas(false)
    dispatch(prestacionesActions.getEtapas(idPrestacion))
  }, [updateEtapas])

  const submitFunction = (values) => {
    const ordenesDeEtapas = etapas.map((e) => e.orden_etapa.toString())
    if (ordenesDeEtapas.includes(values.order)) {
      alert('Ya, ya existe una etapa con ese orden')
      throw new Error()
    }
    dispatch(prestacionesActions.createEtapa(values))
      .then((etapa) =>
        dispatch(
          prestacionesActions.asociateEtapa(idPrestacion, etapa.id_etapa)
        ).then(() => {
          alert('Etapa creada con éxito')
          setUpdateEtapas(true)
        })
      )
      .catch((ex) => ex)
  }

  const updateEtapa = (values) =>
    dispatch(prestacionesActions.editEtapa(data.id, values))
      .then(() => setUpdateEtapas(true))
      .catch((ex) => ex)

  const deleteEtapa = () =>
    dispatch(prestacionesActions.deleteEtapa(idPrestacion, { idEtapa }))
      .then(() => {
        setUpdateEtapas(true)
      })
      .catch((ex) => alert(ex))

  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={8} lg={8}>
          <SearchInput
            value={filters.search}
            placeholder="Buscar Etapa"
            onChange={searchChange}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={4}>
          <Box display="flex" justifyContent="center">
            <IconButton
              onClick={() => {
                toggleOpenAdd()
                setNewStage(true)
              }}
            >
              <AddIcon color="primary" fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <DataTable
        emptyMessage={
          filters.search
            ? `No se Encontraron resultados para : ${filters.search}`
            : 'Aun no hay Etapas'
        }
        highlightOnHover
        pointerOnHover
        pagination
        paginationRowsPerPageOptions={[10, 20, 30, 40]}
        onRowClicked={handleRowClick}
        columns={[
          {
            name: 'Nombre',
            selector: (row) => row.nombre_etapa,
            left: true,
            sortable: true
          },
          {
            name: 'Descripción',
            selector: (row) => row.descripcion_etapa,
            hide: 'lg'
          },
          {
            name: 'Orden',
            selector: (row) => row.orden_etapa
          },
          {
            name: '',
            right: true,
            selector: (row) => (
              <div
                onClick={() => {
                  setIdEtapa(row.id)
                }}
              >
                <ActionsTable
                  onDelete={toggleOpenDelete}
                  onEdit={() => {
                    setData({
                      id: row.etapas_id,
                      name: row.nombre_etapa,
                      order: row.orden_etapa,
                      description: row.descripcion_etapa
                    })
                    toggleOpenEdit()
                  }}
                />
              </div>
            )
          }
        ]}
        data={filters.search ? etapasVisible : etapasState}
      />
      {openEdit && (
        <DialogNewStage
          open={openEdit}
          onClose={toggleOpenEdit}
          submitFunction={updateEtapa}
          successMessage="Etapa actualizada correctamente."
          type={'EDIT'}
          data={data}
        />
      )}
      <ModalDelete
        open={openDelete}
        onClose={toggleOpenDelete}
        submitFunction={deleteEtapa}
      />
      {newStage && (
        <DialogNewStage
          open={openAdd}
          onClose={toggleOpenAdd}
          submitFunction={submitFunction}
          successMessage="Etapa creada correctamente."
          type={'ADD'}
          data={data}
        />
      )}
      {openMedida && (
        <DialogMedida open={openMedida} onClose={toggleOpenMedida} />
      )}
    </div>
  )
}

export default PrestacionStages
