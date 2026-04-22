import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import Scheduling from './pages/Scheduling';
import Analytics from './pages/Analytics';
import ApplicantTracking from './pages/ApplicantTracking';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeManagement />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/applicant-tracking" element={<ApplicantTracking />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;