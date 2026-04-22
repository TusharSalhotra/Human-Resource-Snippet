import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addEmployee, updateEmployee, deleteEmployee } from '../redux/slices/employeeSlice';

const { Option } = Select;

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'active' | 'inactive';
}

const EmployeeManagement: React.FC = () => {
  const employees = useSelector((state: RootState) => state.employees.employees);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form] = Form.useForm();

  const showModal = (employee?: Employee) => {
    setEditingEmployee(employee || null);
    if (employee) {
      form.setFieldsValue(employee);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingEmployee(null);
    form.resetFields();
  };

  const handleSubmit = (values: any) => {
    const employeeData = {
      ...values,
      id: editingEmployee ? editingEmployee.id : Date.now(),
    };

    if (editingEmployee) {
      dispatch(updateEmployee(employeeData));
    } else {
      dispatch(addEmployee(employeeData));
    }

    setIsModalVisible(false);
    setEditingEmployee(null);
    form.resetFields();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  const columns = [
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
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Employee) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>Employee Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Employee
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter employee name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please enter position' }]}
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
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingEmployee ? 'Update' : 'Add'} Employee
              </Button>
              <Button onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeManagement;