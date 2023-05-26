import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/main';
import Logs from './pages/logs';
import Boss from './pages/boss';
import Battle from './pages/battle';
import Count from './pages/count';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
    {
      path: '/counter',
      element: <Count />,
    },
    {
      path: '/boss',
      element: <Boss />,
    },
    {
      path: '/battle',
      element: <Battle />,
    },
    {
      path: '/logs',
      element: <Logs />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
