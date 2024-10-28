import { createBrowserRouter, Navigate, Outlet, RouteObject } from 'react-router-dom'
import { Layout } from '../../components/layout'
import { Login } from '../../pages/login'

export const ROUTES = {
  base: '/',
  login: '/login',
}

const privateRoutes: RouteObject[] = [{ element: <Layout />, path: ROUTES.base }]
const publicRoutes: RouteObject[] = [
  {
    element: <Login />,
    path: ROUTES.login,
  },
]

const PrivateRoutes = () => {
  const isAuth = !!localStorage.getItem('token')
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.login} />
}

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
])
