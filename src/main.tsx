import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router.tsx'
import { Provider } from 'react-redux'
import { store } from './services/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
