import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import ErrorPage from "./routes/ErrorPage";

import StickyNoteBoard from "./components/StickyNoteBoard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route
        path={"/"}
        element={<StickyNoteBoard />}
        errorElement={<ErrorPage />}
      />,
    ])
  );

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
