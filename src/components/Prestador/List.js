import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'
import { PageHeading, SearchInput, Wrapper, ActionsTable } from '../UI'
import { useToggle } from '../../hooks'
import DialogPrestadores from './DialogPrestadores'
import { DataTable } from '../Shared'
import DeletePrestador from './Dialogs/DeletePrestador'
import prestadoresActions from '../../state/actions/prestadores'

const PrestadoresList = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [deletePrestador, setDeletePrestador] = useState()
  const [loading, setLoading] = useState(false)
  const { list, updateList } = useSelector((state) => state.prestadores)
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handleRowClick = (row) => {
    history.push(`/scam/prestador/${row.id}/details`)
  }
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  useEffect(() => {
    if (updateList) {
      dispatch(prestadoresActions.getPrestadores())
      dispatch(prestadoresActions.updatePrestadores(false))
    }
  }, [updateList])

  const fetchPrestadores = () => {
    setLoading(true)
    dispatch(prestadoresActions.getPrestadores(filters))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const searchButton = () => {
    fetchPrestadores()
  }
  useEffect(() => {
    fetchPrestadores()
  }, [])

  return (
    <div>
      <Wrapper>
        <Box p={2} display="flex" justifyContent="center">
          <PageHeading>Prestadores</PageHeading>
        </Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8} md={9} lg={10}>
            <SearchInput
              onChange={searchChange}
              placeholder="Buscar Prestador"
              value={filters.search}
            >
              <IconButton onClick={searchButton}>
                <SearchIcon color="primary" fontSize="large" />
              </IconButton>
            </SearchInput>
          </Grid>
          <Grid item xs={4} md={3} lg={2}>
            <Box display="flex" justifyContent="center">
              <IconButton onClick={toggleOpenAdd}>
                <AddIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <DataTable
          emptyMessage={
            filters.search
              ? `No se Encontraron resultados para : ${filters.search}`
              : 'Aun no hay Prestadores'
          }
          highlightOnHover
          pointerOnHover
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          onRowClicked={handleRowClick}
          progressPending={loading}
          columns={[
            {
              name: 'Nombre',
              selector: (row) => row.nombre_prestador,
              sortable: true,
              hide: 'md'
            },
            {
              name: 'Rut',
              selector: (row) => row.prestador_rut,
              sortable: true,
              hide: 'md'
            },
            {
              name: 'Dirección',
              selector: (row) => row.address,
              sortable: true,
              hide: 'lg'
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  onDelete={() => {
                    toggleOpenDelete()
                    setDeletePrestador(row.id)
                  }}
                />
              )
            }
          ]}
          data={list?.rows}
        />
      </Wrapper>
      <DeletePrestador
        open={openDelete}
        onClose={toggleOpenDelete}
        deletePrestador={deletePrestador}
        updateList={updateList}
      />
      <DialogPrestadores open={openAdd} onClose={toggleOpenAdd} />
    </div>
  )
}

export default PrestadoresList
