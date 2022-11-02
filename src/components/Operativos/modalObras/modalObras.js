import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Grid, InputAdornment } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  PageHeading,
  TextField,
  Button,
  SubmitButton,
  InputLabel,
  Select
} from '../../UI'
import { Dialog, DatePicker, CompanyRow } from '../../Shared'
import programasActions from '../../../state/actions/programas'
import prestadoresActions from '../../../state/actions/prestadores'
// import prestacionesActions from '../../../state/actions/prestaciones'
import companiesActions from '../../../state/actions/companies'
import constructionActions from '../../../state/actions/constructions'
import usersActions from '../../../state/actions/users'
// import teamsActions from '../../../state/actions/teams'
import operativosActions from '../../../state/actions/operativos'
import SearchCompany from '../../Companies/SearchCompany'

const validationSchema = Yup.object({
  empresa_id: Yup.number().required('Seleccione Empresa'),
  construction_name: Yup.string().required('Seleccione Obra'),
  prestador_name: Yup.string().required('Seleccione Prestador'),
  prestacion_name: Yup.string().required('Seleccione Prestación'),
  team_name: Yup.string().required('Seleccione Equipo'),
  fecha: Yup.date().required('Seleccione Fecha'),
  asistente_social_names: Yup.string().required('Seleccione asistente social'),
  asistente_operaciones_nombres: Yup.string().required(
    'Seleccione asistente de operaciones'
  ),
  gestor_nombres: Yup.string().required('Seleccione gestor'),
  precio: Yup.number().required('Ingrese precio')
})

