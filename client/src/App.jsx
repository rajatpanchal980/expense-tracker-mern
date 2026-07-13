import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Dashboard */}
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      {/* Login */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" replace />}
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={!token ? <Signup /> : <Navigate to="/" replace />}
      />

      {/* Invalid Route */}
      <Route
        path="*"
        element={<Navigate to={token ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;