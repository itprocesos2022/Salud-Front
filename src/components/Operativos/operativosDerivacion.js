import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid, IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import { Wrapper, PageHeading, SearchInput, Button } from '../UI'
import { DataTable } from '../Shared'
import { useToggle } from '../../hooks'
import operativosActions from '../../state/actions/operativos'
import ModalDerivacion from './modalDerivacion/modalDerivacion'
import { formatSearchWithRut } from '../../formatters'

export default function OperativosDerivacion() {
  const dispatch = useDispatch()
  const [operativos, setOperativos] = useState()
  const [loading, setLoading] = useState(true)
  const [updaetDerivation, setUpdateDerivation] = useState(true)
  const { open: operativoDerivacion, toggleOpen: toggleOperativoDerivacion } =
    useToggle()
  const [filters, setFilters] = useState({
    page: 0,
    size: 10,
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
    if (updaetDerivation) {
      setLoading(true)
      dispatch(operativosActions.getOperativosDerivacion()).then((data) => {
        setOperativos(data.operativosDerivacion.rows)
        setLoading(false)
        setUpdateDerivation(false)
      })
    }
  }, [updaetDerivation])

  const searchButton = () => {
    setLoading(true)
    dispatch(operativosActions.getOperativosDerivacion(filters)).then(
      (data) => {
        setOperativos(data.operativosDerivacion.rows)
        setLoading(false)
        setUpdateDerivation(false)
      }
    )
  }

  useEffect(() => {
    searchButton()
  }, [])
  return (
    <Wrapper>
      <Grid spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <Box p={1} textAlign="center">
            <PageHeading variant="h6">Operativos de Derivación</PageHeading>
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
                <Button onClick={toggleOperativoDerivacion}>
                  <Add /> Nuevo
                </Button>
              </Grid>
            </Box>
            <DataTable
              highlightOnHover
              pointerOnHover
              pagination
              progressPending={loading}
              //    onRowClicked={handleRowClick}
              columns={[
                {
                  name: 'Trabajador',
                  selector: (row) => row?.trabajador_id
                },
                {
                  name: 'Prestación',
                  selector: (row) => row?.prestacione?.nombre_prestacion
                },
                {
                  name: 'Fecha',
                  selector: (row) => row?.fecha_solicitud
                }
                /*  {
                  name: 'Estado',
                  selector: (row) => row.state
                } */
              ]}
              data={operativos}
            />
          </Box>
        </Grid>
      </Grid>
      {operativoDerivacion && (
        <ModalDerivacion
          open={operativoDerivacion}
          onClose={toggleOperativoDerivacion}
          setUpdateDerivation={setUpdateDerivation}
        />
      )}
    </Wrapper>
  )
}
