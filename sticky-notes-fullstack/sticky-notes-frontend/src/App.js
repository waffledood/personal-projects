import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import Login from "./components/auth/Login";
import ErrorPage from "./routes/ErrorPage";

import StickyNoteBoard from "./components/StickyNoteBoard";

function App() {
  // TODO - Handle authentication of user (useContext?)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route
        path={"/"}
        element={isAuthenticated ? <StickyNoteBoard /> : <Login />}
        errorElement={<ErrorPage />}
      />,
    ])
  );

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
