import React, { useState, useEffect } from 'react'
    import LineChart from 'react-apexcharts'
import BarChart from 'react-apexcharts'
import PieChart from 'react-apexcharts'
    import axios from 'axios'
    import Spinner from '../Spinner'

    const Dashboard = () => {
      const [summary, setSummary] = useState({
        totalEmployees: 0,
        activeEmployees: 0,
        pendingLeaves: 0,
        totalPayments: 0
      })
      const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        axios.get('http://localhost:5000/api/dashboard/summary')
          .then((response: any) => {
            setSummary(response.data)
            setIsLoading(false)
          })
          .catch(error => {
            console.error('Error fetching dashboard data:', error)
            setIsLoading(false)
          })
      }, [])

      if (isLoading) {
        return <Spinner />
      }

      return (
        <div className="dashboard">
          <h1>HR Dashboard</h1>
          <div className="summary-cards">
            <div className="card">
              <h2>Total Employees</h2>
              <p>{summary.totalEmployees}</p>
            </div>
            <div className="card">
              <h2>Active Employees</h2>
              <p>{summary.activeEmployees}</p>
            </div>
            <div className="card">
              <h2>Pending Leaves</h2>
              <p>{summary.pendingLeaves}</p>
            </div>
            <div className="card">
              <h2>Total Payments</h2>
              <p>${summary.totalPayments.toLocaleString()}</p>
            </div>
          </div>
          <div className="charts">
            <div className="chart">
              <LineChart
                options={{
                  chart: { type: 'line' },
                  series: [
                    {
                      name: 'Employee Count',
                      data: [65, 59, 80, 81, 56, 89, 40, 98, 78, 38, 77, 48]
                    },
                  ],
                  xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  },
                }}
              />
            </div>
            <div className="chart">
              <BarChart
                options={{
                  chart: {
                    type: 'bar'
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 10
                    },
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: 'smooth'
                  },
                  xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  },
                  yaxis: {
                    title: {
                      text: 'Employees'
                    },
                  },
                series: [
                  {
                    name: 'Active Employees',
                    data: [44, 52, 38, 24, 22, 40, 23, 45, 12, 18, 36, 20]
                  },
                ]}}
              />
            </div>
            <div className="chart">
              <PieChart
                options={{
                  labels: ['Active', 'On Leave', 'Pending', 'Terminated'],
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: '100%'
                      },
                      legend: {
                        position: 'bottom'
                      },
                    },
                  }],
                series: [44, 23, 37, 15],
                chart: {
                  type: 'pie'
                },
              }}
                />
            </div>
          </div>
        </div>
      )
    }

    export default Dashboard
