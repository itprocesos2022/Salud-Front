import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import { formatSearchWithRut } from '../../formatters'
import { DataTable } from '../Shared'
import { SearchInput } from '../UI'
import { useToggle } from '../../hooks'
import AsignationModal from './AsignationModal'

const ProgramAsignation = () => {
  const { open, toggleOpen } = useToggle()
  const [filters, setFilters] = useState({
    page: 1,
    skip: 0,
    size: 10,
    search: ''
  })

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      skip: 0,
      search: formatSearchWithRut(e.target.value)
    })
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            p={1}
            border={1}
            borderBottom={0}
            textAlign="center"
            borderColor="grey.500"
          >
            <Typography variant="h6">Prestadores</Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={1}
            >
              <Grid item xs={8} md={9} lg={10}>
                <SearchInput
                  value={filters.search}
                  placeholder="Buscar Prestador"
                  onChange={handleSearchChange}
                />
              </Grid>
              <Grid xs={4} md={3} lg={2}>
                <IconButton onClick={toggleOpen}>
                  <AddIcon color="primary" fontSize="large" />
                </IconButton>
              </Grid>
            </Box>
            <DataTable
              emptyMessage={
                filters.search
                  ? `Buscando : ${filters.search}`
                  : 'Aun no se han hecho Asignaciones'
              }
              highlightOnHover
              pointerOnHover
              columns={[
                {
                  name: '',
                  selector: (row) => row.name,
                  center: true,
                  sortable: true
                }
              ]}
              data={[
                {
                  id: 1,
                  name: 'Red Salud SA.'
                },
                {
                  id: 2,
                  name: 'Megasalud SPA.'
                },
                {
                  id: 3,
                  name: 'Clínica Sonríe Salud'
                }
              ]}
              pagination
              paginationRowsPerPageOptions={[10, 20, 30, 40]}
            />
          </Box>
        </Grid>
      </Grid>
      <AsignationModal open={open} onClose={toggleOpen} />
    </div>
  )
}

export default ProgramAsignation
