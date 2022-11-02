import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { DataTable } from '../Shared'
import { SearchInput, Button } from '../UI'
import { useToggle } from '../../hooks'
import DialogPrestacion from '../Prestaciones/DialogPrestacion'

const CompanyPrestaciones = () => {
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const history = useHistory()
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }
  const handleRowClick = (row) => {
    history.push(`/prestacion/${row.id}/details`)
  }
  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={8} lg={6}>
          <SearchInput
            value={filters.search}
            placeholder="Buscar Prestaciones"
            onChange={searchChange}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={toggleOpenAdd}>Nueva Prestación</Button>
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
            selector: (row) => row.prestaciones,
            sortable: true
          },
          {
            name: 'Descripcción',
            selector: (row) => row.description
          },
          {
            name: 'Etapas',
            selector: (row) => row.stages
          }
        ]}
        data={[
          {
            id: 1,
            prestaciones: 'Oftalmológico',
            description: 'Programa Oftalmológico',
            stages: '1'
          },
          {
            id: 2,
            prestaciones: 'Dental',
            description: 'Programa Dental',
            stages: '3'
          },
          {
            id: 3,
            prestaciones: 'Preventivo',
            description: 'Programa Preventivo',
            stages: '3'
          }
        ]}
      />
      <DialogPrestacion open={openAdd} onClose={toggleOpenAdd} />
    </div>
  )
}

export default CompanyPrestaciones
