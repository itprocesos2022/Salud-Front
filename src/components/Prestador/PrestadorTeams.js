import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { DataTable } from '../Shared'
import { SearchInput, ActionsTable } from '../UI'
import DeleteTeams from './Dialogs/DeleteTeams'
import EditObservacion from './Dialogs/EditObservacion'
import TeamDetail from './Dialogs/TeamDetail'
import { useToggle } from '../../hooks'
import teamsActions from '../../state/actions/teams'

const PrestadorTeams = () => {
  const dispatch = useDispatch()
  const { idPrestador } = useParams()
  const [toDeleteTeamId, setToDeleteTeamId] = useState(0)
  const [filteredTeam, setFilteredTeam] = useState()
  const [cargaTeam, setCargaTeam] = useState(true)
  const { list: teamList } = useSelector((state) => state.teams)
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: '',
    id_prestador: idPrestador
  })
  const [toEditObservacionRow, setToEditObservacionRow] = useState()

  const fetchPrestadorTeam = () => {
    dispatch(teamsActions.getTeams(filters)).then(() => {
      setCargaTeam(false)
    })
  }

  useEffect(() => {
    if (cargaTeam) {
      fetchPrestadorTeam()
    }
  }, [cargaTeam])

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
    const equipoFiltrado = teamList.filter((equipo) =>
      equipo.nombre.toUpperCase().includes(e.target.value.toUpperCase())
    )
    setFilteredTeam(equipoFiltrado)
  }

  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openTeamDetail, toggleOpen: toggleOpenTeamDetail } = useToggle()
  const { open: openEditObservacion, toggleOpen: toggleOpenEditObservacion } =
    useToggle()

  // console.log(teamList)
  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={8} lg={6}>
          <SearchInput
            value={filters.search}
            placeholder="Buscar Equipo"
            onChange={searchChange}
          />
        </Grid>
      </Grid>
      {teamList && (
        <DataTable
          emptyMessage={
            filters.search
              ? `No se Encontraron resultados para : ${filters.search}`
              : 'Aun no hay Equipos'
          }
          highlightOnHover
          pointerOnHover
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          progressPending={cargaTeam}
          onRowClicked={(row) => {
            setToEditObservacionRow(row)
            toggleOpenTeamDetail()
          }}
          columns={[
            {
              name: 'Nombre',
              selector: (row) => row.nombre,
              sortable: true
            },
            {
              name: 'Integrantes',
              selector: (row) => row?.integrantes?.length || 0
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  switchChecked={row.estado}
                  onSwitch={() => {
                    teamsActions.editTeam(row.id, { estado: !row.estado })()
                    window.location.reload()
                  }}
                  onDelete={() => {
                    setToDeleteTeamId(row.id)
                    toggleOpenDelete()
                  }}
                  onEdit={() => {
                    console.log(row.observacion)
                    setToEditObservacionRow(row)
                    toggleOpenEditObservacion()
                  }}
                />
              )
            }
          ]}
          data={
            filters?.search
              ? filteredTeam.sort((a, b) => Number(b.estado) - Number(a.estado))
              : teamList.sort((a, b) => Number(b.estado) - Number(a.estado))
          }
        />
      )}

      <DeleteTeams
        toDeleteId={toDeleteTeamId}
        open={openDelete}
        onClose={toggleOpenDelete}
      />
      <EditObservacion
        open={openEditObservacion}
        onClose={toggleOpenEditObservacion}
        row={toEditObservacionRow}
      />
      <TeamDetail
        open={openTeamDetail}
        onClose={toggleOpenTeamDetail}
        row={toEditObservacionRow}
      />
    </div>
  )
}

export default PrestadorTeams
