import PropTypes from 'prop-types'
import { Box, IconButton, makeStyles, Switch } from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FileCopy as CloneIcon
} from '@material-ui/icons/'
import { FiDownload as DownloadIcon } from 'react-icons/fi'

const useStyles = makeStyles((theme) => ({
  root: {
    '& button': {
      padding: 10
    }
  },
  btnPrimary: {
    color: theme.palette.primary.main
  },
  btnDelete: {
    color: theme.palette.error.main
  }
}))

const ActionGroup = ({
  onEdit,
  disableEdit,
  onDelete,
  disabledDelete,
  onView,
  onDownload,
  disabledDownload,
  moreOptions,
  onClone,
  onSwitch,
  switchChecked = true
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      {moreOptions.map((item, index) => (
        <IconButton
          color="primary"
          disabled={item.disabled || false}
          key={`more-table-option-${index}`}
          onClick={item.onClick}
        >
          {item.icon}
        </IconButton>
      ))}
      {onEdit && (
        <IconButton onClick={onEdit} disabled={disableEdit}>
          <EditIcon className={classes.btnPrimary} />
        </IconButton>
      )}
      {onView && (
        <IconButton onClick={onView}>
          <ViewIcon className={classes.btnPrimary} />
        </IconButton>
      )}
      {onClone && (
        <IconButton onClick={onClone}>
          <CloneIcon className={classes.btnPrimary} />
        </IconButton>
      )}
      {onDelete && (
        <IconButton onClick={onDelete} disabled={disabledDelete}>
          <DeleteIcon className={classes.btnDelete} />
        </IconButton>
      )}
      {onDownload && (
        <IconButton onClick={onDownload} disabled={disabledDownload}>
          <DownloadIcon className={classes.btnPrimary} />
        </IconButton>
      )}
      {onSwitch && (
        <Switch
          onChange={onSwitch}
          color="primary"
          defaultChecked={switchChecked}
        />
      )}
    </Box>
  )
}

ActionGroup.defaultProps = {
  moreOptions: [],
  disabledDelete: false
}

ActionGroup.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onSwitch: PropTypes.func
}

export default ActionGroup
