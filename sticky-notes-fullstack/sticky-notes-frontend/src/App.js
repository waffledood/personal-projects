import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import ErrorPage from "./routes/ErrorPage";

import StickyNoteBoard from "./components/StickyNoteBoard";

function App() {
  // TODO - Handle authentication of user (useContext?)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<StickyNoteBoard />} />
        </Route>

        {/* catch all */}
        <Route path="error" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
