import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Grid, Box, Typography } from '@material-ui/core'
import { RestoreFromTrash as RestoreIcon } from '@material-ui/icons'
import { ConfirmDelete, DataTable } from '../Shared'
import { SearchInput, Button, StatusChip, ActionsTable } from '../UI'
import { ConstructionModal } from '../Constructions'
import { useSuccess, useToggle } from '../../hooks'
import constructionsActions from '../../state/actions/constructions'

const Constructions = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { open: openCreate, toggleOpen: toggleOpenCreate } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { open: openRestore, toggleOpen: toggleOpenRestore } = useToggle()
  const [currentConstruction, setCurrentConstruction] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const [submitting, setSubmitting] = useState(false)
  const { idCompany } = useParams()
  const { user } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    business_id: idCompany,
    state: 'ACTIVE'
  })
  const [tableData, setTableData] = useState([])
  const { company } = useSelector((state) => state.companies)
  const { constructionByCompany } = useSelector((state) => state.constructions)

  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })

  const fetchConstruction = () => {
    setTableData([])
    setLoading(true)
    dispatch(constructionsActions.getConstructionsCompany(query)).then(() => {
      setLoading(false)
    })
  }
  const createConstruction = (values) =>
    dispatch(
      constructionsActions.createConstruction({
        ...values,
        typology_id: values.typology_id || null,
        business_id: parseInt(idCompany, 10)
      })
    )
  const updateConstruction = (values) =>
    dispatch(
      constructionsActions.updateConstruction(currentConstruction.id, {
        ...values,
        typology_id: values.typology_id || null,
        business_id: parseInt(idCompany, 10)
      })
    )

  const onDelete = (construction) => {
    setCurrentConstruction(construction)
    toggleOpenDelete()
  }
  const onEditClick = (construction) => {
    setCurrentConstruction(construction)
    toggleOpenUpdate()
  }
  const handleAction = (id, state, message, toggleFunction) => {
    setSubmitting(true)
    dispatch(constructionsActions.patchConstruction(id, { state }))
      .then(() => {
        setSubmitting(false)
        changeSuccess(true)
        toggleFunction()
        enqueueSnackbar(message, { variant: 'success' })
        fetchConstruction()
      })
      .catch((err) => {
        setSubmitting(false)
        enqueueSnackbar(err.detail, {
          variant: 'error'
        })
        toggleFunction()
      })
  }
  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  useEffect(() => {
    fetchConstruction()
  }, [query])
  useEffect(() => {
    setTableData(constructionByCompany)
  }, [constructionByCompany])

  return (
    <div>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={6} md={8} lg={6}>
          <SearchInput
            value={filters.search}
            placeholder="Buscar Obras"
            onChange={searchChange}
          />
        </Grid>
        <Grid item xs={6} md={4} lg={6}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={toggleOpenCreate}
              disabled={company?.state === 'DELETED'}
            >
              Nueva Obra
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Button
          variant={query.state === 'ACTIVE' ? 'contained' : 'outlined'}
          onClick={() => {
            setQuery({ ...query, state: 'ACTIVE' })
          }}
        >
          Ver activos
        </Button>
        <Button
          variant={query.state === 'DELETED' ? 'contained' : 'outlined'}
          onClick={() => {
            setQuery({ ...query, state: 'DELETED' })
          }}
        >
          Ver eliminados
        </Button>
      </Box>
      <DataTable
        emptyMessage={
          filters.search
            ? `No se Encontraron resultados para : ${filters.search}`
            : 'Aun no hay Obras'
        }
        highlightOnHover
        pointerOnHover
        pagination
        progressPending={loading}
        paginationRowsPerPageOptions={[10, 20, 30, 40]}
        columns={[
          {
            name: 'Nombre',
            selector: (row) => row.name,
            sortable: true
          },
          {
            name: 'Vigencia',
            cell: (row) => (
              <StatusChip
                {...row}
                success={row.status === 'VIGENTE'}
                error={row.status === 'NO_VIGENTE'}
                label={row.status === 'VIGENTE' ? 'Vigente' : 'No vigente'}
              />
            )
          },
          {
            name: 'Dirección',
            selector: (row) => row.address,
            hide: 'xs'
          },
          {
            name: '',
            right: true,
            cell: (row) => (
              <ActionsTable
                {...row}
                disabledDelete={row.state === 'DELETED'}
                onEdit={() => onEditClick(row)}
                onDelete={row.state !== 'DELETED' ? () => onDelete(row) : null}
                moreOptions={
                  query.state === 'DELETED' && user.role.key === 'ADMIN'
                    ? [
                        {
                          icon: <RestoreIcon color="primary" />,
                          onClick: () => {
                            setCurrentConstruction(row)
                            toggleOpenRestore()
                          }
                        }
                      ]
                    : []
                }
              />
            )
          }
        ]}
        data={tableData}
      />
      {openCreate && (
        <ConstructionModal
          open={openCreate}
          defaultCompany={company}
          onClose={toggleOpenCreate}
          successFunction={fetchConstruction}
          submitFunction={createConstruction}
        />
      )}
      {currentConstruction && openUpdate && (
        <ConstructionModal
          open={openUpdate}
          onClose={toggleOpenUpdate}
          type="UPDATE"
          construction={currentConstruction}
          submitFunction={updateConstruction}
          successFunction={fetchConstruction}
          successMessage="Obra actualizada exitosamente"
        />
      )}
      {currentConstruction && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={submitting}
          success={success}
          onConfirm={() =>
            handleAction(
              currentConstruction.id,
              'DELETED',
              'Obra eliminada exitosamente!',
              toggleOpenDelete
            )
          }
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar esta obra:{''}
              <strong>{currentConstruction.name}</strong>?
            </Typography>
          }
        />
      )}
      {currentConstruction && openRestore && (
        <ConfirmDelete
          event={'RESTORE'}
          confirmText="Restaurar"
          open={openRestore}
          onClose={toggleOpenRestore}
          loading={submitting}
          success={success}
          onConfirm={() =>
            handleAction(
              currentConstruction.id,
              'ACTIVE',
              'Obra restaurada exitosamente!',
              toggleOpenRestore
            )
          }
          message={
            <Typography variant="h6">
              ¿Estás seguro de restaurar esta obra:{''}
              <strong>{currentConstruction.name}</strong>?
            </Typography>
          }
        />
      )}
    </div>
  )
}

export default Constructions
