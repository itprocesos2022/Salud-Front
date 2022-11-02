import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import { formatSearchWithRut } from '../../formatters'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import { SearchInput, StatusChip, Wrapper, PageHeading, Button } from '../UI'
import EmployeeForm from './EmployeeForm'
import employeesActions from '../../state/actions/employees'

const ListEmployees = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const { list: listEmployees, totalDocs } = useSelector(
    (state) => state.employees
  )
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: '',
    state: ''
  })
  const { open, toggleOpen } = useToggle()

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      skip: 0,
      search: formatSearchWithRut(e.target.value)
    })
  }

  const onRowClick = (row) => {
    history.push(`/scam/employee/${row.id}/info`)
  }

  const createEmployee = (values) =>
    dispatch(
      employeesActions.createEmployee({ ...values, created_by: user.id })
    )
  const afterCreateEmployee = (createData) => {
    history.push(`/employee/${createData.id}/info`)
  }
  const fetchEmployees = () => {
    setLoading(true)
    dispatch(
      employeesActions.getEmployees({
        ...filters,
        search: filters.search.trim()
      })
    )
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const searchButton = () => {
    fetchEmployees()
  }
  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    dispatch(employeesActions.getEmployeeNull())
  }, [])

  const pageChange = (page) => {
    setFilters({ ...filters, page })
    setLoading(true)
    dispatch(
      employeesActions.getEmployees({
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

  useEffect(() => {
    setTableData(
      listEmployees.map((item) => ({
        ...item,
        last_name: `${item.paternal_surname} ${
          item.maternal_surname || ''
        }`.trim()
      }))
    )
  }, [listEmployees])

  return (
    <Box>
      <Wrapper>
        <Box p={2} display="flex" justifyContent="center">
          <PageHeading>Trabajadores</PageHeading>
        </Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={8} lg={10}>
            <SearchInput
              value={filters.search}
              placeholder="Buscar por: Nombres, RUN"
              onChange={handleSearchChange}
            >
              <IconButton onClick={searchButton}>
                <SearchIcon color="primary" fontSize="large" />
              </IconButton>
            </SearchInput>
          </Grid>
          <Grid item xs={4} md={3} lg={2}>
            <Box display="flex" justifyContent="flex-end">
              <Button color="primary" onClick={toggleOpen}>
                Nuevo Trabajador
              </Button>
            </Box>
          </Grid>
        </Grid>
        <DataTable
          progressPending={loading}
          emptyMessage={
            filters.search
              ? `Buscando : ${filters.search}`
              : 'Para encontrar Trabajadores utilice el buscador'
          }
          highlightOnHover
          pointerOnHover
          columns={[
            {
              name: 'Run',
              selector: (row) => row.run,
              sortable: true
            },
            {
              name: 'Nombres',
              selector: (row) => row.names,
              sortable: true,
              hide: 'md'
            },
            {
              name: 'Apellidos',
              selector: (row) => row.last_name,
              sortable: true
            },
            {
              name: 'Estado',
              hide: 'md',
              cell: (row) => (
                <StatusChip
                  label={`${row.state === 'DELETED' ? 'Eliminado' : 'Activo'} `}
                  success={row.state === 'CREATED'}
                  error={row.state === 'DELETED'}
                />
              )
            }
          ]}
          data={tableData}
          pagination
          onRowClicked={onRowClick}
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationPerPage={filters.limit}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, limit })
          }}
          onChangePage={pageChange}
          paginationTotalRows={totalDocs}
        />
        <EmployeeForm
          open={open}
          onClose={toggleOpen}
          successMessage="Ficha de trabajador creado correctamente"
          submitFunction={createEmployee}
          successFunction={afterCreateEmployee}
        />
      </Wrapper>
    </Box>
  )
}

export default ListEmployees
