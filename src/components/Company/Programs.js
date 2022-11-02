import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { DataTable } from '../Shared'
import { SearchInput, Button, ActionsTable } from '../UI'
import ConstructionsModal from './ConstructionsModal'
import ProgramsNewModal from './ProgramsNewModal'
import { useToggle } from '../../hooks'

const Programs = () => {
  const history = useHistory()
  const { open, toggleOpen } = useToggle()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })
  const handleRowClick = (row) => {
    history.push(`/scam/program/${row.id}/details`)
  }
  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }
  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={8} lg={6}>
          <SearchInput
            value={filters.search}
            placeholder="Buscar Programas"
            onChange={searchChange}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={() => {
                toggleOpenAdd()
              }}
            >
              Nuevo Programa
            </Button>
          </Box>
        </Grid>
      </Grid>
      <DataTable
        emptyMessage={
          filters.search
            ? `No se Encontraron resultados para : ${filters.search}`
            : 'Aun no hay Obras'
        }
        highlightOnHover
        pointerOnHover
        pagination
        onRowClicked={handleRowClick}
        paginationRowsPerPageOptions={[10, 20, 30, 40]}
        columns={[
          {
            name: 'Año',
            selector: (row) => row.year,
            sortable: true
          },
          {
            name: 'Nombre',
            selector: (row) => row.name
          },
          {
            name: 'Tipo',
            selector: (row) => row.type
          },
          {
            name: 'Presupuesto',
            selector: (row) => row.price
          },
          {
            name: 'Cupos',
            selector: (row) => row.cupos
          },
          {
            name: '',
            right: true,
            cell: (row) => <ActionsTable {...row} onDelete={() => {}} />
          }
        ]}
        data={[
          {
            id: 1,
            year: 2022,
            name: 'Mujer',
            type: 'Sociales',
            price: '1000 UF',
            cupos: '150'
          },
          {
            id: 2,
            year: 2021,
            name: 'Odontológico',
            type: 'OT',
            price: '3000 UF',
            cupos: '200'
          },
          {
            id: 3,
            year: 2020,
            name: 'Dental',
            type: '3x1',
            price: '200 UF',
            cupos: '58'
          }
        ]}
      />
      <ConstructionsModal open={open} onClose={toggleOpen} />
      <ProgramsNewModal open={openAdd} onClose={toggleOpenAdd} />
    </div>
  )
}
export default Programs
