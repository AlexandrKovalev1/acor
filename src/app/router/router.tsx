import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { Layout } from '../../components/layout'
import { Login } from '../../pages/login'

const ROUTES = {
  base: '/',
  login: '/login',
  classes: '/classes',
}

const PrivateRoutes = () => {
  // if (isLoading) return <InitLoading />

  return true ? <Outlet /> : <Navigate to={ROUTES.login} />
}

const router = createBrowserRouter([
  {
    path: ROUTES.base,
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <div>rkfcctc</div>,
            path: ROUTES.classes,
          },
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
