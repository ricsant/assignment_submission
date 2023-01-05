import './App.css';
import CodeReviewerDashboard from './CodeReviewerDashboard';
import Dashboard from './Dashboard';
import AssignmentView from './AssignmentView';
import PrivateRoute from './PrivateRoute';
import Homepage from './Homepage';
import Login from './Login';
import { Route, Routes } from "react-router-dom";
import { useLocalState } from './util/useLocalStorage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import jwt_decode from "jwt-decode";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [role, setRole] = useState(getRoleFromJWT());

  function getRoleFromJWT() {
    // obter a role do jwt e atribuir via setRole
    const decodedJwt = jwt_decode(jwt);
    

  }

  return (
    <Routes>
      <Route path="/dashboard" element={
        role === "ROLE_CODE_REVIEWER" ? (
          <PrivateRoute>
            <CodeReviewerDashboard />
          </PrivateRoute>
        ) : (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )
      } />
      <Route path="/assignments/:id" element={
        <PrivateRoute>
          <AssignmentView />
        </PrivateRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
