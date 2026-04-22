import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addShift, updateShift, deleteShift } from '../redux/slices/schedulingSlice';
import dayjs from 'dayjs';

const { Option } = Select;

interface Shift {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}

const Scheduling: React.FC = () => {
  const shifts = useSelector((state: RootState) => state.scheduling.shifts);
  const employees = useSelector((state: RootState) => state.employees.employees);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [form] = Form.useForm();

  const showModal = (shift?: Shift) => {
    setEditingShift(shift || null);
    if (shift) {
      form.setFieldsValue({
        ...shift,
        date: dayjs(shift.date),
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingShift(null);
    form.resetFields();
  };

  const handleSubmit = (values: any) => {
    const selectedEmployee = employees.find(emp => emp.id === values.employeeId);
    const shiftData = {
      ...values,
      id: editingShift ? editingShift.id : Date.now(),
      employeeName: selectedEmployee?.name || '',
      date: values.date.format('YYYY-MM-DD'),
    };

    if (editingShift) {
      dispatch(updateShift(shiftData));
    } else {
      dispatch(addShift(shiftData));
    }

    setIsModalVisible(false);
    setEditingShift(null);
    form.resetFields();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteShift(id));
  };

  const columns = [
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Shift) => (
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
        <h1>Shift Scheduling</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Shift
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={shifts}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingShift ? 'Edit Shift' : 'Add Shift'}
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
            name="employeeId"
            label="Employee"
            rules={[{ required: true, message: 'Please select employee' }]}
          >
            <Select>
              {employees.map(employee => (
                <Option key={employee.id} value={employee.id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: 'Please enter start time' }]}
          >
            <Input type="time" />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: 'Please enter end time' }]}
          >
            <Input type="time" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingShift ? 'Update' : 'Add'} Shift
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

export default Scheduling;