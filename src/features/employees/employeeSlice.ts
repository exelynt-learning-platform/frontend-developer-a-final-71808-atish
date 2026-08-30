import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Employee } from "../../types/employee";
import { employeeService } from "../../services/employeeService";
import axios from "axios";
import type { EmployeeFormValues } from "./employeeValidation";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  searchedEmployee: Employee | null;
searchLoading: boolean;
searchError: string | null;
saving: boolean;
mutationError: string | null;
employeeToEdit: Employee | null;
editLoading: boolean;
editError: string | null;
deletingId: string | null;
successMessage: string | null;
}


const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  searchedEmployee: null,
  searchLoading: false,
  searchError: null,
  saving: false,
mutationError: null,
employeeToEdit: null,
editLoading: false,
editError: null,
deletingId: null,
successMessage: null,

};


interface UpdateEmployeePayload {
  id: string;
  values: EmployeeFormValues;
}
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
  clearMutationError: (state) => {
  state.mutationError = null;
},
clearEmployeeToEdit: (state) => {
  state.employeeToEdit = null;
  state.editError = null;
},
clearSuccessMessage: (state) => {
  state.successMessage = null;
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
})
.addCase(createEmployee.pending, (state) => {
  state.saving = true;
  state.mutationError = null;
})
.addCase(createEmployee.fulfilled, (state, action) => {
  state.saving = false;
  state.employees.push(action.payload);
  state.successMessage = "Employee added successfully";
})
.addCase(createEmployee.rejected, (state, action) => {
  state.saving = false;
  state.mutationError =
    action.payload ?? "Failed to create employee";
})
.addCase(fetchEmployeeForEdit.pending, (state) => {
  state.editLoading = true;
  state.editError = null;
  state.employeeToEdit = null;
  state.successMessage = null;
})
.addCase(fetchEmployeeForEdit.fulfilled, (state, action) => {
  state.editLoading = false;
  state.employeeToEdit = action.payload;
})
.addCase(fetchEmployeeForEdit.rejected, (state, action) => {
  state.editLoading = false;
  state.editError =
    action.payload ?? "Unable to load employee";
})
.addCase(updateEmployee.pending, (state) => {
  state.saving = true;
  state.mutationError = null;
  state.successMessage = null;
})
.addCase(updateEmployee.fulfilled, (state, action) => {
  state.saving = false;
  state.successMessage = "Employee updated successfully";

  const employeeIndex = state.employees.findIndex(
    (employee) => employee.id === action.payload.id,
  );

  if (employeeIndex !== -1) {
    state.employees[employeeIndex] = action.payload;
  }

  state.employeeToEdit = action.payload;
})
.addCase(updateEmployee.rejected, (state, action) => {
  state.saving = false;
  state.mutationError =
    action.payload ?? "Failed to update employee";
})
.addCase(deleteEmployee.pending, (state, action) => {
  state.deletingId = action.meta.arg;
  state.mutationError = null;
  state.successMessage = null;
})
.addCase(deleteEmployee.fulfilled, (state, action) => {
  state.deletingId = null;
  state.successMessage = "Employee deleted successfully";

  state.employees = state.employees.filter(
    (employee) => employee.id !== action.payload,
  );

  if (state.searchedEmployee?.id === action.payload) {
    state.searchedEmployee = null;
  }
})
.addCase(deleteEmployee.rejected, (state, action) => {
  state.deletingId = null;
  state.mutationError =
    action.payload ?? "Failed to delete employee";
})


      
  },
});


export const createEmployee = createAsyncThunk<
  Employee,
  EmployeeFormValues,
  { rejectValue: string }
>("employees/create", async (employee, thunkAPI) => {
  try {
    return await employeeService.create(employee);
  } catch {
    return thunkAPI.rejectWithValue("Failed to create employee");
  }
});

export const fetchEmployeeForEdit = createAsyncThunk<
  Employee,
  string,
  { rejectValue: string }
>("employees/fetchForEdit", async (id, thunkAPI) => {
  try {
    return await employeeService.getById(id);
  } catch {
    return thunkAPI.rejectWithValue(
      `Unable to load employee with ID ${id}`,
    );
  }
});

export const updateEmployee = createAsyncThunk<
  Employee,
  UpdateEmployeePayload,
  { rejectValue: string }
>("employees/update", async ({ id, values }, thunkAPI) => {
  try {
    return await employeeService.update(id, values);
  } catch {
    return thunkAPI.rejectWithValue("Failed to update employee");
  }
});

export const deleteEmployee = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employees/delete", async (id, thunkAPI) => {
  try {
    await employeeService.remove(id);
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete employee");
  }
});


export const {
  clearEmployeeSearch,
  clearMutationError,
  clearEmployeeToEdit,
  clearSuccessMessage,
} = employeeSlice.actions;

export default employeeSlice.reducer;