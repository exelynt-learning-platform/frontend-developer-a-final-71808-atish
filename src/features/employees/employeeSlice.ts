import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Employee } from "../../types/employee";
import { employeeService } from "../../services/employeeService";
import axios from "axios";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  searchedEmployee: Employee | null;
searchLoading: boolean;
searchError: string | null;
}


const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  searchedEmployee: null,
  searchLoading: false,
  searchError: null,
};

export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string }
>("employees/fetchEmployees", async (_, thunkAPI) => {
  try {
    return await employeeService.getAll();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load employees");
  }
});

export const searchEmployeeById = createAsyncThunk<
  Employee,
  string,
  { rejectValue: string }
>("employees/searchById", async (id, thunkAPI) => {
  try {
    return await employeeService.getById(id);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return thunkAPI.rejectWithValue(
        `No employee found with ID ${id}`,
      );
    }

    return thunkAPI.rejectWithValue(
      "Unable to search for the employee",
    );
  }
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
  clearEmployeeSearch: (state) => {
    state.searchedEmployee = null;
    state.searchError = null;
  },
},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(searchEmployeeById.pending, (state) => {
  state.searchLoading = true;
  state.searchError = null;
  state.searchedEmployee = null;
})
.addCase(searchEmployeeById.fulfilled, (state, action) => {
  state.searchLoading = false;
  state.searchedEmployee = action.payload;
})
.addCase(searchEmployeeById.rejected, (state, action) => {
  state.searchLoading = false;
  state.searchError =
    action.payload ?? "Unable to search for the employee";
});

      
  },
});
export const { clearEmployeeSearch } = employeeSlice.actions;

export default employeeSlice.reducer;