import { makeStyles } from '@material-ui/core'
import NavSictra from '../NavSictra'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 2,
    maxWidth: '100%',
    position: 'relative',
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3)
    }
  }
}))

const SictraLayout = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavSictra />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default SictraLayout
