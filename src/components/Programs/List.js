import { useDispatch, useSelector } from 'react-redux'

import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import programasActions from '../../state/actions/programas'

import { Wrapper, SearchInput, ActionsTable, PageHeading } from '../UI'
import { DataTable } from '../Shared'
import { useToggle } from '../../hooks'
import ProgramForm from './ProgramForm'
import CreateProgram from './CreateProgram'
import DeleteProgram from './DeleteProgram'

const ProgramsList = () => {
  const history = useHistory()
  const { open, toggleOpen } = useToggle()
  const [filters, setFilters] = useState({
    page: 1,
    size: 10,
    search: ''
  })
  const { list } = useSelector((state) => state.programas)
  const dispatch = useDispatch()
  const [toDeleteId, setToDeleteId] = useState(0)

  const handleRowClick = (row) => {
    history.push(`/scam/program/${row.id}/details`)
  }
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  const searchChange = (e) => {
    setFilters({ ...filters, search: e.target.value })
  }

  useEffect(() => {
    dispatch(programasActions.getProgramas())
  }, [])

  return (
    <div>
      <Wrapper>
        <Box p={2} display="flex" justifyContent="center">
          <PageHeading>Programas</PageHeading>
        </Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8} md={9} lg={10}>
            <SearchInput
              value={filters.search}
              placeholder="Buscar Programa"
              onChange={searchChange}
            />
          </Grid>
          <Grid item xs={4} md={3} lg={2}>
            <Box display="flex" justifyContent="center">
              <IconButton onClick={toggleOpen}>
                <AddIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <DataTable
          emptyMessage={
            filters.search
              ? `No se Encontraron resultados para : ${filters.search}`
              : 'Aun no hay Programas'
          }
          highlightOnHover
          pointerOnHover
          onRowClicked={handleRowClick}
          pagination
          paginationRowsPerPageOptions={[10, 20, 30, 40]}
          columns={[
            {
              name: 'Año',
              selector: (row) => row.age,
              sortable: true,
              hide: 'md'
            },
            {
              name: 'Nombre',
              selector: (row) => row.nombre,
              sortable: true
            },
            {
              name: 'Tipo',
              selector: (row) => row.tipo,
              sortable: true,
              hide: 'lg'
            },
            {
              name: 'Presupuesto',
              selector: (row) => row.presupuesto
            },
            {
              name: 'Cupos',
              selector: (row) => row.cupos
            },
            {
              name: '',
              center: true,
              cell: (row) => (
                <ActionsTable
                  {...row}
                  onDelete={() => {
                    setToDeleteId(row.id)
                    toggleOpenDelete()
                  }}
                />
              )
            }
          ]}
          data={list?.rows}
        />
      </Wrapper>
      <ProgramForm open={open} onClose={toggleOpen} />
      <CreateProgram open={open} onClose={toggleOpen} />
      <DeleteProgram
        open={openDelete}
        onClose={toggleOpenDelete}
        toDeleteId={toDeleteId}
      />
    </div>
  )
}

export default ProgramsList
