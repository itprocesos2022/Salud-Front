import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { PageHeading, Wrapper } from '../../components/UI'

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    height: '15vh'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '85vh'
  },
  button: {
    textDecoration: 'none',
    fontSize: 'x-large',
    color: '#f6f6f6',
    '&:hover': {
      color: '#3c71a9'
    },
    '&:active': {
      color: '#3c71a9'
    }
  },
  box: {
    cursor: 'pointer',
    background: '#e74426',
    borderRadius: '25%',
    transition: '0.5s',
    padding: '4%',
    '&:hover': {
      background: 'red',
      transition: '0.5s'
    }
  }
}))

const SelectSystem = () => {
  const classes = useStyles()
  const history = useHistory()

  const ScamNavigation = () => {
    history.push('/scam/home')
  }

  const SictraNavigation = () => {
    history.push('/sictra/home')
  }

  return (
    <Wrapper>
      <div className={classes.header}>
        <PageHeading>Selecciona un Sistema</PageHeading>
      </div>
      <div className={classes.buttons}>
        <div className={classes.box} onClick={ScamNavigation}>
          <a href="/scam/home" className={classes.button}>
            Scam
          </a>
        </div>
        <div className={classes.box} onClick={SictraNavigation}>
          <a href="/sictra/home" className={classes.button}>
            Sictra
          </a>
        </div>
      </div>
    </Wrapper>
  )
}

export default SelectSystem
