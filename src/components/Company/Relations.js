import { useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { DataTable } from '../Shared'
import { SearchInput, Button } from '../UI'
import RelationsModal from './RelationsModal'
import RelationNewModal from './RelationNewModal'
import { useToggle } from '../../hooks'

const Constructions = () => {
  const { open, toggleOpen } = useToggle()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }
  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={8} lg={6}>
          <SearchInput
            value={filters.search}
            placeholder="Buscar por razón social, rut"
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
              Nueva Empresa Relacionada
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
        onRowClicked={() => {
          toggleOpen()
        }}
        paginationRowsPerPageOptions={[10, 20, 30, 40]}
        columns={[
          {
            name: 'Razón Social',
            selector: (row) => row.business_name,
            sortable: true
          },
          {
            name: 'Rut',
            selector: (row) => row.rut,
            hide: 'md'
          },
          {
            name: 'Dirección',
            selector: (row) => row.address,
            hide: 'md'
          },
          {
            name: 'Tipo de Relación',
            selector: (row) => row.email,
            hide: 'md'
          }
        ]}
        data={[
          {
            id: 1,
            rut: '76020458-7	',
            business_name: 'EMPRESAS RED SALUD S.A.	',
            email: 'METROPOLITANA DE SANTIAGO	',
            address: 'Providencia',
            state: 'CREATED'
          },
          {
            id: 2,
            rut: '96942400-2	',
            business_name: 'MEGASALUD SPA	',
            email: 'METROPOLITANA DE SANTIAGO	',
            address: 'Santiago',
            state: 'CREATED'
          },
          {
            id: 3,
            rut: '76781389-9	',
            business_name: 'CLÍNICA SONRÍE SALUD	',
            email: 'METROPOLITANA DE SANTIAGO	',
            address: 'Santiago',
            state: 'CREATED'
          }
        ]}
      />
      <RelationsModal open={open} onClose={toggleOpen} />
      <RelationNewModal open={openAdd} onClose={toggleOpenAdd} />
    </div>
  )
}

export default Constructions
