import { createSlice } from '@reduxjs/toolkit';

interface AnalyticsData {
  totalEmployees: number;
  activeEmployees: number;
  totalShifts: number;
  completedShifts: number;
  monthlyRevenue: number[];
  employeeGrowth: number[];
}

interface AnalyticsState {
  data: AnalyticsData;
  loading: boolean;
}

const initialState: AnalyticsState = {
  data: {
    totalEmployees: 150,
    activeEmployees: 142,
    totalShifts: 1200,
    completedShifts: 1180,
    monthlyRevenue: [12000, 15000, 18000, 16000, 20000, 22000],
    employeeGrowth: [120, 125, 130, 135, 140, 150],
  },
  loading: false,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
});

export default analyticsSlice.reducer;