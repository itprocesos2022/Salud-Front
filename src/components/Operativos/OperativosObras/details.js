import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { Box, Grid, Typography } from '@material-ui/core'
import { Button, LabeledRow, Text } from '../../UI'
import { useToggle } from '../../../hooks'
import operativosActions from '../../../state/actions/operativos'
import ModalTerreno from '../modalObras/modalObras'

const Details = () => {
  const dispatch = useDispatch()
  const { idOperativo } = useParams()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const [operativoDetails, setOperativoDetails] = useState()

  const fetchOperativoDetails = () => {
    dispatch(operativosActions.getOperativosTerrenoDetails(idOperativo)).then(
      (data) => {
        setOperativoDetails(data)
      }
    )
  }

  useEffect(() => {
    fetchOperativoDetails()
  }, [idOperativo])
  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        ml={2}
      >
        <Typography style={{ fontSize: '19px', fontWeight: 'bold' }}>
          Información del operativo
        </Typography>
        <Button onClick={toggleOpenEdit}>Editar</Button>
      </Box>
      <Box p={2}>
        <Grid container>
          <Grid item xs={6} md={6}>
            {operativoDetails?.operativosTerrenos.prestadore && (
              <LabeledRow label="Prestador:">
                <Text>
                  {
                    operativoDetails?.operativosTerrenos.prestadore
                      .nombre_prestador
                  }
                </Text>
              </LabeledRow>
            )}
            {operativoDetails?.operativosTerrenos.prestacione && (
              <LabeledRow label="Prestación:">
                <Text>
                  {
                    operativoDetails?.operativosTerrenos.prestacione
                      .nombre_prestacion
                  }
                </Text>
              </LabeledRow>
            )}
            <LabeledRow label="Empresa:">
              <Text>{operativoDetails?.empresa.name}</Text>
            </LabeledRow>
            <LabeledRow label="Obra:">
              <Text>{operativoDetails?.obra.name}</Text>
            </LabeledRow>
            {operativoDetails?.operativosTerrenos.equipo && (
              <>
                <LabeledRow label="Equipo:">
                  <Text>
                    {operativoDetails?.operativosTerrenos.equipo.nombre}
                  </Text>
                </LabeledRow>
                <LabeledRow label="Profesionales:">
                  <Text>
                    {operativoDetails?.operativosTerrenos.equipo.integrantes.map(
                      (profesional) => (
                        <li style={{ listStyle: 'none' }} key={profesional.id}>
                          {`${profesional.nombres} ${profesional.apellidos}`}
                        </li>
                      )
                    )}
                  </Text>
                </LabeledRow>
              </>
            )}
            {operativoDetails?.operativosTerrenos.programa_name && (
              <LabeledRow label="Programa:">
                <Text>
                  {operativoDetails?.operativosTerrenos.programa_name}
                </Text>
              </LabeledRow>
            )}
          </Grid>
          <Grid item xs={6} md={6}>
            <LabeledRow width={250} label="Fecha del operativo:">
              <Text>
                {operativoDetails?.operativosTerrenos.fecha &&
                  moment(operativoDetails.operativosTerrenos.fecha).format(
                    'DD/MM/YYYY'
                  )}{' '}
              </Text>
            </LabeledRow>
            <LabeledRow width={250} label="Asistente social:">
              <Text>
                {operativoDetails?.operativosTerrenos.asistente_social_names}
              </Text>
            </LabeledRow>
            <LabeledRow width={250} label="Asistente de operaciones:">
              <Text>
                {
                  operativoDetails?.operativosTerrenos
                    .asistente_operaciones_nombres
                }
              </Text>
            </LabeledRow>
            <LabeledRow width={250} label="Eejecutivo comercial / GBS:">
              <Text>{operativoDetails?.asistente.nombre}</Text>
            </LabeledRow>
            <LabeledRow width={250} label="Precio:">
              <Text>{operativoDetails?.operativosTerrenos.precio}</Text>
            </LabeledRow>
          </Grid>
        </Grid>
      </Box>
      {openEdit && operativoDetails && (
        <ModalTerreno
          open={openEdit}
          onClose={toggleOpenEdit}
          type={'UPDATE'}
          data={operativoDetails}
          idOperativo={idOperativo}
        />
      )}
    </Box>
  )
}

export default Details
