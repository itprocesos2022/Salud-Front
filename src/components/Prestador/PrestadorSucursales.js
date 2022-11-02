import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { DataTable } from '../Shared'
import { SearchInput, Button, ActionsTable } from '../UI'
import { useToggle } from '../../hooks'
import NewSucursal from './Dialogs/NewSucursal'
import DeleteSucursal from './Dialogs/DeleteSucursal'
import sucursalActions from '../../state/actions/Sucursales'

const PrestadorSucursales = () => {
  const dispatch = useDispatch()
  const { idPrestador } = useParams()
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })
  const [editData, setEditData] = useState()

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [sucursalFiltrada, setSucursalFiltrada] = useState()
  const [sucursales, setSucursales] = useState()
  const [deleteSucursal, setDeleteSucursal] = useState()
  const [cargaSucursal, setCargaSucursal] = useState(true)

  const fetchSucursalByPrestador = () => {
    dispatch(sucursalActions.getSucursalesByPrestador(idPrestador)).then(
      (data) => {
        setSucursales(data)
        setCargaSucursal(false)
      }
    )
  }

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
    const filteredSucursal = sucursales.filter((sucursal) =>
      sucursal.nombre_sucursal
        .toUpperCase()
        .includes(e.target.value.toUpperCase())
    )
    setSucursalFiltrada(filteredSucursal)
  }

  useEffect(() => {
    if (cargaSucursal) {
      fetchSucursalByPrestador()
    }
  }, [cargaSucursal])

  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={8} lg={6}>
          <SearchInput
            value={filters.search}
            placeholder="Buscar Sucursal"
            onChange={searchChange}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={toggleOpenAdd}>Nueva Sucursal</Button>
          </Box>
        </Grid>
      </Grid>
      <DataTable
        emptyMessage={
          filters.search
            ? `No se Encontraron resultados para : ${filters.search}`
            : 'Aun no hay Sucursales'
        }
        highlightOnHover
        pointerOnHover
        pagination
        paginationRowsPerPageOptions={[10, 20, 30, 40]}
        progressPending={cargaSucursal}
        columns={[
          {
            name: 'Nombre',
            selector: (row) => row.nombre_sucursal,
            sortable: true
          },
          {
            name: 'Región',
            selector: (row) => row.region_sucursal,
            hide: 'md'
          },
          {
            name: 'Comuna',
            selector: (row) => row.comuna_sucursal,
            hide: 'md'
          },
          {
            name: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                onDelete={() => {
                  toggleOpenDelete()
                  setDeleteSucursal(row.id)
                }}
                onEdit={() => {
                  setEditData(row)
                  toggleOpenEdit()
                }}
              />
            )
          }
        ]}
        data={filters?.search ? sucursalFiltrada : sucursales}
      />
      {openAdd && (
        <NewSucursal
          open={openAdd}
          onClose={toggleOpenAdd}
          type={'CREATE'}
          setCargaSucursal={setCargaSucursal}
        />
      )}
      {openDelete && (
        <DeleteSucursal
          open={openDelete}
          onClose={toggleOpenDelete}
          deleteSucursal={deleteSucursal}
          setCargaSucursal={setCargaSucursal}
        />
      )}
      {openEdit && (
        <NewSucursal
          open={openEdit}
          onClose={toggleOpenEdit}
          type={'Edit'}
          data={editData}
          setCargaSucursal={setCargaSucursal}
        />
      )}
    </div>
  )
}

export default PrestadorSucursales
