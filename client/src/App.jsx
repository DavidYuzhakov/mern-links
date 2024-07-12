import { NavBar, Loader } from "./components"
import AuthContextProvider from "./context/AuthContext"
import { useAuth } from "./hooks/auth.hook"
import { useRoutes } from "./routes"

function App() {
  const {token, login, logout, userId, isReady} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  if (!isReady) {
    return <Loader />
  }

  return (
    <AuthContextProvider value={{token, login, logout, userId, isAuth}}>
      {isAuth && <NavBar />}
      <div className="container">
        {routes}
      </div>
    </AuthContextProvider>
  )
}

export default App
