import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, Typography } from '@material-ui/core'
import companiesActions from '../../state/actions/companies'
import { Button, LabeledRow, StatusChip, Text } from '../UI'
import { Map } from '../Shared'
import useStyles from './styles'
import { useToggle } from '../../hooks'
import CompanyModal from '../Companies/Create'

const Details = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { idCompany } = useParams()
  const [mainCompany, setMainCompany] = useState(null)
  const { company } = useSelector((state) => state.companies)
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()

  const fetchCompanyDetails = () => {
    dispatch(companiesActions.getCompany(idCompany))
  }

  useEffect(() => {
    if (company?.parent_business_id) {
      dispatch(
        companiesActions.getMainCompany(company.parent_business_id)
      ).then((data) => {
        setMainCompany(data)
      })
    } else {
      setMainCompany(null)
    }
  }, [company])
  return (
    <Box ml={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography className={classes.heading}>Información</Typography>
            <Box>
              {company && !company?.is_active && (
                <Box mt={1}>
                  <StatusChip error label="Empresa suspendida" />
                </Box>
              )}
              {company && company?.is_billing_business && (
                <Box mt={1}>
                  <StatusChip success label="Esta empresa es facturadora" />
                </Box>
              )}
              <LabeledRow label="Razón social">
                <Text>{company?.business_name}</Text>
              </LabeledRow>
              <LabeledRow label="Rut">
                <Text>{company?.rut}</Text>
              </LabeledRow>
              {company && company.name && (
                <LabeledRow label="Nombre">
                  <Text>{company?.name}</Text>
                </LabeledRow>
              )}
              <LabeledRow label="Correo">
                <Text>{company?.email}</Text>
              </LabeledRow>
              <LabeledRow label="Estado">
                <StatusChip
                  label={company?.state === 'CREATED' ? 'Activo' : 'Eliminado'}
                  error={company?.state !== 'CREATED'}
                  success={company?.state === 'CREATED'}
                />
              </LabeledRow>
              <LabeledRow label="Tipo">
                <Text>{company?.type}</Text>
              </LabeledRow>
              <LabeledRow label="Empresa asociada">
                <Text>{company?.is_partner}</Text>
              </LabeledRow>
              <LabeledRow label="Comentarios">
                <Text>{company?.comments}</Text>
              </LabeledRow>
              {mainCompany && (
                <LabeledRow label="Empresa madre">
                  <Text>
                    <a href={`/company/${mainCompany?.id}/details`}>
                      {mainCompany?.business_name}
                    </a>
                  </Text>
                </LabeledRow>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Box>
              <Typography className={classes.heading}>Dirección</Typography>
              <Box>
                <LabeledRow label="Dirección">{company?.address}</LabeledRow>
                <LabeledRow label="Región">{company?.region?.name}</LabeledRow>
                <LabeledRow label="Comuna">{company?.commune?.name}</LabeledRow>
              </Box>
            </Box>
          </Box>
          {company && company.latitude && company.longitude && (
            <Box marginTop="15px">
              <Map
                disabled
                latitude={parseFloat(company?.latitude)}
                longitude={parseFloat(company?.longitude)}
                markers={[
                  {
                    latitude: parseFloat(company?.latitude),
                    longitude: parseFloat(company?.longitude)
                  }
                ]}
              />
            </Box>
          )}
        </Grid>
        <Grid item md={1}>
          <Box display="flex" justfyContent="flex-end">
            <Button onClick={toggleOpenEdit}>Editar</Button>
          </Box>
        </Grid>
      </Grid>

      {company && openEdit && (
        <CompanyModal
          type="UPDATE"
          data={company}
          open={openEdit}
          successFunction={fetchCompanyDetails}
          onClose={toggleOpenEdit}
        />
      )}
    </Box>
  )
}

export default Details
