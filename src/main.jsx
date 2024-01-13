import { EuiProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./pages/Root";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ErrorPage from "./pages/errors/ErrorPage";
import EventDashboard from "./pages/events/EventDashboard";
import StreamDashboard from "./pages/streams/list/StreamDashboard.jsx";
import StreamViewer from "./pages/streams/viewer/StreamViewer";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import LtdDashBoard from "./pages/ltd/LtdDashBoard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/streams",
        element: <StreamDashboard />,
      },
      {
        path: "/recs",
        element: <StreamDashboard />,
      },
      {
        path: "/metrics",
        element: <StreamDashboard />,
      },
      {
        path: "/ltd",
        element: <LtdDashBoard />,
      },
      // {
      //     path: '/streams/cameras',
      //     element: <CameraDashboard/>,
      // },
      {
        path: "/streams/views/:streamId",
        element: <StreamViewer />,
      },
      {
        path: "/events",
        element: <EventDashboard />,
      },
      {
        path: "/configs",
        element: <EventDashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <EuiProvider colorMode="light">
        <RouterProvider router={router} />
      </EuiProvider>
    </MantineProvider>
  </React.StrictMode>
);
