import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '../../components/layout'
import { Login } from '../../pages/login'
import App from '../App.tsx'

export const ROUTES = {
  base: '/',
  login: '/login',
  classes: '/classes',
  equipment: '/equipment',
  kipia: '/kipia',
  sensor: '/classInfoPage',
}

const PrivateRoute = () => {
  const isAuth = !!localStorage.getItem('token')

  return isAuth ? <Layout /> : <Navigate to={ROUTES.login} />
}

export const router = createBrowserRouter([
  {
    path: ROUTES.base,
    element: <App />,
    children: [
      {
        element: <PrivateRoute />,
        path: ROUTES.base,
      },
      {
        element: <Login />,
        path: ROUTES.login,
      },
    ],
  },
])
