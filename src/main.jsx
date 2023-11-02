import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// componentes
import Layout  from './components/Layout';
import ErrorPage from './components/ErrorPage';

//paginas
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente';
import Index, { loader as clientesLoader } from './pages/Index';
import UpdateCliente, { loader as editarClienteLoader, action as editarClienteAction } from './pages/UpdateCliente';
import { action as deleteClienteAction } from './components/Cliente';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index/>,
        loader : clientesLoader,
        errorElement: <ErrorPage/>
      },
      {
        path:'/clientes/nuevo',
        element: <NuevoCliente/>,
        action: nuevoClienteAction
      },
      {
        path:'/clientes/:id/editar',
        element: <UpdateCliente/>,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path:'/clientes/:id/eliminar',
        action: deleteClienteAction
      }
    ],
    
  },
]) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
