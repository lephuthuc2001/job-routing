import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import AuthProvider from "./Components/Auth";
import RequireAuth from "./Components/RequireAuth";
import JobDetail from "./Components/JobDetail";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
          <Route
            path="detail/:jobID"
            element={
              <RequireAuth>
                <JobDetail />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
