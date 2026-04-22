import React, { useState } from 'react';
import { Tabs, Table, Button, Modal, Form, Input, Select, Space, Tag } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  status: 'open' | 'closed';
  applicants: number;
}

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  status: 'applied' | 'screened' | 'interviewed' | 'offered' | 'hired';
  appliedDate: string;
}

const ApplicantTracking: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([
    {
      id: 1,
      title: 'Software Engineer',
      department: 'Engineering',
      location: 'New York',
      status: 'open',
      applicants: 15,
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco',
      status: 'open',
      applicants: 8,
    },
  ]);

  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      position: 'Software Engineer',
      status: 'interviewed',
      appliedDate: '2024-01-10',
    },
    {
      id: 2,
      name: 'Bob Wilson',
      email: 'bob.wilson@email.com',
      position: 'Product Manager',
      status: 'screened',
      appliedDate: '2024-01-08',
    },
    {
      id: 3,
      name: 'Carol Brown',
      email: 'carol.brown@email.com',
      position: 'Software Engineer',
      status: 'applied',
      appliedDate: '2024-01-12',
    },
  ]);

  const [isJobModalVisible, setIsJobModalVisible] = useState(false);
  const [jobForm] = Form.useForm();

  const showJobModal = () => {
    jobForm.resetFields();
    setIsJobModalVisible(true);
  };

  const handleJobCancel = () => {
    setIsJobModalVisible(false);
    jobForm.resetFields();
  };

  const handleJobSubmit = (values: any) => {
    const newJob: JobPosting = {
      id: Date.now(),
      ...values,
      applicants: 0,
    };
    setJobPostings([...jobPostings, newJob]);
    setIsJobModalVisible(false);
    jobForm.resetFields();
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      applied: 'blue',
      screened: 'orange',
      interviewed: 'purple',
      offered: 'green',
      hired: 'green',
    };
    return colors[status] || 'default';
  };

  const jobColumns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'open' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Applicants',
      dataIndex: 'applicants',
      key: 'applicants',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: JobPosting) => (
        <Button type="link" icon={<EyeOutlined />}>
          View Details
        </Button>
      ),
    },
  ];

  const candidateColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Candidate) => (
        <Button type="link" icon={<EyeOutlined />}>
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>Applicant Tracking System</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showJobModal}>
          Post New Job
        </Button>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Job Postings" key="1">
          <Table
            columns={jobColumns}
            dataSource={jobPostings}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </TabPane>

        <TabPane tab="Candidates" key="2">
          <Table
            columns={candidateColumns}
            dataSource={candidates}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
      </Tabs>

      <Modal
        title="Post New Job"
        open={isJobModalVisible}
        onCancel={handleJobCancel}
        footer={null}
      >
        <Form
          form={jobForm}
          layout="vertical"
          onFinish={handleJobSubmit}
        >
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: 'Please enter job title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select>
              <Option value="Engineering">Engineering</Option>
              <Option value="Product">Product</Option>
              <Option value="Design">Design</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="HR">HR</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="open">Open</Option>
              <Option value="closed">Closed</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Post Job
              </Button>
              <Button onClick={handleJobCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApplicantTracking;