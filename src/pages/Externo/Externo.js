import { useHistory } from 'react-router-dom'
import { Box, Grid, IconButton } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search'
import { Button, PageHeading, SearchInput, Wrapper } from '../../components/UI'
import { DataTable } from '../../components/Shared'
import TeamsAdd from '../../components/Teams/TeamsAdd'
import TeamsDrawer from '../../components/Teams/TeamsDrawer'
import AddSucursal from '../../components/Teams/AddSucursal'
import { useToggle } from '../../hooks'
import { formatSearchWithRut } from '../../formatters'
import teamsActions from '../../state/actions/teams'
import prestacionesActions from '../../state/actions/prestaciones'
import sucursalesActions from '../../state/actions/Sucursales'

const Externo = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state) => state.auth)
  const { list } = useSelector((state) => state.teams)
  const { list: sucursalesList } = useSelector((state) => state.sucursales)
  const prestaciones = useSelector((state) => state.prestaciones.list.rows)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDetail, toggleOpen: toggleOpenDetail } = useToggle()
  const { open: openSucursal, toggleOpen: toggleOpenSucursal } = useToggle()
  const [fetchMate, setFetchMate] = useState(false)
  const [deleteTeam, setDeleteTeam] = useState(false)
  const [createTeam, setCreateTeam] = useState(false)
  const [teamId, setTeamId] = useState()
  const [oneTeam, setOneTeam] = useState()
  const [loading, setLoading] = useState(true)
  const [pageFilter, setPageFilters] = useState({
    page: 0,
    search: '',
    id_prestador: user.id
  })
  const [sucursalFilter, setSucursalFilter] = useState({
    page: 0,
    size: 10,
    search: ''
  })
  const handleRowClick = (row) => {
    history.push(`/scam/externo/sucursal/${row.id}/details`)
  }
  const onSearchChange = (e) => {
    setPageFilters({
      ...pageFilter,
      search: formatSearchWithRut(e.target.value)
    })
  }
  const onSearchSucursalChange = (e) => {
    setSucursalFilter({
      ...sucursalFilter,
      skip: 0,
      search: formatSearchWithRut(e.target.value)
    })
  }
  const fetchSucursales = () => {
    setLoading(true)
    dispatch(
      sucursalesActions.getSucursales({
        ...sucursalFilter,
        search: sucursalFilter.search.trim()
      })
    ).then(() => {
      setLoading(false)
    })
  }
  const fetchTeams = () => {
    setLoading(true)
    dispatch(teamsActions.getTeams(pageFilter)).then(() => {
      setLoading(false)
    })
  }
  const fetchPrestaciones = () => {
    setLoading(true)
    dispatch(prestacionesActions.getPrestaciones()).then(() => {
      setLoading(false)
    })
  }

  const fetchOneTeam = () => {
    dispatch(teamsActions.getOneTeam(teamId)).then((data) => {
      setOneTeam(data)
    })
  }
  const searchButton = () => {
    fetchTeams()
  }
  const searchSucursalButton = () => {
    fetchSucursales()
  }
  useEffect(() => {
    if (pageFilter) {
      searchButton()
      fetchTeams(false)
    }
  }, [pageFilter])

  useEffect(() => {
    if (teamId) {
      fetchOneTeam()
    }
  }, [teamId])

  useEffect(() => {
    if (fetchMate) {
      fetchOneTeam()
      setFetchMate(false)
    }
  }, [fetchMate])

  const fetchDeleteTeam = () => {
    dispatch(teamsActions.DeleteTeam(teamId)).then(() => {
      setDeleteTeam(true)
    })
  }
  const createTeams = (values) =>
    dispatch(teamsActions.createTeam(values)).then(() => {
      setCreateTeam(true)
    })
  useEffect(() => {
    if (deleteTeam) {
      fetchTeams()
      setDeleteTeam(false)
    }
  }, [deleteTeam])
  useEffect(() => {
    if (createTeam) {
      fetchTeams()
      setCreateTeam(false)
    }
  }, [createTeam])
  useEffect(() => {
    fetchTeams()
    fetchPrestaciones()
    fetchSucursales()
  }, [])
  return (
    <Wrapper>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <Box p={1} textAlign="center">
            <PageHeading variant="h6">Sucursales</PageHeading>
            <Box
              p={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={7} md={9} lg={10}>
                <SearchInput
                  value={sucursalFilter.search}
                  placeholder="Buscar Sucursal"
                  onChange={onSearchSucursalChange}
                >
                  <IconButton onClick={searchSucursalButton}>
                    <SearchIcon color="primary" fontSize="large" />
                  </IconButton>
                </SearchInput>
              </Grid>
              <Grid item xs={5} md={3} lg={2}>
                <Button onClick={toggleOpenSucursal}>Nueva Sucursal</Button>
              </Grid>
            </Box>
            <DataTable
              highlightOnHover
              pointerOnHover
              pagination
              onRowClicked={handleRowClick}
              progressPending={loading}
              columns={[
                {
                  name: 'Nombre',
                  selector: (row) => row.nombre_sucursal,
                  sortable: true
                },
                {
                  name: 'Region',
                  selector: (row) => row.region_sucursal
                },
                {
                  name: 'Comuna',
                  selector: (row) => row.comuna_sucursal
                }
              ]}
              data={sucursalesList.rows}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Box p={1} textAlign="center">
          <PageHeading variant="h6">Equipos</PageHeading>
          <Box p={1} display="flex" justifyContent="center" alignItems="center">
            <Grid item xs={7} md={9} lg={10}>
              <SearchInput
                value={pageFilter.search}
                onChange={onSearchChange}
                placeholder="Buscar Equipo"
              >
                <IconButton onClick={searchButton}>
                  <SearchIcon color="primary" fontSize="large" />
                </IconButton>
              </SearchInput>
            </Grid>
            <Grid item xs={5} md={3} lg={2}>
              <Button onClick={toggleOpenAdd}>Nuevo Equipo</Button>
            </Grid>
          </Box>
          <DataTable
            highlightOnHover
            pointerOnHover
            pagination
            onRowClicked={(row) => {
              toggleOpenDetail()
              setTeamId(row.id)
            }}
            progressPending={loading}
            columns={[
              {
                name: 'Nombre',
                selector: (row) => row.nombre,
                sortable: true
              },
              {
                name: 'Sucursal',
                selector: (row) => row.sucursal,
                sortable: true
              },
              {
                name: 'Región',
                selector: (row) => row.region
              },
              {
                name: 'Comuna',
                selector: (row) => row.comuna,
                hide: 'md'
              }
            ]}
            data={list}
          />
        </Box>
      </Grid>
      <TeamsAdd
        sucursales={sucursalesList.rows}
        open={openAdd}
        onClose={toggleOpenAdd}
        type="CREATE"
        prestacion={prestaciones}
        id_prestador={user.id}
        submitFunction={createTeams}
      />
      <TeamsDrawer
        open={openDetail}
        onClose={toggleOpenDetail}
        oneTeam={oneTeam}
        onDelete={fetchDeleteTeam}
        setFetchMate={setFetchMate}
        fetchTeams={fetchTeams}
        fetchOneTeam={fetchOneTeam}
      />
      <AddSucursal
        open={openSucursal}
        onClose={toggleOpenSucursal}
        type={'Create'}
        setCargaSucursal={setLoading}
      />
    </Wrapper>
  )
}
export default Externo
