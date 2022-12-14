import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme, useMediaQuery, CssBaseline, Fade } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { ConnectedRouter } from 'connected-react-router'
import { HelmetProvider } from 'react-helmet-async'
import { SnackbarProvider } from 'notistack'
import Loading from './components/UI/Loading'
import { history } from './state/store'
import theme from './utils/themeProvider'
import RenderRoutes from './routes/RenderRoutes'
import uiActions from './state/actions/ui'

function App() {
  const dispatch = useDispatch()
  const currentTheme = useTheme()
  const isMobile = useMediaQuery(currentTheme.breakpoints.down('sm'))

  useEffect(() => {
    dispatch(uiActions.setIsMobile(isMobile))
  }, [isMobile])

  return (
    <Suspense
      fallback={
        <Loading
          loading
          center
          centerVertically
          size={80}
          height={`${window.innerHeight}px`}
          width={`${window.innerWidth}px`}
        />
      }
    >
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        TransitionComponent={Fade}
        dense
        preventDuplicate
        autoHideDuration={2000}
      >
        <HelmetProvider>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <RenderRoutes />
            </ConnectedRouter>
          </ThemeProvider>
        </HelmetProvider>
      </SnackbarProvider>
    </Suspense>
  )
}

export default App
