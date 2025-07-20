import React from 'react';
import Login from './components/Login';
import {Navigate, Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Profile from "./components/Profile";

function App() {
    const theme = createTheme();

    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
          <Route
              path="/login"
              element={
                  localStorage.getItem('token') ? <Navigate to="/dashboard" replace /> : <Login />
              }
          />
          <Route
              path="/register"
              element={
                  localStorage.getItem('token') ? <Navigate to="/dashboard" replace /> : <Register />
              }
          />
          <Route
              path="/dashboard"
              element={
                  <ProtectedRoute>
                      <Dashboard />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/profile"
              element={
                  <ProtectedRoute>
                      <Profile />
                  </ProtectedRoute>
              }
          />
          <Route path="*" element={<Login />} />
      </Routes>
      </ThemeProvider>
  );
}

export default App;
