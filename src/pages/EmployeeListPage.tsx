import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearEmployeeSearch,
  deleteEmployee,
  fetchEmployees,
  searchEmployeeById,
} from "../features/employees/employeeSlice";
import EmployeeSearch from "../components/EmployeeSearch";
import EmployeeTable from "../components/EmployeeTable";
import { Link } from "react-router-dom";

import {  useState } from "react";
import type { Employee } from "../types/employee";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

const EmployeeListPage = () => {
  const dispatch = useAppDispatch();
  const [employeeToDelete, setEmployeeToDelete] =
  useState<Employee | null>(null);

  const {
  employees,
  loading,
  error,
  searchedEmployee,
  searchLoading,
  searchError,
  deletingId,
  mutationError,
} = useAppSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleSearch = (id: string) => {
    dispatch(searchEmployeeById(id));
  };

  const handleClearSearch = () => {
    dispatch(clearEmployeeSearch());
  };

  const handleConfirmDelete = async () => {
  if (!employeeToDelete) {
    return;
  }

  try {
    await dispatch(deleteEmployee(employeeToDelete.id)).unwrap();
    setEmployeeToDelete(null);
  } catch {
    // Redux displays the error.
  }
};
  const displayedEmployees = searchedEmployee
    ? [searchedEmployee]
    : employees;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Employee Management
        </Typography>
        <Button
  component={Link}
  to="/employees/add"
  variant="contained"
  sx={{ mb: 3 }}
>
  Add Employee
</Button>

        <EmployeeSearch
          loading={searchLoading}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        {searchError && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {searchError}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && displayedEmployees.length === 0 && (
          <Alert severity="info">No employees found.</Alert>
        )}
        {mutationError && (
  <Alert severity="error" sx={{ mb: 3 }}>
    {mutationError}
  </Alert>
)}

        {!loading && !error && displayedEmployees.length > 0 && (
          <EmployeeTable
  employees={displayedEmployees}
  deletingId={deletingId}
  onDelete={setEmployeeToDelete}
/>


        )}
        <DeleteConfirmDialog
  employee={employeeToDelete}
  loading={Boolean(deletingId)}
  onClose={() => setEmployeeToDelete(null)}
  onConfirm={handleConfirmDelete}
/>
      </Box>
    </Container>
  );
};

export default EmployeeListPage;