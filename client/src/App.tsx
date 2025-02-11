import React from 'react'
    import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
    import Employees from './components/employees/EmployeeList'
    import EmployeeForm from './components/employees/EmployeeForm'
    import EmployeeDetails from './components/employees/EmployeeDetails'
    import JobHistory from './components/employees/JobHistory'
    import ContractList from './components/employees/ContractList'
    import SalaryList from './components/employees/SalaryList'
    import LeaveList from './components/leave/LeaveList'
    import LeaveForm from './components/leave/LeaveForm'
    import LeaveDetails from './components/leave/LeaveDetails'
    import PaymentList from './components/salary/SalaryList'
    import PaymentForm from './components/salary/SalaryForm'
    import PaymentDetails from './components/salary/SalaryDetails'
    // import ProjectList from './components/project/ProjectList'
    import ProjectForm from './components/project/ProjectForm'
    // import ProjectDetails from './components/project/ProjectDetails'
    import Login from './components/auth/Login'
    import Registration from './components/auth/Registration'
    import Profile from './components/auth/Profile'
    import PrivateRoute from './components/auth/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'

    function App() {
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
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/employees" component={Employees} />
              <PrivateRoute path="/employees/create" component={EmployeeForm} />
              <PrivateRoute path="/employees/:id/edit" component={EmployeeForm} />
              <PrivateRoute path="/employees/:id/details" component={EmployeeDetails} />
              <PrivateRoute path="/leave" component={LeaveList} />
              <PrivateRoute path="/leave/create" component={LeaveForm} />
              <PrivateRoute path="/leave/:id/edit" component={LeaveForm} />
              <PrivateRoute path="/leave/:id/details" component={LeaveDetails} />
              <PrivateRoute path="/salary" component={PaymentList} />
              <PrivateRoute path="/salary/create" component={PaymentForm} />
              <PrivateRoute path="/salary/:id/edit" component={PaymentForm} />
              <PrivateRoute path="/salary/:id/details" component={PaymentDetails} />
              {/* <PrivateRoute path="/projects" component={ProjectList} /> */}
              <PrivateRoute path="/projects/create" component={ProjectForm} />
              <PrivateRoute path="/projects/:id/edit" component={ProjectForm} />
              {/* <PrivateRoute path="/projects/:id/details" component={ProjectDetails} /> */}
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        </Router>
      )
    }

    export default App
