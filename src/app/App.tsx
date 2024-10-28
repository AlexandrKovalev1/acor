import 'react-toastify/dist/ReactToastify.css'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from '../services/store.ts'
import { router } from './router/router.tsx'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position={'bottom-center'} theme={'dark'} />
    </Provider>
  )
}

export default App
