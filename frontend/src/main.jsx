import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createRouteFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'


// Auth



// Restricted User



// Routes
const router = createBrowserRouter(
  createRouteFromElements(
    <Route path='/' element={<App />}>

    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
