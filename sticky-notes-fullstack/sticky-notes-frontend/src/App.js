import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import StickyNoteBoard from "./components/StickyNoteBoard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StickyNoteBoard />,
    },
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
