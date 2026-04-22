import React from 'react';
import { Row, Col, Card, Statistic, Progress } from 'antd';
import { UserOutlined, ScheduleOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Dashboard: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.employees);
  const shifts = useSelector((state: RootState) => state.scheduling.shifts);
  const analytics = useSelector((state: RootState) => state.analytics.data);

  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const completedShifts = shifts.length; // Simplified for demo

  return (
    <div>
      <h1>HRM Dashboard</h1>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Employees"
              value={analytics.totalEmployees}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Employees"
              value={analytics.activeEmployees}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Shifts"
              value={analytics.totalShifts}
              prefix={<ScheduleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completed Shifts"
              value={analytics.completedShifts}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Employee Status" style={{ height: 300 }}>
            <Progress
              type="circle"
              percent={Math.round((activeEmployees / analytics.totalEmployees) * 100)}
              format={(percent) => `${percent}% Active`}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Shift Completion Rate" style={{ height: 300 }}>
            <Progress
              type="circle"
              percent={Math.round((completedShifts / analytics.totalShifts) * 100)}
              format={(percent) => `${percent}% Completed`}
              status="success"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;