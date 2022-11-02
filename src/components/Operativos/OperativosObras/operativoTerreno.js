import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { Box, Grid, IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import { Wrapper, PageHeading, SearchInput, Button } from '../../UI'
import { DataTable } from '../../Shared'
import operativosActions from '../../../state/actions/operativos'
import { useToggle } from '../../../hooks'
import ModalObras from '../modalObras/modalObras'
import { formatSearchWithRut } from '../../../formatters'

export default function OperativosObra() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [operativos, setOperativos] = useState()
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState()
  const { open: operativoObras, toggleOpen: toggleOperativoObras } = useToggle()
  const [updateObras, setUpdateObras] = useState(true)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    state: ''
  })

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: formatSearchWithRut(e.target.value)
    })
  }
  useEffect(() => {
    if (updateObras) {
      setLoading(true)
      dispatch(operativosActions.getOperativosTerreno(filters)).then((data) => {
        setOperativos(data.operativosTerrenos.rows)
        setTotal(data.operativosTerrenos.count)
        setLoading(false)
        setUpdateObras(false)
      })
    }
  }, [updateObras])

  useEffect(() => {
    setUpdateObras(true)
  }, [filters])

  const fetchOperativoTerreno = () => {
    setLoading(true)
    dispatch(operativosActions.getOperativosTerreno(filters)).then((data) => {
      console.log(data.operativosTerrenos.rows)
      setOperativos(data.operativosTerrenos.rows)
      setLoading(false)
      setUpdateObras(false)
    })
  }
  const searchButton = () => {
    fetchOperativoTerreno()
  }
  useEffect(() => {
    fetchOperativoTerreno()
  }, [])

  const handleRowClick = (row) => {
    history.push(`/scam/operativo/terreno/${row.id}/details`)
  }

  return (
    <Wrapper>
      <Grid spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <Box p={1} textAlign="center">
            <PageHeading variant="h6">Operativos en Terreno</PageHeading>
            <Box
              p={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={7} md={9} lg={10}>
                <SearchInput
                  placeholder="Buscar"
                  value={filters.search}
                  onChange={handleSearchChange}
                >
                  <IconButton onClick={searchButton}>
                    <SearchIcon color="primary" fontSize="large" />
                  </IconButton>
                </SearchInput>
              </Grid>
              <Grid item xs={5} md={3} lg={2}>
                <Button onClick={toggleOperativoObras}>
                  <Add /> Nuevo
                </Button>
              </Grid>
            </Box>
            <DataTable
              highlightOnHover
              pointerOnHover
              pagination
              paginationServer={true}
              onChangePage={(page) => setFilters({ ...filters, page })}
              onChangeRowsPerPage={(limit) => {
                setFilters({ ...filters, limit })
              }}
              paginationTotalRows={total}
              progressPending={loading}
              onRowClicked={handleRowClick}
              columns={[
                {
                  name: 'Empresa Nombre',
                  selector: (row) => row?.company_name
                },
                {
                  name: 'Programa',
                  selector: (row) => row?.programa_name
                },
                {
                  name: 'Fecha',
                  selector: (row) =>
                    row?.fecha && moment(row?.fecha).format('DD/MM/YYYY')
                },
                {
                  name: 'Estado',
                  selector: (row) => row?.estado_operativos_terreno?.value
                }
              ]}
              data={operativos}
            />
          </Box>
        </Grid>
      </Grid>
      {operativoObras && (
        <ModalObras
          open={operativoObras}
          onClose={toggleOperativoObras}
          setUpdateObras={setUpdateObras}
        />
      )}
    </Wrapper>
  )
}
