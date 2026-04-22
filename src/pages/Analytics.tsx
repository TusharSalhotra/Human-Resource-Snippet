import React from 'react';
import { Row, Col, Card } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Analytics: React.FC = () => {
  const analytics = useSelector((state: RootState) => state.analytics.data);

  const revenueData = [
    { month: 'Jan', revenue: analytics.monthlyRevenue[0] },
    { month: 'Feb', revenue: analytics.monthlyRevenue[1] },
    { month: 'Mar', revenue: analytics.monthlyRevenue[2] },
    { month: 'Apr', revenue: analytics.monthlyRevenue[3] },
    { month: 'May', revenue: analytics.monthlyRevenue[4] },
    { month: 'Jun', revenue: analytics.monthlyRevenue[5] },
  ];

  const employeeData = [
    { month: 'Jan', employees: analytics.employeeGrowth[0] },
    { month: 'Feb', employees: analytics.employeeGrowth[1] },
    { month: 'Mar', employees: analytics.employeeGrowth[2] },
    { month: 'Apr', employees: analytics.employeeGrowth[3] },
    { month: 'May', employees: analytics.employeeGrowth[4] },
    { month: 'Jun', employees: analytics.employeeGrowth[5] },
  ];

  return (
    <div>
      <h1>Analytics Dashboard</h1>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Monthly Revenue Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Employee Growth">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="employees" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <h3>Employee Statistics</h3>
            <p>Total Employees: {analytics.totalEmployees}</p>
            <p>Active Employees: {analytics.activeEmployees}</p>
            <p>Inactive Employees: {analytics.totalEmployees - analytics.activeEmployees}</p>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <h3>Shift Statistics</h3>
            <p>Total Shifts: {analytics.totalShifts}</p>
            <p>Completed Shifts: {analytics.completedShifts}</p>
            <p>Completion Rate: {Math.round((analytics.completedShifts / analytics.totalShifts) * 100)}%</p>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <h3>Performance Metrics</h3>
            <p>Average Revenue: ${Math.round(analytics.monthlyRevenue.reduce((a, b) => a + b, 0) / analytics.monthlyRevenue.length)}</p>
            <p>Employee Growth Rate: +{Math.round(((analytics.employeeGrowth[5] - analytics.employeeGrowth[0]) / analytics.employeeGrowth[0]) * 100)}%</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;