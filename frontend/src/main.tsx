import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import "./index.css";
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { Login, Home, } from "./pages";
import { getAuthToken } from "./utils";
import { queryClient } from "./queryclient";

const checkAuth = async () => {
  const token = await getAuthToken()

  if (!token) {
    return redirect("/login");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    loader: checkAuth,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
