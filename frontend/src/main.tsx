import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { Login, Home } from './pages'
import { queryClient } from './queryclient'
import { api } from './api/api'

const checkAuth = async () => {
  const { response } = await api.GET('/auth/session')

  if (response.status === 401) {
    queryClient.clear()
    return redirect('/login')
  }

  if (!response.ok) {
    throw new Error(`Session check failed (${response.status})`)
  }

  return null
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    loader: checkAuth,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
