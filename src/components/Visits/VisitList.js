import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { Box, Grid, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'
import { DataTable } from '../Shared'
import { Button, SearchInput, Wrapper } from '../UI'
import VisitStatusChip from './VisitStatusChip'
import operativosActions from '../../state/actions/operativos'

export default function VisitList() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [operativos, setOperativos] = useState([])
  const { user } = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    id: user.id
  })

  const fetchList = () => {
    setLoading(true)
    dispatch(operativosActions.getOperativosTerreno(filters)).then((data) => {
      console.log(data.operativosTerrenos.rows)
      setOperativos(data.operativosTerrenos.rows)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchList()
  }, [])
  const onRowClick = (row) => {
    history.push(`/scam/visit/${row.id}`)
  }
  const launchVisitsToClose = () => {
    history.push('/scam/visits-close')
  }
  const changePage = (page) => {
    setFilters({ ...filters, page })
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
                <Button onClick={launchVisitsToClose}>
                  Visitas por cerrar
                </Button>
                <Button>Revisar calendario</Button>
              </Box>
            </Grid>
          </Grid>
          <DataTable
            emptyMessage={
              filters.search
                ? `Buscando Visita : ${filters.search}`
                : 'Para encontrar Visitas utilice el buscador'
            }
            highlightOnHover
            progressPending={loading}
            pointerOnHover
            pagination
            paginationServer={true}
            onRowClicked={onRowClick}
            paginationRowsPerPageOptions={[10, 20, 30, 40]}
            paginationPerPage={filters.size}
            onChangeRowsPerPage={(limit) => {
              setFilters({ ...filters, size: limit })
            }}
            onChangePage={changePage}
            columns={[
              {
                name: 'Fecha',
                selector: (row) =>
                  row?.fecha && moment(row?.fecha).format('DD/MM/YYYY'),
                sortable: true
              },
              {
                name: 'Prestador',
                selector: (row) => row?.prestador_name
              },
              {
                name: 'Empresa',
                selector: (row) => row?.company_name
              },
              {
                name: 'Obra',
                selector: (row) => row?.construction_name,
                hide: 'md'
              },
              {
                name: 'Dirección',
                selector: (row) => row?.construction_address,
                hide: 'md'
              },
              {
                name: 'Estado',
                selector: (row) => (
                  <Box>
                    <VisitStatusChip visit={row} />
                  </Box>
                )
              }
            ]}
            data={operativos}
          />
        </Wrapper>
      </Box>
    </Box>
  )
}
