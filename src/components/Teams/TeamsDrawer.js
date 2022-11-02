import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowLeft as BackIcon } from 'react-icons/fi'
import {
  Drawer,
  Grid,
  IconButton,
  Typography,
  Box,
  makeStyles
} from '@material-ui/core'
import { DataTable, ConfirmDelete } from '../Shared'
import { ActionsTable, Button, LabeledRow, PageHeading, Text } from '../UI'
import { useToggle } from '../../hooks'
import AddMatte from './AddMatte'
import EditTeam from './TeamsAdd'
import DeleteTeamMate from './DeleteTeamMate'
import EditTeamMate from './EditTeamMate'
import teamsActions from '../../state/actions/teams'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 800
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  bgGray: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: theme.spacing(1)
  }
}))
const TeamsDrawer = ({
  open,
  onClose,
  oneTeam,
  onDelete,
  setFetchMate,
  fetchTeams,
  fetchOneTeam
}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { user } = useSelector((state) => state.auth)
  const { isMobile } = useSelector((state) => state.ui)
  const [editTeam, setEditTeam] = useState(false)
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openDeleteMate, toggleOpen: toggleOpenDeleteMate } = useToggle()
  const { open: openMatte, toggleOpen: toggleOpenMatte } = useToggle()
  const { open: openEditTeam, toggleOpen: toggleEditTeam } = useToggle()
  const { open: openEditMate, toggleOpen: toggleOpenEditMate } = useToggle()
  const [teamMate, setTeamMate] = useState({
    rut: '',
    nombres: '',
    apellidos: ''
  })
  const lista = oneTeam?.equipo.integrantes
  const prestaciones = oneTeam?.equipo.prestaciones.map(
    ({ id, nombre_prestacion }) => ({ id, nombre_prestacion })
  )
  const prestacionesLista = useSelector((state) => state.prestaciones.list.rows)
  const [deleteMate, setDeleteMate] = useState()
  const fetchEditTeam = (values) =>
    dispatch(
      teamsActions.editTeam(oneTeam.equipo.id, {
        ...values,
        id_prestador: user.id
      })
    ).then(() => {
      fetchOneTeam()
      setEditTeam(true)
      onClose()
    })

  useEffect(() => {
    if (editTeam) {
      fetchTeams()
      setEditTeam(false)
    }
  }, [editTeam])
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      classes={{ paper: classes.root }}
    >
      <Box p={1} display="flex" alignItems="center" mt={2}>
        <Grid container item xs={7} display="flex-start">
          <IconButton onClick={onClose}>
            <BackIcon />
          </IconButton>
          <PageHeading className={classes.title}>
            {oneTeam?.equipo?.nombre}
          </PageHeading>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={toggleOpenDelete} danger>
              Eliminar Equipo
            </Button>
            <Button onClick={toggleEditTeam}>Editar Equipo</Button>
          </Box>
        </Grid>
      </Box>
      <Box ml={2} p={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          ml={2}
        >
          <Grid item xs={6}>
            <Typography className={classes.heading}>
              Detalles del equipo
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.heading}>
              Prestaciones del equipo
            </Typography>
          </Grid>
        </Box>
      </Box>
      <Box ml={2} p={1}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          ml={2}
        >
          <Grid item xs={6}>
            <LabeledRow label={'Nombre:'}>
              <Text>{oneTeam?.equipo?.nombre}</Text>
            </LabeledRow>
            <LabeledRow label={'Región:'}>
              <Text>{oneTeam?.equipo?.region}</Text>
            </LabeledRow>
            <LabeledRow label={'Comuna:'}>
              <Text>{oneTeam?.equipo?.comuna} </Text>
            </LabeledRow>
            <LabeledRow label={'Sucursal:'}>
              <Text>{oneTeam?.equipo?.sucursal}</Text>
            </LabeledRow>
          </Grid>
          <Grid item xs={6} className={classes.bgGray}>
            <LabeledRow label={'Prestaciones:'}></LabeledRow>
            {prestaciones?.map((prestacion) => (
              <Text key={prestacion.id}>
                {prestacion.nombre_prestacion.toUpperCase()}
              </Text>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box ml={2} p={1}>
        <Box
          display="flex"
          justifyContent="flex-start"
          ml={2}
          alignItems="center"
        >
          <Grid item xs={7}>
            <Typography className={classes.heading}>Integrantes</Typography>
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={toggleOpenMatte} size="small">
                Nuevo Integrante
              </Button>
            </Box>
          </Grid>
        </Box>
        <DataTable
          highlightOnHover
          pagination
          columns={[
            {
              name: 'Nombres',
              selector: (row) => row.nombres,
              left: true
            },
            {
              name: 'Apellidos',
              selector: (row) => row.apellidos
            },
            {
              name: 'Rut',
              selector: (row) => row.rut
            },
            {
              name: '',
              right: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  onDelete={() => {
                    toggleOpenDeleteMate()
                    setDeleteMate(row.id)
                  }}
                  onEdit={() => {
                    toggleOpenEditMate()
                    setTeamMate({
                      rut: row.rut,
                      nombres: row.nombres,
                      apellidos: row.apellidos
                    })
                  }}
                />
              )
            }
          ]}
          data={lista}
        />
      </Box>
      <ConfirmDelete
        open={openDelete}
        onClose={toggleOpenDelete}
        message={
          <Typography>
            {`¿Seguro de eliminar a: ${oneTeam?.equipo?.nombre}
            ?`}
          </Typography>
        }
        onConfirm={() => {
          toggleOpenDelete()
          onDelete()
          onClose()
        }}
      />
      <AddMatte
        open={openMatte}
        onClose={toggleOpenMatte}
        id={oneTeam?.equipo.id}
        setFetchMate={setFetchMate}
      />
      <DeleteTeamMate
        open={openDeleteMate}
        onClose={toggleOpenDeleteMate}
        deleteMate={deleteMate}
        setFetchMate={setFetchMate}
        teamId={oneTeam?.equipo?.id}
      />
      <EditTeamMate
        open={openEditMate}
        onClose={toggleOpenEditMate}
        teamMate={teamMate}
        setFetchMate={setFetchMate}
        setTeamMate={setTeamMate}
        teamId={oneTeam?.equipo?.id}
      />
      {openEditTeam && (
        <EditTeam
          open={openEditTeam}
          onClose={toggleEditTeam}
          prestacion={prestacionesLista}
          type="UPDATE"
          submitFunction={fetchEditTeam}
          data={oneTeam?.equipo}
        />
      )}
    </Drawer>
  )
}

export default TeamsDrawer
