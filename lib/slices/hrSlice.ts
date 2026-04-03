import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  joinDate: string;
  phone: string;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: 'حاضر' | 'غياب' | 'إجازة';
}

interface HRState {
  employees: Employee[];
  attendance: Attendance[];
}

const initialState: HRState = {
  employees: [],
  attendance: [],
};

const hrSlice = createSlice({
  name: 'hr',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(e => e.id === action.payload.id);
      if (index >= 0) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(e => e.id !== action.payload);
    },
    recordAttendance: (state, action: PayloadAction<Attendance>) => {
      state.attendance.push(action.payload);
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee, recordAttendance } = 
  hrSlice.actions;
export default hrSlice.reducer;
