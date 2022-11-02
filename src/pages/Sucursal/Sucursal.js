import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Grid, IconButton } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons/'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  LabeledRow,
  PageHeading,
  SearchInput,
  Text,
  Wrapper,
  Button
} from '../../components/UI'
import { DataTable } from '../../components/Shared'
import sucursalesActiones from '../../state/actions/Sucursales'
import { useToggle } from '../../hooks'
import NewPrestacion from '../../components/Sucursal/Dialogs/NewPrestacion'
import NewTeam from '../../components/Sucursal/Dialogs/NewTeam'

const Sucursal = () => {
  const dispatch = useDispatch()
  const { idSucursal } = useParams()
  const [loading, setLoading] = useState(false)
  const { open: openAsignarPrestacion, toggleOpen: toggleOpenPrestacion } =
    useToggle()
  const { open: openAsignarEquipo, toggleOpen: toggleOpenEquipo } = useToggle()
  const { sucursal } = useSelector((state) => state.sucursales)
  const history = useHistory()
  const goBack = () => {
    history.push('/scam/externo')
  }

  const getSucursal = () => {
    setLoading(true)
    dispatch(sucursalesActiones.getOneSucursal(idSucursal))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getSucursal()
  }, [idSucursal])
  return (
    <Wrapper>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <PageHeading>{sucursal?.sucursal?.nombre_sucursal}</PageHeading>
        </Box>
        <Box>
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Box>
      <Box ml={6}>
        <LabeledRow label="Región">
          <Text>{sucursal?.sucursal?.region_sucursal}</Text>
        </LabeledRow>
        <LabeledRow label="Comuna">
          <Text>{sucursal?.sucursal?.comuna_sucursal}</Text>
        </LabeledRow>
      </Box>
      <Box>
        <PageHeading>Prestaciones</PageHeading>
      </Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8} md={9} lg={10}>
          <SearchInput placeholder="Buscar prestacion" />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
          <Box display="flex" justifyContent="center">
            <Button onClick={toggleOpenPrestacion}>Asignar Prestación</Button>
          </Box>
        </Grid>
      </Grid>
      <DataTable
        loading={loading}
        columns={[
          {
            name: 'Nombre',
            selector: (row) => row.name
          },
          {
            name: 'Descripción',
            selector: (row) => row.description
          },
          {
            name: 'Etapas',
            selector: (row) => row.stages,
            sortable: true
          }
        ]}
        data={[
          {
            id: 1,
            name: 'Oftalmológico',
            description: 'Programa oftalmológico',
            stages: '4'
          },
          {
            id: 2,
            name: 'Dental',
            description: 'Programa dental',
            stages: '1'
          },
          {
            id: 3,
            name: 'Preventivo',
            description: 'Programa preventivo',
            stages: '2'
          }
        ]}
      />
      <Box>
        <PageHeading>Equipos</PageHeading>
      </Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8} md={9} lg={10}>
          <SearchInput placeholder="Buscar equipo" />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
          <Box display="flex" justifyContent="center">
            <Button onClick={toggleOpenEquipo}>Asignar Equipo</Button>
          </Box>
        </Grid>
      </Grid>
      <DataTable
        loading={loading}
        columns={[
          {
            name: 'Nombre',
            selector: (row) => row.name
          },
          {
            name: 'integrantes',
            selector: (row) => row.integrantes
          }
        ]}
        data={[
          {
            id: 1,
            name: 'Equipo preventivo',
            integrantes: '2'
          },
          {
            id: 2,
            name: 'Equipo dental',
            integrantes: '3'
          },
          {
            id: 3,
            name: 'Equipo oftalmológico',
            integrantes: '2'
          }
        ]}
      />
      <NewPrestacion
        open={openAsignarPrestacion}
        onClose={toggleOpenPrestacion}
      />
      <NewTeam open={openAsignarEquipo} onClose={toggleOpenEquipo} />
    </Wrapper>
  )
}
export default Sucursal
