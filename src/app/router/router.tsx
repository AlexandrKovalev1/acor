import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { Layout } from '../../components/layout'
import { Login } from '../../pages/login'
import { Sensor } from '../../pages/sensor'

export const ROUTES = {
  base: '/',
  login: '/login',
  classes: '/classes',
  equipment: '/equipment',
  kipia: '/kipia',
  sensor: '/sensor',
}
//
// const PrivateRoutes = () => {
//   const isAuth = true
//   // if (isLoading) return <InitLoading />
//
//   return isAuth ? <Outlet /> : <Navigate to={ROUTES.login} />
// }

export const router = createBrowserRouter([
  {
    path: ROUTES.base,
    element: <Outlet />,
    children: [
      {
        element: <Layout />,
        path: ROUTES.base,
        children: [
          {
            element: <div>content</div>,
            path: ROUTES.equipment,
          },
          {
            element: <div>КИПиА</div>,
            path: ROUTES.kipia,
          },
          { element: <Sensor />, path: ROUTES.sensor },
        ],
      },
      {
        element: <Login />,
        path: ROUTES.login,
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
