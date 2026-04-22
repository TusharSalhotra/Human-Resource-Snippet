import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  ScheduleOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/employees',
      icon: <UserOutlined />,
      label: <Link to="/employees">Employees</Link>,
    },
    {
      key: '/scheduling',
      icon: <ScheduleOutlined />,
      label: <Link to="/scheduling">Scheduling</Link>,
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: <Link to="/analytics">Analytics</Link>,
    },
    {
      key: '/applicant-tracking',
      icon: <FileTextOutlined />,
      label: <Link to="/applicant-tracking">Recruitment</Link>,
    },
  ];

  return (
    <Sider collapsible>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;