const ModalObras = ({
  open,
  onClose,
  type,
  data,
  idOperativo,
  setUpdateObras
}) => {
  const dispatch = useDispatch()
  const { isMobile } = useSelector((state) => state.ui)
  const { list: programList } = useSelector((state) => state.programas)
  // const [prestaciones, setPrestaciones] = useState([])
  const [prestador, setPrestador] = useState([])
  const [selectedPrestador, setSelectedPrestador] = useState()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [constructionList, setConstructionList] = useState([])
  const [users, setUsers] = useState([])
  const [socialAssistance, setSocialAssistance] = useState([])
  // const [teams, setTeams] = useState([])
  const [creatingObras, setCreatingObras] = useState(false)
  const formik = useFormik({
    validationSchema,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
    initialValues: {
      empresa_id: type === 'UPDATE' ? data?.empresa.id : '',
      obra_id: type === 'UPDATE' ? data?.obra.id : '',
      fecha: type === 'UPDATE' ? data?.operativosTerrenos.fecha : '',
      precio: type === 'UPDATE' ? data?.operativosTerrenos.precio : '',
      asistente_social_id:
        type === 'UPDATE' ? data?.operativosTerrenos.asistente_social_id : '',
      gestor_id: type === 'UPDATE' ? data?.operativosTerrenos.gestor_id : '',
      asistente_operaciones_id:
        type === 'UPDATE'
          ? data?.operativosTerrenos.asistente_operaciones_id
          : '',
      company_name: type === 'UPDATE' ? data?.empresa.name : '',
      construction_name: type === 'UPDATE' ? data?.obra.name : '',
      asistente_social_names:
        type === 'UPDATE'
          ? data?.operativosTerrenos.asistente_social_names
          : '',
      gestor_nombres:
        type === 'UPDATE' ? data?.operativosTerrenos.gestor_nombres : '',
      asistente_operaciones_nombres:
        type === 'UPDATE'
          ? data?.operativosTerrenos.asistente_operaciones_nombres
          : '',
      construction_address:
        type === 'UPDATE' ? data?.operativosTerrenos.construction_address : '',
      programa_id: type === 'UPDATE' ? data?.programa_id : '',
      prestacion_id: type === 'UPDATE' ? data?.prestacion_id : ''
    }
  })
  // const [pageFilter, setPageFilters] = useState({
  //   page: 0,
  //   limit: 10,
  //   search: ''
  // })

  // const handlePrestador = (_, value) => {
  //   if (value) {
  //     formik.setFieldValue('prestador_id', value.id)
  //     formik.setFieldValue('prestador_name', value.razon_social)
  //     formik.setFieldValue('prestador_rut', value.prestador_rut)
  //   }
  //   if (!value) {
  //     formik.setFieldValue('prestador_id', '')
  //     formik.setFieldValue('prestador_name', '')
  //     formik.setFieldValue('prestador_rut', '')
  //   }
  // }

  // const handlePrestacion = (_, value) => {
  //   if (value) {
  //     formik.setFieldValue('prestacion_id', value.id)
  //     formik.setFieldValue('prestacion_name', value.nombre_prestacion)
  //   }
  //   if (!value) {
  //     formik.setFieldValue('prestacion_id', '')
  //     formik.setFieldValue('prestacion_name', '')
  //   }
  // }

  // const handleTeam = (_, value) => {
  //   if (value) {
  //     formik.setFieldValue('equipo_id', value.id)
  //     formik.setFieldValue('team_name', value.nombre)
  //     formik.setFieldValue('team_sucursal_name', value.sucursal)
  //   }
  //   if (!value) {
  //     formik.setFieldValue('equipo_id', '')
  //     formik.setFieldValue('equipo_name', '')
  //     formik.setFieldValue('team_sucursal_name', '')
  //   }
  // }

  const handleAsistenteSocial = (_, value) => {
    if (value) {
      formik.setFieldValue('asistente_social_id', value.id)
      formik.setFieldValue(
        'asistente_social_names',
        `${value.names} ${value.paternal_surname} ${value.maternal_surname}`
      )
    }
    if (!value) {
      formik.setFieldValue('asistente_social_id', '')
      formik.setFieldValue('asistente_social_names', '')
    }
  }

  const handleAsistenteOperaciones = (_, value) => {
    if (value) {
      formik.setFieldValue('asistente_operaciones_id', value.id)
      formik.setFieldValue(
        'asistente_operaciones_nombres',
        `${value.names} ${value.paternal_surname} ${value.maternal_surname}`
      )
    }
    if (!value) {
      formik.setFieldValue('asistente_operaciones_id', '')
      formik.setFieldValue('asistente_operaciones_nombres', '')
    }
  }

  const handleGestor = (_, value) => {
    if (value) {
      formik.setFieldValue('gestor_id', value.id)
      formik.setFieldValue(
        'gestor_nombres',
        `${value.names} ${value.paternal_surname} ${value.maternal_surname}`
      )
    }
    if (!value) {
      formik.setFieldValue('gestor_id', '')
      formik.setFieldValue('gestor_nombres', '')
    }
  }

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
      formik.setFieldValue('obra_id', value.id)
      formik.setFieldValue('construction_name', value.name)
      formik.setFieldValue('construction_address', value.address)
    }
    if (!value) {
      formik.setFieldValue('obra_id', '')
      formik.setFieldValue('construction_name', '')
      formik.setFieldValue('construction_address', '')
    }
  }

  useEffect(() => {
    dispatch(programasActions.getProgramas())
  }, [])

  useEffect(() => {
    if (type === 'UPDATE' && formik.values.empresa_id) {
      dispatch(
        companiesActions.getCompany(formik.values.empresa_id, false)
      ).then((res) => setSelectedCompany(res))
    }
  }, [formik.values.empresa_id])
  useEffect(() => {
    dispatch(prestadoresActions.getPrestadores()).then((res) =>
      setPrestador(res.prestadores.rows)
    )
    dispatch(
      usersActions.getUsers({ search: '', skip: 0, state: 'ACTIVE' })
    ).then((res) => setUsers(res))
    dispatch(usersActions.getSocialAssistanceList()).then((res) =>
      setSocialAssistance(res)
    )
  }, [])

  useEffect(() => {
    formik.setFieldValue('empresa_id', selectedCompany?.id)
    formik.setFieldValue('company_name', selectedCompany?.business_name)
    if (selectedCompany) {
      handleGetConstructions(selectedCompany.id)
    }
  }, [selectedCompany])

  useEffect(() => {
    if (formik.values.obra_id && constructionList.length > 0) {
      const currentCons = constructionList.find(
        (item) => item.id === parseInt(formik.values.obra_id, 10)
      )
      formik.setFieldValue('construction_name', currentCons?.name || '')
    }
  }, [formik.values.obra_id, constructionList])
  // useEffect(() => {
  //   if (selectedPrestador?.id) {
  //     dispatch(
  //       prestadoresActions.getPrestacionByPrestador(selectedPrestador.id)
  //     ).then((res) => setPrestaciones(res.prestador.rows[0].prestaciones))
  //     dispatch(
  //       teamsActions.getTeams({
  //         ...pageFilter,
  //         id_prestador: selectedPrestador.id
  //       })
  //     ).then((res) =>
  //       res.equipos.rows ? setTeams(res.equipos.rows) : setTeams(res.equipos)
  //     )
  //   }
  // }, [selectedPrestador])

  // useEffect(() => {
  //   dispatch(prestacionesActions.getPrestaciones()).then(
  //     (newPrestacionesData) => {
  //       console.log(newPrestacionesData.prestaciones)
  //       setPrestaciones(newPrestacionesData.prestaciones)
  //     }
  //   )
  // }, [])

  useEffect(() => {
    if (
      type === 'UPDATE' &&
      !selectedPrestador &&
      prestador.length > 0 &&
      formik.values.prestador_id
    ) {
      setSelectedPrestador(
        prestador[
          prestador.findIndex(
            (item) => item.id === parseInt(formik.values.prestador_id, 10)
          )
        ]
      )
    }
  }, [type, prestador])

  const createObras = () => {
    setCreatingObras(true)
    dispatch(
      operativosActions.createObras({
        ...formik.values,
        programa_name: programList.rows.find(
          (e) => e.id === formik.values.programa_id
        ).nombre,
        prestador_name: prestador.find(
          (e) => e.id === formik.values.prestador_id
        ).nombre_prestador
      })
    ).then(() => {
      setCreatingObras(false)
      setUpdateObras(true)
      onClose()
    })
  }
  const updateOperativo = () => {
    setCreatingObras(true)
    dispatch(
      operativosActions.updateOperativoTerreno(idOperativo, formik.values)
    ).then(() => {
      setCreatingObras(false)
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
        <PageHeading variant="h5">{`${
          type === 'UPDATE' ? 'Actualizar' : 'Crear'
        } operativo en terreno`}</PageHeading>
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
                      formik.setFieldValue('obra_id', '')
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
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={constructionList}
                value={
                  constructionList.length > 0 && formik.values.obra_id
                    ? constructionList[
                        constructionList.findIndex(
                          (item) =>
                            item.id === parseInt(formik.values.obra_id, 10)
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
                      formik.touched.obra_id && Boolean(formik.errors.obra_id)
                    }
                    helperText={formik.touched.obra_id && formik.errors.obra_id}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DatePicker
                disabledFuture={false}
                value={formik.values.fecha}
                label={'Fecha del operativo'}
                onChange={(date) => {
                  const parsedDate = new Date(date).toISOString()
                  formik.setFieldValue('fecha', parsedDate)
                }}
              />
            </Grid>
          </Grid>

          <Select
            onChange={(e) => {
              formik.setFieldValue('prestador_id', parseInt(e.target.value, 10))
            }}
            label="Prestador"
          >
            <option value="">Prestación</option>
            {prestador && (
              <>
                {prestador.map((item) => (
                  <option value={item.id}>{item.nombre_prestador}</option>
                ))}
              </>
            )}
          </Select>

          <Grid container spacing={2}>
            {/* //Poner programas */}
            <Grid item xs={12} md={6}>
              <Select
                onChange={(e) => {
                  formik.setFieldValue(
                    'programa_id',
                    parseInt(e.target.value, 10)
                  )
                }}
                label="Programa"
              >
                <option value="">
                  SELECCIONE PROGRAMA DEL{' '}
                  {formik.values.fecha.split('-')[0] || '*Seleccione fecha*'}
                </option>
                {programList.rows && (
                  <>
                    {programList.rows
                      .filter(
                        (e) =>
                          e.age ===
                          parseInt(formik.values.fecha.split('-')[0], 10)
                      )
                      .map((item) => (
                        <option value={item.id}>{item.nombre}</option>
                      ))}
                  </>
                )}
              </Select>
            </Grid>
            {/* //Poner programas */}
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={socialAssistance}
                value={
                  socialAssistance.length > 0 &&
                  formik.values.asistente_social_id
                    ? socialAssistance[
                        socialAssistance.findIndex(
                          (item) =>
                            item.id ===
                            parseInt(formik.values.asistente_social_id, 10)
                        )
                      ]
                    : null
                }
                getOptionLabel={(option) =>
                  `${option?.names?.toUpperCase()} ${option?.paternal_surname?.toUpperCase()} ${option?.maternal_surname?.toUpperCase()}`
                }
                onChange={handleAsistenteSocial}
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
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={users}
                value={
                  users.length > 0 && formik.values.asistente_operaciones_id
                    ? users[
                        users.findIndex(
                          (item) =>
                            item.id ===
                            parseInt(formik.values.asistente_operaciones_id, 10)
                        )
                      ]
                    : null
                }
                getOptionLabel={(option) =>
                  `${option?.names} ${option?.paternal_surname} ${option?.maternal_surname}`
                }
                onChange={handleAsistenteOperaciones}
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
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={users}
                value={
                  users.length > 0 && formik.values.gestor_id
                    ? users[
                        users.findIndex(
                          (item) =>
                            item.id === parseInt(formik.values.gestor_id, 10)
                        )
                      ]
                    : null
                }
                getOptionLabel={(option) =>
                  `${option?.names} ${option?.paternal_surname} ${option?.maternal_surname}`
                }
                onChange={handleGestor}
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
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Precio"
                type="number"
                name="precio"
                onChange={formik.handleChange}
                value={formik.values.precio}
                onBlur={formik.handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }}
                error={formik.touched.precio && Boolean(formik.errors.precio)}
                helperText={formik.touched.precio && formik.errors.precio}
              />
            </Grid>
          </Grid>
          <Box textAlign="center" marginTop="10px">
            <Button variant={'outlined'} onClick={onClose}>
              Cancelar
            </Button>
            {/* <Button
              variant={'outlined'}
              onClick={() => {
                console.log({
                  ...formik.values,
                  programa_name: programList.rows.find(
                    (e) => e.id === formik.values.programa_id
                  ).nombre
                })
              }}
            >
              Ver
            </Button> */}
            {type === 'UPDATE' ? (
              <SubmitButton
                loading={creatingObras}
                onClick={updateOperativo}
                disabled={!formik.isValid}
              >
                Actualizar
              </SubmitButton>
            ) : (
              <SubmitButton
                loading={creatingObras}
                onClick={createObras}
                disabled={Object.values(formik.values).includes('')}
              >
                Crear
              </SubmitButton>
            )}
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ModalObras
