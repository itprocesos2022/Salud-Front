import { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useSuccess, useToggle } from '../../../hooks'
import { ConfirmDelete, DataTable } from '../../Shared'
import { Wrapper, Button, ActionsTable } from '../../UI'
import CreateYear from './CreateYear'
import yearsActions from '../../../state/actions/years'

const DatosPrueba = {
  row: [
    {
      year: 2021,
      desde: new Date(2020, 12, 1).toISOString().split('T')[0],
      hasta: new Date(2021, 12, 1).toISOString().split('T')[0]
    },
    {
      year: 2022,
      desde: new Date(2021, 12, 1).toISOString().split('T')[0],
      hasta: new Date(2022, 12, 1).toISOString().split('T')[0]
    }
  ]
}

const Medidas = () => {
  console.log(DatosPrueba.row)
  const dispatch = useDispatch()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openUpdate, toggleOpen: toggleOpenUpdate } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const [loading, setLoading] = useState(false)
  const [years, setYears] = useState([])
  const [deleting, setDeleting] = useState(false)
  const { success, changeSuccess } = useSuccess()
  const [currentYear, setCurrentYear] = useState(null)

  const getYears = () => {
    setLoading(true)
    dispatch(yearsActions.getYears()).then((data) => {
      setLoading(false)
      setYears(data.years.rows)
    })
  }
  const createMedida = (values) => {
    dispatch(yearsActions.createYear(values)).then(() => toggleOpenAdd())
  }

  // const editMedida = (values) => {
  //   dispatch(yearsActions.updateYear(currentYear.id, values)).then(() =>
  //     toggleOpenUpdate()
  //   )
  // }

  const deleteMedida = (id) => {
    setDeleting(true)
    dispatch(yearsActions.deleteYear(id))
      .then(() => {
        setDeleting(false)
        toggleOpenDelete()
        changeSuccess(false)
        setCurrentYear(null)
        getYears()
      })
      .catch(() => {
        setDeleting(false)
        changeSuccess(false)
      })
  }
  useEffect(() => {
    getYears()
    // console.log(medidas)
  }, [])

  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">Años de vigencia</Typography>
          <Button onClick={toggleOpenAdd}>Nuevo año</Button>
        </Box>
        <Box>
          <DataTable
            progressPending={loading}
            emptyMessage={'No hay años'}
            columns={[
              {
                name: 'Año',
                selector: (row) => row.year,
                sortable: true
              },
              {
                name: 'Vigencia desde',
                selector: (row) => row.desde,
                center: true
              },
              {
                name: 'Hasta',
                selector: (row) => row.hasta || '',
                center: true
              },
              {
                name: '',
                selector: '',
                right: true,
                cell: (row) => (
                  <ActionsTable
                    {...row}
                    onEdit={() => {
                      setCurrentYear(row)
                      toggleOpenUpdate()
                    }}
                    onDelete={() => {
                      setCurrentYear(row)
                      toggleOpenDelete()
                    }}
                  />
                )
              }
            ]}
            data={years}
          />
        </Box>
      </Box>
      <CreateYear
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createMedida}
        successFunction={getYears}
      />
      {currentYear && openUpdate && (
        <CreateYear
          open={openUpdate}
          type="UPDATE"
          data={currentYear}
          onClose={toggleOpenUpdate}
          successFunction={getYears}
        />
      )}
      {currentYear && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          loading={deleting}
          success={success}
          onConfirm={() => deleteMedida(currentYear.id)}
          message={
            <span>
              ¿Estás seguro de eliminar este año:
              <strong> {currentYear.year}</strong>?
            </span>
          }
        />
      )}
    </Wrapper>
  )
}

export default Medidas
