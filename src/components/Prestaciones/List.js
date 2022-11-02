import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid, IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search'
import {
  SearchInput,
  Wrapper,
  ActionsTable,
  PageHeading,
  StatusChip,
  Button
} from '../UI'
import { useToggle } from '../../hooks'
import prestacionesActions from '../../state/actions/prestaciones'
import DialogPrestacion from './DialogPrestacion'
import DialogClone from './DialogClone'
import { DataTable } from '../Shared'
import DeletePrestacion from './Dialogs/DeletePrestacion'

const PrestacionesList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })
  const [data, setData] = useState()
  const [updatePrestaciones, setUpdatePrestaciones] = useState(false)
  const { list } = useSelector((state) => state.prestaciones)
  const [listToShow, setListToShow] = useState([])

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const buttonSearch = () => {
    const resultList = list?.rows?.filter(
      (f) =>
        f?.nombre_prestacion.includes(filters.search) ||
        f?.descripcion_prestacion.includes(filters.search)
    )
    setListToShow(resultList)
  }
  useEffect(() => {
    buttonSearch()
  }, [])

  const handleRowClick = (row) => {
    dispatch(prestacionesActions.setPrestacion(row.id))
    history.push(`/scam/prestacion/${row.id}/details`)
  }

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openClone, toggleOpen: toggleOpenClone } = useToggle()

  useEffect(() => {
    dispatch(prestacionesActions.getPrestaciones())
    dispatch(prestacionesActions.emptyPrestacion())
    dispatch(prestacionesActions.getEmptyEtapas())
    setUpdatePrestaciones(false)
  }, [updatePrestaciones])

  useEffect(() => {
    dispatch(prestacionesActions.getPrestaciones())
  }, [])

  const submitFunction = (body) => {
    setUpdatePrestaciones(true)
    return dispatch(prestacionesActions.createPrestaciones(body))
  }

  const deleteFunction = (body, id) => {
    setUpdatePrestaciones(true)
    return dispatch(prestacionesActions.deletePrestaciones(body, id))
  }

  return (
    <div>
      <Wrapper>
        <Box p={2} display="flex" justifyContent="center">
          <PageHeading>Prestaciones</PageHeading>
        </Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8} md={9} lg={10}>
            <SearchInput
              value={filters.search}
              placeholder="Buscar Prestación"
              onChange={searchChange}
            >
              <IconButton onClick={buttonSearch}>
                <SearchIcon color="primary" fontSize="large" />
              </IconButton>
            </SearchInput>
          </Grid>
          <Grid item xs={4} md={3} lg={2}>
            <Box display="flex" justifyContent="center">
              <Button onClick={toggleOpenAdd}>Nueva prestación</Button>
            </Box>
          </Grid>
        </Grid>
        <DataTable
          emptyMessage={
            filters.search
              ? `No se Encontraron resultados para : ${filters.search}`
              : 'Aun no hay Prestaciones'
          }
          highlightOnHover
          pointerOnHover
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          onRowClicked={handleRowClick}
          columns={[
            {
              name: 'Nombre',
              selector: (row) => row.nombre_prestacion,
              sortable: true
            },
            {
              name: 'Descripción',
              selector: (row) => row.descripcion_prestacion,
              hide: 'lg'
            },
            {
              name: 'Estado',
              hide: 'md',
              left: true,
              cell: (row) => (
                <StatusChip
                  label={
                    row.estado_prestacion === true ? 'Activo' : 'Eliminado'
                  }
                  success={row?.estado_prestacion === true}
                />
              )
            },
            {
              name: '',
              center: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  onClone={() => {
                    toggleOpenClone()
                    setData(row)
                  }}
                  onDelete={() => {
                    toggleOpenDelete()
                    setData(row)
                  }}
                />
              )
            }
          ]}
          data={filters?.search ? listToShow : list?.rows}
        />
      </Wrapper>
      <DialogPrestacion
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={submitFunction}
        type={'ADD'}
        successMessage={'Prestación creada correctamente'}
      />
      {openClone && (
        <DialogClone
          data={data}
          open={openClone}
          onClose={toggleOpenClone}
          successMessage={'Prestación clonada correctamente'}
          submitFunction={submitFunction}
        />
      )}
      <DeletePrestacion
        data={data}
        open={openDelete}
        onClose={toggleOpenDelete}
        deleteFunction={deleteFunction}
      />
    </div>
  )
}

export default PrestacionesList
