import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import moment from 'moment'
import { DataTable } from '../Shared'
import { SearchInput, Button, ActionsTable, StatusChip } from '../UI'
import { useToggle } from '../../hooks'
import NewPrestacion from './Dialogs/NewPrestacion'
import DeletePrestacion from './Dialogs/DeletePrestacion'
import prestacionesActions from '../../state/actions/prestadores'

const PrestadorPrestaciones = () => {
  const dispatch = useDispatch()
  const { idPrestador } = useParams()
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [prestaciones, setPrestaciones] = useState()
  const [cargaPrestaciones, setCargaPrestaciones] = useState(true)
  const [deletePrestacion, setDeletePrestacion] = useState()
  const fetchPrestacion = () => {
    dispatch(prestacionesActions.getPrestacionByPrestador(idPrestador)).then(
      (data) => {
        console.log(data.prestador)
        if (data.prestador.rows[0] !== undefined) {
          setPrestaciones(data.prestador.rows[0].prestaciones)
        }

        setCargaPrestaciones(false)
      }
    )
  }
  useEffect(() => {
    if (cargaPrestaciones) {
      fetchPrestacion()
      console.log(prestaciones)
    }
  }, [cargaPrestaciones])

  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={8} lg={6}>
          <SearchInput
            value={filters.search}
            placeholder="Buscar Prestación"
            onChange={searchChange}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={toggleOpenAdd}>Asignar Prestación</Button>
          </Box>
        </Grid>
      </Grid>
      {prestaciones && (
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
          progressPending={cargaPrestaciones}
          columns={[
            {
              name: 'Nombre',
              selector: (row) => row.nombre_prestacion,
              sortable: true
            },
            {
              name: 'Descripción',
              selector: (row) => row.descripcion_prestacion
            },
            {
              name: 'Fecha Creación',
              center: true,
              selector: (row) => moment(row.fecha_creacion).format('DD-MM-YYYY')
            },
            {
              name: 'Estado',
              center: true,
              cell: (row) => (
                <StatusChip
                  label={`${
                    row.estado_prestacion === false ? 'Eliminado' : 'Activo'
                  } `}
                  success={row.estado_prestacion === true}
                  error={row.state === false}
                />
              )
            },
            {
              name: 'Precio Metropolitana',
              center: true,
              selector: (row) =>
                `$${row.prestadores_prestaciones.metropolitana || 0}`
            },
            {
              name: 'Region',
              center: true,
              selector: (row) => `$${row.prestadores_prestaciones.region || 0}`
            },
            {
              name: 'Region Extrema',
              center: true,
              selector: (row) =>
                `$${row.prestadores_prestaciones.regionExtrema || 0}`
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  disabledDelete={!row.estado_prestacion}
                  {...row}
                  onDelete={() => {
                    toggleOpenDelete()
                    setDeletePrestacion(row.id)
                  }}
                />
              )
            }
          ]}
          data={prestaciones}
        />
      )}
      {openDelete && (
        <DeletePrestacion
          open={openDelete}
          onClose={toggleOpenDelete}
          deletePrestacion={deletePrestacion}
          setCargaPrestaciones={setCargaPrestaciones}
        />
      )}
      {openAdd && (
        <NewPrestacion
          open={openAdd}
          onClose={toggleOpenAdd}
          setCargaPrestaciones={setCargaPrestaciones}
        />
      )}
    </div>
  )
}

export default PrestadorPrestaciones
