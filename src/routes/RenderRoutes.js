import { memo, useEffect, useState } from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { useSelector, useDispatch } from 'react-redux'
import authActions from '../state/actions/auth'
import routes from './routes'
import { Loading } from '../components/UI'

function RenderRoutes() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const authenticateUser = async () => {
    setLoading(true)
    dispatch(authActions.getLoggedUser())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        window.location.reload()
        window.localStorage.removeItem('token')
      })
  }

  useEffect(() => {
    if (isAuthenticated) {
      authenticateUser()
    } else if (!isAuthenticated) {
      window.localStorage.removeItem('token')
    }
  }, [isAuthenticated])

  return (
    <Switch>
      {loading ? (
        <Loading
          loading={loading}
          center
          centerVertically
          height="100vh"
          width="100vh"
          size={60}
        />
      ) : (
        renderRoutes(routes, { authenticated: isAuthenticated })
      )}
    </Switch>
  )
}

export default memo(RenderRoutes)
