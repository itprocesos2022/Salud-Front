import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Grid, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import { PageHeading, SearchInput, Wrapper, Button } from '../../components/UI'
import { DataTable } from '../../components/Shared'
import { useToggle } from '../../hooks'
import NewMedida from '../../components/Prestaciones/Dialogs/NewMedida'
import medidasActions from '../../state/actions/medidas'

const Etapa = () => {
  const dispatch = useDispatch()
  const { idPrestacion, idEtapa } = useParams()
  const history = useHistory()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const [loading, setLoading] = useState()
  const [medidas, setMedidas] = useState()
  const [cargaMedidas, setCargaMedidas] = useState(true)
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: ''
  })
  const goBack = () => {
    history.push(`/scam/prestacion/${idPrestacion}/stages`)
  }

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const getMedidas = () => {
    dispatch(medidasActions.getMedidasByEtapa(idEtapa, filters))
      .then((data) => {
        setLoading(false)
        console.log(data.rows)
        setMedidas(data.rows)
        setCargaMedidas(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    if (cargaMedidas) {
      getMedidas()
    }
  }, [cargaMedidas])
  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <PageHeading>Nombre Etapa</PageHeading>
        </Box>
      </Box>
      <Box>
        <PageHeading>Medidas</PageHeading>
      </Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8} md={9} lg={10}>
          <SearchInput
            value={filters.search}
            onChange={searchChange}
            placeholder="Buscar medida"
          />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
          <Box display="flex" justifyContent="center">
            <Button onClick={toggleOpenAdd}>Asignar medida</Button>
          </Box>
        </Grid>
      </Grid>
      <DataTable
        loading={loading}
        emptyMessage={
          filters.search
            ? `No se encontraron resultados para: ${filters.search}`
            : 'Aun no hay medidas'
        }
        pagination
        paginationRowsPerPageOptions={[10, 20, 30, 40]}
        columns={[
          {
            name: 'Tipo de medida',
            selector: (row) => row.medida.nombre_tipo_medida,
            sortable: true
          },
          {
            name: 'Unidad de medida',
            selector: (row) => row.medida.nombre_unidad_medida
          },
          {
            name: 'Valor mínimo',
            selector: (row) => row.medida.valor_minimo || '',
            center: true
          },
          {
            name: 'Valor máximo',
            selector: (row) => row.medida.valor_maximo || '',
            center: true
          }
        ]}
        data={medidas}
      />
      {openAdd && <NewMedida open={openAdd} onClose={toggleOpenAdd} />}
    </Wrapper>
  )
}
export default Etapa
