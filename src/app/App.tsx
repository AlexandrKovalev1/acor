import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Outlet />
    </>
  )
}

// <ToastContainer position={'bottom-center'} theme={'dark'} />
export default App
