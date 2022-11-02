import { Box, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DataTable } from '../Shared'
import { Button, SearchInput, Wrapper } from '../UI'

export default function VisitsToClose() {
  const history = useHistory()
  const [filters, setFilters] = useState({
    page: 1,
    size: 30,
    search: ''
  })

  const redirectToVisits = () => {
    history.push('/scam/visits')
  }

  return (
    <Box>
      <Box marginTop="10px">
        <Wrapper>
          <Grid container>
            <Grid item xs={12} md={5}>
              <SearchInput
                value={filters.search}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value })
                }}
                placeholder={'Buscar por: Empresa, Obra, Fecha'}
              >
                <IconButton>
                  <SearchIcon color="primary" fontSize="large" />
                </IconButton>
              </SearchInput>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={redirectToVisits}>Ver visitas</Button>
              </Box>
            </Grid>
          </Grid>
          <DataTable
            emptyMessage={
              filters.search
                ? `No se encontraron resultados para: ${filters.search}`
                : `No hay visitas por cerrar`
            }
            highlightOnHover
            pointerOnHover
            pagination
            paginationServer={true}
            paginationRowsPerPageOptions={[10, 20, 30, 40]}
            paginationPerPage={filters.size}
            onChangeRowsPerPage={(limit) => {
              setFilters({ ...filters, size: limit })
            }}
            onChangePage={(page) => {
              setFilters({ ...filters, page })
            }}
          />
        </Wrapper>
      </Box>
    </Box>
  )
}
