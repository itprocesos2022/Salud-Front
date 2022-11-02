import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Grid, InputAdornment } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { useFormik } from 'formik'
import {
  PageHeading,
  TextField,
  Button,
  SubmitButton,
  InputLabel
} from '../../UI'
import { Dialog, CompanyRow } from '../../Shared'
import prestadoresActions from '../../../state/actions/prestadores'
import prestacionesActions from '../../../state/actions/prestaciones'
import employeesActions from '../../../state/actions/employees'
import usersActions from '../../../state/actions/users'
import companiesActions from '../../../state/actions/companies'
import constructionActions from '../../../state/actions/constructions'
import operativosActions from '../../../state/actions/operativos'
import regiones from '../../../resources/regions.json'
import SearchCompany from '../../Companies/SearchCompany'

export default function ModalDerivacion({
  open,
  onClose,
  setUpdateDerivation,
  type,
  derivacion
}) {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const [prestador, setPrestador] = useState([])
  const [prestacion, setPrestacion] = useState([])
  const [employees, setEmployees] = useState([])
  const [rutSearch, setRutSearch] = useState()
  const [socialAssistance, setSocialAssistance] = useState([])
  const [selectedCompany, setSelectedCompany] = useState()
  const [constructionList, setConstructionList] = useState([])
  const [users, setUsers] = useState([])
  const [creatingDerivation, setCreatingDerivation] = useState(false)

  const formik = useFormik({
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      business_id: type === 'UPDATE' ? derivacion.business_id : '',
      construction_id: type === 'UPDATE' ? derivacion.construction_id : '',
      business_name: type === 'UPDATE' ? derivacion.construction_id : '',
      construction_name: type === 'UPDATE' ? derivacion.construction_id : ''
    }
  })
  const [formData, setFormData] = useState({
    empresa_id: '',
    obra_id: '',
    trabajador_id: '',
    prestacion_id: '',
    asistente_social_id: '',
    gestor_id: 1, //    <-- qué es?
    asistente_operaciones_id: ''
  })

  useEffect(() => {
    dispatch(prestadoresActions.getPrestadores()).then((data) =>
      setPrestador(data.prestadores.rows)
    )
    dispatch(prestacionesActions.getPrestaciones()).then((data) =>
      setPrestacion(data.prestaciones.rows)
    )
    dispatch(employeesActions.getEmployees({ state: 'CREATED' })).then((data) =>
      setEmployees(data.items)
    )
    dispatch(usersActions.getSocialAssistanceList()).then((data) =>
      setSocialAssistance(data)
    )
    dispatch(
      usersActions.getUsers({ search: '', skip: 0, state: 'ACTIVE' })
    ).then((data) => setUsers(data))
    setFormData({
      empresa_id: '',
      obra_id: '',
      trabajador_id: '',
      prestacion_id: '',
      asistente_social_id: '',
      gestor_id: 1, //  <-- qué es?
      asistente_operaciones_id: ''
    })
  }, [open])

  const handleGetConstructions = (idCompany) => {
    dispatch(
      constructionActions.getConstructions(
        {
          business_id: idCompany
        },
        false
      )
    ).then((res) => {
      setConstructionList(res.filter((item) => !item.is_suspended))
    })
  }
  const onConstructionSelect = (__, value) => {
    if (value) {
      formik.setFieldValue('construction_id', value.id)
      formik.setFieldValue('construction_name', value.name)
    }
  }
  useEffect(() => {
    if (type === 'UPDATE' && formik.values.business_id) {
      dispatch(
        companiesActions.getCompany(formik.values.business_id, false)
      ).then((res) => setSelectedCompany(res))
    }
  }, [formik.values.business_id])
  useEffect(() => {
    formik.setFieldValue('business_id', selectedCompany?.id)
    formik.setFieldValue('business_name', selectedCompany?.business_name)
    if (selectedCompany) {
      handleGetConstructions(selectedCompany.id)
    }
  }, [selectedCompany])
  useEffect(() => {
    if (formik.values.construction_id && constructionList.length > 0) {
      const currentCons = constructionList.find(
        (item) => item.id === parseInt(formik.values.construction_id, 10)
      )
      formik.setFieldValue('construction_name', currentCons?.name || '')
    }
  }, [formik.values.construction_id, constructionList])
  useEffect(() => {
    if (rutSearch && rutSearch.length > 5) {
      dispatch(
        employeesActions.getEmployees({ state: 'CREATED', search: rutSearch })
      ).then((data) => setEmployees(data.items))
    }
  }, [rutSearch])

  const createDerivacion = () => {
    setCreatingDerivation(true)
    dispatch(
      operativosActions.createDerivation({
        ...formData,
        empresa_id: formik.values.business_id,
        obra_id: formik.values.construction_id
      })
    ).then(() => {
      setCreatingDerivation(false)
      setUpdateDerivation(true)
      onClose()
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={isMobile}
      maxWidth={'lg'}
    >
      <Box>
        <PageHeading variant="h5">Crear operativo de derivación</PageHeading>
        <Box marginTop="20px">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {selectedCompany ? (
                <Box>
                  <InputLabel>Empresa seleccionada</InputLabel>
                  <CompanyRow
                    company={selectedCompany}
                    onDelete={() => {
                      setSelectedCompany(null)
                      setConstructionList([])
                      formik.setFieldValue('construction_id', '')
                      formik.setFieldValue('construction_name', '')
                    }}
                  />
                </Box>
              ) : (
                <SearchCompany
                  onSelected={(value) => {
                    setSelectedCompany(value)
                  }}
                  onDelete={() => {
                    setSelectedCompany(null)
                    setConstructionList([])
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={constructionList}
                value={
                  constructionList.length > 0 && formik.values.construction_id
                    ? constructionList[
                        constructionList.findIndex(
                          (item) =>
                            item.id ===
                            parseInt(formik.values.construction_id, 10)
                        )
                      ]
                    : ''
                }
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name || ''}
                onChange={onConstructionSelect}
                required
                noOptionsText="Esta empresa no tiene obras"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Obra"
                    placeholder="SELECCIONE OBRA"
                    error={
                      formik.touched.construction_id &&
                      Boolean(formik.errors.construction_id)
                    }
                    helperText={
                      formik.touched.construction_id &&
                      formik.errors.construction_id
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={prestador}
                getOptionLabel={(option) => `${option?.razon_social}` || ''}
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>{option?.razon_social?.toUpperCase()}</strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Prestador"
                    placeholder="Prestador"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={regiones.regions}
                getOptionLabel={(option) => `${option.name}` || ''}
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>{option.name.toUpperCase()}</strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Región"
                    placeholder="Región"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={prestacion}
                onChange={(_, m) =>
                  setFormData({ ...formData, prestacion_id: m.id })
                }
                getOptionLabel={(option) => `${option.nombre_prestacion}` || ''}
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>{option.nombre_prestacion.toUpperCase()}</strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Prestación"
                    placeholder="Prestación"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={employees}
                onChange={(_, m) =>
                  setFormData({ ...formData, trabajador_id: m.id })
                }
                getOptionLabel={(option) =>
                  `${option.names.toUpperCase()} ${option.paternal_surname.toUpperCase()} ${option.maternal_surname.toUpperCase()}` ||
                  ''
                }
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>
                        {option.names.toUpperCase()}{' '}
                        {option.paternal_surname.toUpperCase()}{' '}
                        {option.maternal_surname.toUpperCase()}
                      </strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccione Trabajador"
                    placeholder="Trabajador"
                    onChange={(e) => setRutSearch(e.target.value)}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={socialAssistance}
                onChange={(_, m) =>
                  setFormData({ ...formData, asistente_social_id: m.id })
                }
                getOptionLabel={(option) =>
                  `${option.names.toUpperCase()} ${option.paternal_surname.toUpperCase()} ${option.maternal_surname.toUpperCase()}` ||
                  ''
                }
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>
                        {option.names.toUpperCase()}{' '}
                        {option.paternal_surname.toUpperCase()}{' '}
                        {option.maternal_surname.toUpperCase()}
                      </strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Asistente Social"
                    placeholder="Asistente"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={users}
                onChange={(_, m) =>
                  setFormData({ ...formData, asistente_operaciones_id: m.id })
                }
                getOptionLabel={(option) =>
                  `${option.names} ${option.paternal_surname} ${option.maternal_surname}` ||
                  ''
                }
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>
                        {option.names.toUpperCase()}{' '}
                        {option.paternal_surname.toUpperCase()}{' '}
                        {option.maternal_surname.toUpperCase()}
                      </strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Asistente de Operaciones"
                    placeholder="Asistente de Operaciones"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={users}
                getOptionLabel={(option) =>
                  `${option.names} ${option.paternal_surname} ${option.maternal_surname}` ||
                  ''
                }
                renderOption={(option) => (
                  <Box>
                    <Typography>
                      <strong>
                        {option.names.toUpperCase()}{' '}
                        {option.paternal_surname.toUpperCase()}{' '}
                        {option.maternal_surname.toUpperCase()}
                      </strong>
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ejecutivo Comercial / GBS"
                    placeholder="Ejecutivo Comercial / GBS"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label={'Precio'}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Box textAlign="center" marginTop="10px">
            <Button variant={'outlined'} onClick={onClose}>
              Cancelar
            </Button>
            <SubmitButton
              loading={creatingDerivation}
              onClick={createDerivacion}
            >
              Crear
            </SubmitButton>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
