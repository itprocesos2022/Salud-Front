import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, useHistory } from 'react-router-dom'
import { Grid, Box, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {
  ActionsTable,
  SearchInput,
  Wrapper,
  PageHeading,
  Button
} from '../../UI'
import CreateCompany from '../Create'
import { DataTable } from '../../Shared'
import StatusChip from '../../UI/StatusChip'
import { formatSearchWithRut } from '../../../formatters'
import companiesActions from '../../../state/actions/companies'

const List = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: '',
    state: ''
  })
  const {
    list,
    showCreateModal,
    total: totalDocs
  } = useSelector((state) => state.companies)

  const toggleCreateModal = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }
  const handleRowClick = (row) => {
    history.push(`/scam/company/${row.id}/details`)
  }
  const addButtonClick = () => {
    dispatch(companiesActions.toggleCreateModal(showCreateModal))
  }
  const onSearchChange = (e) => {
    const { value } = e.target
    setFilters({
      ...filters,
      search: formatSearchWithRut(value.toString()),
      page: 1
    })
  }
  const changePage = (page) => {
    setFilters({ ...filters, page })
    setLoading(true)
    dispatch(
      companiesActions.getCompanies({
        ...filters,
        page
      })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const fetchCompanies = () => {
    setLoading(true)
    dispatch(companiesActions.getCompanies(filters))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const searchButton = () => {
    fetchCompanies()
  }
  useEffect(() => {
    fetchCompanies()
  }, [])

  return (
    <Box>
      <Wrapper>
        <Box p={2} display="flex" justifyContent="center">
          <PageHeading>Empresas</PageHeading>
        </Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8} md={9} lg={10}>
            <SearchInput
              value={filters.search}
              onChange={onSearchChange}
              placeholder="Buscar por: razón social, rut"
            >
              <IconButton onClick={searchButton}>
                <SearchIcon color="primary" fontSize="large" />
              </IconButton>
            </SearchInput>
          </Grid>
          <Grid item xs={4} md={3} lg={2}>
            <Box display="flex" justifyContent="center">
              <Button onClick={addButtonClick}>Nueva empresa</Button>
            </Box>
          </Grid>
        </Grid>
        <DataTable
          emptyMessage={
            filters.search
              ? `No se encontraron resultados para: ${filters.search}`
              : 'Aún no se registraron empresas'
          }
          highlightOnHover
          pointerOnHover
          progressPending={loading}
          columns={[
            {
              name: 'Razón social',
              selector: (row) => row.business_name,
              sortable: true
            },
            {
              name: 'Rut',
              selector: (row) => row.rut,
              sortable: true
            },
            {
              name: 'Correo',
              selector: (row) => row.email,
              hide: 'md'
            },
            {
              name: 'Estado',
              selector: (row) => row.state,
              hide: 'md',
              center: true,
              cell: (row) => (
                <StatusChip
                  label={row.state === 'CREATED' ? 'Activo' : 'Eliminado'}
                  error={row.state !== 'CREATED'}
                  success={row.state === 'CREATED'}
                />
              )
            },
            {
              name: 'Dirección',
              selector: (row) => row.address,
              hide: 'md'
            },
            {
              center: true,
              hide: 'lg',
              cell: (row) => <ActionsTable onView={() => handleRowClick(row)} />
            }
          ]}
          data={list}
          onRowClicked={handleRowClick}
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationPerPage={filters.size}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, size: limit })
          }}
          onChangePage={changePage}
          paginationTotalRows={totalDocs}
        />
      </Wrapper>

      <CreateCompany
        open={showCreateModal}
        onClose={toggleCreateModal}
        successFunction={fetchCompanies}
      />
    </Box>
  )
}

export default withRouter(List)
