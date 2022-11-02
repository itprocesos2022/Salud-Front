import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Box, Grid, Typography, Card, IconButton } from '@material-ui/core'
import { ArrowForward as ArrowIcon, Edit as EditIcon } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import { formatSearchWithRut } from '../../formatters'
import { useToggle } from '../../hooks'
import { DataTable } from '../Shared'
import { LabeledRow, Text, ActionsTable, TextField, Button } from '../UI'
import operativosActions from '../../state/actions/operativos'
import employeesActions from '../../state/actions/employees'
import CreateAtention from './Dialogs/CreateAtention'
import JobsDialog from './JobsDialog'
import ConfirmationDialog from './ConfirmationDialog'

const Details = () => {
  const dispatch = useDispatch()
  const [operativo, setOperativo] = useState()
  const { idVisit } = useParams()
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  const { open: openJobs, toggleOpen: toggleOpenJobs } = useToggle()
  const { open: openConfirmation, toggleOpen: toggleOpenConfirmation } =
    useToggle()
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: '',
    state: ''
  })
  const { list: listEmployees, totalDocs } = useSelector(
    (state) => state.employees
  )
  const [cargaOperativo, setCargaOperativo] = useState(true)
  const fetchDetail = () => {
    dispatch(operativosActions.getOperativosTerrenoDetails(idVisit)).then(
      (data) => {
        console.log(data.operativosTerrenos)
        setOperativo(data.operativosTerrenos)
        setCargaOperativo(false)
      }
    )
  }
  const confirmationButton = (
    <Button onClick={() => toggleOpenConfirmation()}>Validar Datos</Button>
  )
  useEffect(() => {
    if (cargaOperativo) {
      fetchDetail()
    }
  }, [cargaOperativo])

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      skip: 0,
      search: formatSearchWithRut(e.target.value)
    })
  }

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

  const searchButton = () => {
    fetchEmployees()
  }
  useEffect(() => {
    if (filters.search.trim() !== '') {
      fetchEmployees()
    }
  }, [filters.search])
  return (
    <Card>
      <Box width="100%">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml={2}
          mt={2}
        >
          <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Detalle de Visita
          </Typography>
        </Box>
        <Box p={2} ml={2}>
          <Grid container>
            <Grid item xs={6} md={6}>
              <LabeledRow label="Empresa:">
                <Text> {operativo?.company_name} </Text>
              </LabeledRow>
              <LabeledRow label="Obra:">
                <Text> {operativo?.construction_name} </Text>
              </LabeledRow>
              <LabeledRow label="Direccion:">
                <Text> {operativo?.construction_address} </Text>
              </LabeledRow>
            </Grid>
            <Grid item xs={6} md={6}>
              <LabeledRow label="Prestador:">
                <Text>{operativo?.prestador_name}</Text>
              </LabeledRow>
              <LabeledRow label="Equipo:">
                <Text>{operativo?.team_name}</Text>
              </LabeledRow>
              <LabeledRow label="Integrantes del Equipo:">
                <Text>
                  {operativo?.equipo?.integrantes[0]?.nombres}{' '}
                  {operativo?.equipo?.integrantes[0]?.apellidos}
                </Text>
              </LabeledRow>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <Box p={1} ml={2} mr={2}>
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '10px'
            }}
          >
            Trabajadores atendidos
          </Typography>
          <DataTable
            bordered
            background
            emptyMessage="No hay trabajadores atendidos"
            columns={[
              {
                name: 'Run',
                selector: (row) => row.run,
                sortable: true,
                width: '150px'
              },
              {
                name: 'Nombres y apellidos',
                selector: (row) => row.fullName,
                width: '250px'
              },
              {
                name: '',
                right: true,
                button: true,
                cell: () => (
                  <ActionsTable
                    moreOptions={[
                      {
                        icon: <ArrowIcon />,
                        onClick: () => {}
                      }
                    ]}
                  />
                )
              }
            ]}
            data
          />
        </Box>
      </Box>
      <Box marginTop="20px" p={1} ml={2} mr={2}>
        <Box mb={2}>
          <Typography
            style={{
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: 'bold'
            }}
          >
            Atender trabajador
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                placeholder="BUSCAR POR: RUT, NOMBRES"
                onChange={handleSearchChange}
              />
            </Grid>
            <IconButton onClick={searchButton}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Box>
        <DataTable
          progressPending={loading}
          bordered
          emptyMessage
          columns={[
            {
              name: 'Run',
              selector: (row) => row.run,
              sortable: true
            },
            {
              name: 'Nombres y Apellidos',
              selector: (row) => row.names,
              sortable: true
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <Box>
                  <Button
                    disabled={loading}
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      toggleOpenJobs()
                      setSelectedUser(row)
                    }}
                  >
                    Actualizar
                  </Button>
                  {/*  <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        toggleOpen()
                        setSelectedUser(row)
                      }}
                    >
                      Atender
                    </Button> */}
                </Box>
              )
            }
          ]}
          data={tableData}
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          paginationPerPage={filters.limit}
          paginationServer={true}
          onChangeRowsPerPage={(limit) => {
            setFilters({ ...filters, limit })
          }}
          onChangePage={pageChange}
          paginationTotalRows={totalDocs}
        />
        {selectedUser && openCreate && operativo && (
          <CreateAtention
            open={openCreate}
            onClose={toggleOpenCreate}
            setCargaOperativo={setCargaOperativo}
            selectedUser={selectedUser}
            idPrestacion={operativo?.prestacione?.id}
          />
        )}
      </Box>

      {selectedUser && openJobs && (
        <JobsDialog
          open={openJobs}
          onClose={toggleOpenJobs}
          employeeId={selectedUser.id}
          employeeNames={`${selectedUser.names} ${selectedUser.paternal_surname}`}
          employeeRun={selectedUser.run}
          customButon={confirmationButton}
        />
      )}

      {selectedUser && openConfirmation && (
        <ConfirmationDialog
          open={openConfirmation}
          onClose={toggleOpenConfirmation}
          onCloseJobs={toggleOpenJobs}
          onCloseAssistence={toggleOpenCreate}
          employeeId={selectedUser.id}
          employeeNames={`${selectedUser.names} ${selectedUser.paternal_surname}`}
          employeeRun={selectedUser.run}
        />
      )}
    </Card>
  )
}

export default Details
