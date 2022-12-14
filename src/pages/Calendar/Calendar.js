import { memo, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { endOfWeek, startOfWeek } from 'date-fns'
import { Box, Typography } from '@material-ui/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import assistanceActions from '../../state/actions/assistance'
import { Wrapper } from '../../components/UI'
import { useMenu, useSuccess, useToggle } from '../../hooks'
import { ConfirmDelete } from '../../components/Shared'
import useStyles from './styles'
import './custom.css'
import { formatHours } from '../../formatters'
import Cards from '../../components/Calendar/CalendarResume'
import socialCasesActions from '../../state/actions/socialCase'

import FiltersMenu from './FiltersMenu'

const EventsCalendar = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const calendarApi = useRef()
  const [currentDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [rangeDate, setRangeDate] = useState({ start: null, end: null })
  const [currentView, setCurrentView] = useState('dayGridMonth')
  const [filters, setFilters] = useState({
    start_date: startOfWeek(currentDate),
    end_date: endOfWeek(currentDate),
    users: [],
    type: ''
  })
  const [calendarView, setCalendarView] = useState('')
  const {
    open: openfilters,
    handleOpen: handleOpenfilters,
    handleClose: handleClosefilters,
    anchorEl: anchorElfilters
  } = useMenu()
  const { handleOpen: handleOpenTask } = useMenu()
  const { calendarEvents } = useSelector((state) => state.assistance)
  const { calendarTasks } = useSelector((state) => state.socialCase)
  const { user } = useSelector((state) => state.auth)
  const [events, setEvents] = useState([])
  const [currentEvent, setCurrentEvent] = useState(null)
  const { open: openConfirmDelete, toggleOpen: toggleOpenConfirmDelete } =
    useToggle()
  const { open: openCancel, toggleOpen: toggleOpenCancel } = useToggle()
  const { open: openFinish, toggleOpen: toggleOpenFinish } = useToggle()
  const { open: openStart, toggleOpen: toggleOpenStart } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const fetchEvents = (query) => {
    dispatch(
      assistanceActions.getCalendarEvents({
        ...query,
        start_date: query.start_date
          ? new Date(query.start_date).toISOString()
          : null,
        end_date: query.end_date
          ? new Date(query.end_date).toISOString()
          : null,
        user_id: user?.id || null
      })
    )
  }

  const onCancelEvent = () => {
    setLoading(true)
    dispatch(
      assistanceActions.patchEvent(currentEvent.visitId, {
        status: 'CANCELADA'
      })
    )
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento cancelado', { variant: 'success' })
          toggleOpenCancel()
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onFinishedEvent = () => {
    setLoading(true)
    dispatch(
      assistanceActions.patchEvent(currentEvent.visitId, {
        status: 'TERMINADA'
      })
    )
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento terminado', { variant: 'success' })
          toggleOpenFinish()
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onStartEvent = () => {
    setLoading(true)
    dispatch(
      assistanceActions.patchEvent(currentEvent.visitId, { status: 'INICIADA' })
    )
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento actualizado a iniciado', {
            variant: 'success'
          })
          toggleOpenStart()
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const onDeleteEvent = (id) => {
    setLoading(true)
    dispatch(assistanceActions.deleteEvent(id))
      .then(() => {
        setLoading(false)
        fetchEvents(filters)
        changeSuccess(true, () => {
          enqueueSnackbar('Evento eliminado', { variant: 'success' })
          toggleOpenConfirmDelete()
        })
      })
      .catch((err) => {
        setLoading(false)
        enqueueSnackbar(err, { variant: 'error' })
      })
  }

  const getBgColorShift = (shiftName) => {
    if (shiftName === 'MANA??A') return '#f6e68f'
    if (shiftName === 'TARDE') return '#81d88d'
    if (shiftName === 'COMPLETA') return '#aed5ff'

    if (shiftName === 'COVID') return '#8c92ac'
    if (shiftName === 'AT.CESANTES') return '#b87333'
    return '#ff3800'
  }

  const getCardClass = (shiftName) => {
    if (shiftName === 'MANA??A') return classes.yellow
    if (shiftName === 'TARDE') return classes.green
    if (shiftName === 'COMPLETA') return classes.blue
    if (shiftName === 'COVID') return classes.grey
    if (shiftName === 'AT.CESANTES') return classes.brown
    return classes.orange
  }

  const renderCard = ({ event }) => {
    const { shift_name, start_date, end_date, isTask } = event.extendedProps
    return (
      <Box
        className={clsx(
          classes.eventCard,
          isTask && classes.task,
          getCardClass(shift_name)
        )}
      >
        {!isTask && (
          <Typography className={classes.hours}>
            {`${formatHours(start_date)}-${formatHours(end_date)}`}
          </Typography>
        )}
        <Typography className={classes.title}>{event.title}</Typography>
        <Typography className={classes.status}>
          {isTask ? 'Tarea' : shift_name}
        </Typography>
      </Box>
    )
  }

  const fetchInterventionPlanTasks = (query) => {
    dispatch(
      socialCasesActions.getPlansForCalendar({
        startDate: query.start_date
          ? new Date(query.start_date).toISOString()
          : null,
        endDate: query.end_date ? new Date(query.end_date).toISOString() : null
      })
    )
  }
  useEffect(() => {
    const list = [
      ...calendarEvents.map((item) => ({
        ...item,
        visitId: item.id,
        date: new Date(item.date),
        start: new Date(item.start_date),
        end: new Date(item.end_date),
        isTask: false,
        backgroundColor: getBgColorShift(item.status)
      })),
      ...calendarTasks.map((item) => ({
        ...item,
        taskId: item.id,
        isCompleted: item.isCompleted,
        title: item.managementName,
        allDay: true,
        isTask: true,
        date: new Date(item.nextDate),
        backgroundColor: '#3C83FF'
      }))
    ]
    setEvents(list)
  }, [calendarEvents, calendarTasks])

  useEffect(() => {
    if (rangeDate.start && rangeDate.end) {
      setFilters({
        ...filters,
        start_date: rangeDate.start,
        end_date: rangeDate.end
      })
    }
  }, [rangeDate])

  useEffect(() => {
    if (!calendarView) {
      fetchEvents(filters)
      fetchInterventionPlanTasks(filters)
    } else if (calendarView === 'TASKS') {
      dispatch(assistanceActions.cleanCalendarEvents())
      fetchInterventionPlanTasks(filters)
    } else {
      dispatch(socialCasesActions.cleanCalendarPlans())
      fetchEvents(filters)
    }
  }, [filters, calendarView])

  return (
    <div>
      <Box mt={1} mb={2}>
        <Cards query={filters} />
      </Box>
      <Wrapper>
        <FiltersMenu
          open={openfilters}
          onClose={handleClosefilters}
          anchorEl={anchorElfilters}
          value={{ users: filters.users, type: calendarView }}
          handleChangeUsers={(users) => setFilters({ ...filters, users })}
          handleChangeType={(type) => setCalendarView(type)}
        />
        <Box miHeight="600px">
          <FullCalendar
            ref={calendarApi}
            firstDay={1}
            droppable={false}
            height="700px"
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            customButtons={{
              filters: {
                text: 'Filtros',
                click: (e) => {
                  handleOpenfilters(e)
                }
              }
            }}
            headerToolbar={{
              left: 'prev,today,next',
              center: 'title',
              right: 'timeGridDay,timeGridWeek,dayGridMonth,filters,export'
            }}
            buttonText={{
              today: 'Hoy',
              month: 'Mes',
              week: 'Semana',
              day: 'D??a'
            }}
            locale="es"
            displayEventTime={true}
            initialView={currentView}
            nowIndicator={true}
            events={events}
            datesSet={(e) => {
              setCurrentView(e.view.type)
              setRangeDate({ start: e.start, end: e.end })
            }}
            allDayContent={true}
            allDaySlot={true}
            editable={false}
            selectable={true}
            eventContent={
              currentView !== 'dayGridMonth' ? renderCard : () => {}
            }
            eventClick={(event) => {
              setCurrentEvent({
                ...event.event.extendedProps,
                date: event.event.extendedProps.start_date,
                title: event.event.title
              })
              if (event.event.extendedProps.isTask) {
                handleOpenTask({ currentTarget: event.el })
              }
            }}
          />
        </Box>
      </Wrapper>

      {currentEvent && openConfirmDelete && (
        <ConfirmDelete
          open={openConfirmDelete}
          onClose={toggleOpenConfirmDelete}
          loading={loading}
          success={success}
          onConfirm={() => onDeleteEvent(currentEvent.visitId)}
          message={
            <span>
              ??Est??s seguro de eliminar este evento:
              <strong>{currentEvent.title}</strong>?
            </span>
          }
        />
      )}
      {currentEvent && openCancel && (
        <ConfirmDelete
          event="CANCEL"
          confirmText="Aceptar"
          open={openCancel}
          success={success}
          onClose={toggleOpenCancel}
          loading={loading}
          onConfirm={() => onCancelEvent()}
          message={
            <span>
              ??Est??s seguro de cancelar este evento:
              <strong>{currentEvent.title}</strong>?
            </span>
          }
        />
      )}

      {currentEvent && openFinish && (
        <ConfirmDelete
          event="FINISH"
          confirmText="Aceptar"
          open={openFinish}
          success={success}
          onClose={toggleOpenFinish}
          loading={loading}
          onConfirm={() => onFinishedEvent()}
          message={
            <span>
              ??Est??s seguro de completar este evento:
              <strong>{` ${currentEvent.title}`}</strong>?
            </span>
          }
        />
      )}
      {currentEvent && openStart && (
        <ConfirmDelete
          event="START"
          confirmText="Aceptar"
          open={openStart}
          success={success}
          onClose={toggleOpenFinish}
          loading={loading}
          onConfirm={() => onStartEvent()}
          message={
            <span>
              ??Est??s seguro de iniciar este evento:
              <strong>{` ${currentEvent.title}`}</strong>?
            </span>
          }
        />
      )}
    </div>
  )
}

export default memo(EventsCalendar)
