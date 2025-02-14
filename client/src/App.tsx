import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Employees from './components/employees/EmployeeList'
import EmployeeForm from './components/employees/EmployeeForm'
import EmployeeDetails from './components/employees/EmployeeDetails'
import LeaveList from './components/leave/LeaveList'
import LeaveForm from './components/leave/LeaveForm'
import LeaveDetails from './components/leave/LeaveDetails'
import PaymentList from './components/salary/SalaryList'
import PaymentForm from './components/salary/SalaryForm'
import PaymentDetails from './components/salary/SalaryDetails'
import ProjectList from './components/project/ProjectList'
import ProjectForm from './components/project/ProjectForm'
import Login from './components/auth/Login'
import Registration from './components/auth/Registration'
import Profile from './components/auth/Profile'
import PrivateRoute from './components/auth/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard' // Importing Dashboard component

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/employees">Employees</Link></li>
            <li><Link to="/leave">Leave</Link></li>
            <li><Link to="/salary">Salary</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Registration} />
          <Route path="/profile" element={<PrivateRoute component={Profile} />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/employees" element={<PrivateRoute component={Employees} />} />
          <Route path="/employees/create" element={<PrivateRoute component={EmployeeForm} />} />
          <Route path="/employees/:id/edit" element={<PrivateRoute component={EmployeeForm} />} />
          <Route path="/employees/:id/details" element={<PrivateRoute component={EmployeeDetails} />} />
          <Route path="/leave" element={<PrivateRoute component={LeaveList} />} />
          <Route path="/leave/create" element={<PrivateRoute component={LeaveForm} />} />
          <Route path="/leave/:id/edit" element={<PrivateRoute component={LeaveForm} />} />
          <Route path="/leave/:id/details" element={<PrivateRoute component={LeaveDetails} />} />
          <Route path="/salary" element={<PrivateRoute component={PaymentList} />} />
          <Route path="/salary/create" element={<PrivateRoute component={PaymentForm} />} />
          <Route path="/salary/:id/edit" element={<PrivateRoute component={PaymentForm} />} />
          <Route path="/salary/:id/details" element={<PrivateRoute component={PaymentDetails} />} />
          <Route path="/projects" element={<PrivateRoute component={ProjectList} />} />
          <Route path="/projects/create" element={<PrivateRoute component={ProjectForm} />} />
          <Route path="/projects/:id/edit" element={<PrivateRoute component={ProjectForm} />} />
          <Route path="/" Component={Login} />
        </Routes>
      </div>
    </Router>
  )
}

export default App