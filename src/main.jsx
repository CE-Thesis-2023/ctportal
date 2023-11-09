import { EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import RootLayout from './pages/Root';
import CameraDashboard from './pages/cameras/list/CameraDashboard.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import ErrorPage from './pages/errors/ErrorPage';
import EventDashboard from './pages/events/EventDashboard';
import StreamDashboard from './pages/streams/list/StreamDashboard.jsx';
import StreamViewer from './pages/streams/viewer/StreamViewer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/streams',
        element: <StreamDashboard />,
      },
      {
        path: '/streams/cameras',
        element: <CameraDashboard />,
      },
      {
        path: '/streams/views/:streamId',
        element: <StreamViewer />,
      },
      {
        path: '/detection/events',
        element: <EventDashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EuiProvider colorMode='light'>
      <RouterProvider router={router} />
    </EuiProvider>
  </React.StrictMode>
);
