import { useState } from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import { SearchInput, ActionsTable, Button } from '../../UI'
import { DataTable } from '../../Shared'
import useStyles from '../Steps/styles'

const PrestadoresDialog = ({ setPrestadores }) => {
  const classes = useStyles()
  const prestadores = [
    { id: 1, name: 'Prestador 1', comuna: 'Comuna 1' },
    { id: 2, name: 'Prestador 2', comuna: 'Comuna 2' },
    { id: 3, name: 'Prestador 3', comuna: 'Comuna 3' },
    { id: 4, name: 'Prestador 4', comuna: 'Comuna 4' },
    { id: 5, name: 'Prestador 1', comuna: 'Comuna 3' },
    { id: 6, name: 'Prestador 3', comuna: 'Comuna 2' },
    { id: 7, name: 'Prestador 2', comuna: 'Comuna 1' },
    { id: 8, name: 'Prestador 1', comuna: 'Comuna 4' }
  ]
  const [filter, setFilter] = useState()
  const filterList = prestadores.filter((prestador) =>
    filter
      ? prestador.name.toUpperCase().includes(filter.toUpperCase()) ||
        prestador.comuna.toUpperCase().includes(filter.toUpperCase())
      : prestador
  )

  return (
    <Box className={classes.actions}>
      <Box className={classes.actions}>
        <Typography align="center">Prestadores</Typography>
        <Grid item xs={12} md={12} lg={12} className={classes.actions}>
          <SearchInput
            placeholder="Buscar..."
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <DataTable
            highlightOnHover
            pointerOnHover
            onRowClicked={() => {}}
            columns={[
              {
                name: '',
                selector: (row) => row.name,
                sortable: true,
                center: true
              },
              {
                name: '',
                selector: (row) => row.comuna,
                sortable: true,
                center: true
              },
              {
                name: '',
                right: true,
                cell: (row) => (
                  <ActionsTable
                    {...row}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                )
              }
            ]}
            data={filterList}
          />
        </Grid>
        <Button onClick={() => setPrestadores(false)} variant="outlined">
          Volver
        </Button>
      </Box>
    </Box>
  )
}

export default PrestadoresDialog
