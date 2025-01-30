import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import CampaignOverview from "./components/campaignoverview";
import CharacterOverview from "./components/characteroverview";
import Notes from "./components/notes";
import MonsterOverview from "./components/monsteroverview";
import APISearch from "./components/search";
import Rulebook from "./components/rulebook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <CampaignOverview />,
      },
    ],
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <CampaignOverview />,
      },
    ],
  },
  {
    path: "/notes",
    element: <App />,
    children: [
      {
        path: "/notes",
        element: <Notes />,
      },
    ],
  },
  {
    path: "/characters",
    element: <App />,
    children: [
      {
        path: "/characters",
        element: <CharacterOverview />,
      },
    ],
  },
  {
    path: "/monsters",
    element: <App />,
    children: [
      {
        path: "/monsters",
        element: <MonsterOverview/>
      },
    ],
  },
  {
    path: "/search",
    element: <App />,
    children: [
      {
        path: "/search",
        element: <APISearch/>
      },
    ],
  },
  {
    path: "/rules",
    element: <App />,
    children: [
      {
        path: "/rules",
        element: <Rulebook/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);