import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import CalculatorPage from "./pages/CalculatorPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <Router>
      <div className="app" data-theme={theme}>
        <nav className="navbar">
          <h2>SolarRecom</h2>

          <div>
           
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            {isAuthenticated && (
              <button type="button" className="link-button" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<CalculatorPage />} />
            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPage setAuth={setIsAuthenticated} />
                ) : (
                  <LoginPage setAuth={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <LoginPage setAuth={setIsAuthenticated} />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
