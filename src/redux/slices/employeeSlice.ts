import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'active' | 'inactive';
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
}

const initialState: EmployeeState = {
  employees: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      position: 'Software Engineer',
      department: 'Engineering',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      position: 'Product Manager',
      department: 'Product',
      status: 'active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@company.com',
      position: 'Designer',
      department: 'Design',
      status: 'active',
    },
  ],
  loading: false,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;