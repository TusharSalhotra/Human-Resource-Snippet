import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Shift {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface SchedulingState {
  shifts: Shift[];
  loading: boolean;
}

const initialState: SchedulingState = {
  shifts: [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'John Doe',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Main Office',
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jane Smith',
      date: '2024-01-15',
      startTime: '10:00',
      endTime: '18:00',
      location: 'Branch Office',
    },
  ],
  loading: false,
};

const schedulingSlice = createSlice({
  name: 'scheduling',
  initialState,
  reducers: {
    addShift: (state, action: PayloadAction<Shift>) => {
      state.shifts.push(action.payload);
    },
    updateShift: (state, action: PayloadAction<Shift>) => {
      const index = state.shifts.findIndex(shift => shift.id === action.payload.id);
      if (index !== -1) {
        state.shifts[index] = action.payload;
      }
    },
    deleteShift: (state, action: PayloadAction<number>) => {
      state.shifts = state.shifts.filter(shift => shift.id !== action.payload);
    },
  },
});

export const { addShift, updateShift, deleteShift } = schedulingSlice.actions;
export default schedulingSlice.reducer;