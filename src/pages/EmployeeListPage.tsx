import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearEmployeeSearch,
  clearSuccessMessage,
  deleteEmployee,
  fetchEmployees,
  searchEmployeeById,
} from "../features/employees/employeeSlice";
import EmployeeSearch from "../components/EmployeeSearch";

import { Link } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeCardList from "../components/EmployeeCardList";


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
  successMessage,
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
      <Box sx={{ py: { xs: 3, sm: 5 } }}>
     <Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={2}
  sx={{
    mb: 2,
    justifyContent: "space-between",
    alignItems: { xs: "stretch", sm: "center" },
  }}
>
  <Box>
    <Stack direction="row" spacing={1.5} sx={{alignItems: "center"}}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontSize: { xs: "1.75rem", sm: "2.125rem" } }}
      >
        Employees
      </Typography>

      <Chip
        label={employees.length}
        size="small"
        color="primary"
        variant="outlined"
      />
    </Stack>

    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
      Manage employee details and records
    </Typography>
  </Box>

  <Button
    component={Link}
    to="/employees/add"
    variant="contained"
    startIcon={<AddRoundedIcon />}
    sx={{ alignSelf: { xs: "stretch", sm: "center" } }}
  >
    Add employee
  </Button>
</Stack>

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
  <>
    <EmployeeTable
      employees={displayedEmployees}
      deletingId={deletingId}
      onDelete={setEmployeeToDelete}
    />

    <EmployeeCardList
      employees={displayedEmployees}
      deletingId={deletingId}
      onDelete={setEmployeeToDelete}
    />
  </>
)}


    
        <DeleteConfirmDialog
  employee={employeeToDelete}
  loading={Boolean(deletingId)}
  onClose={() => setEmployeeToDelete(null)}
  onConfirm={handleConfirmDelete}
/>
      </Box>


      <Snackbar
  open={Boolean(successMessage)}
  autoHideDuration={3500}
  onClose={() => dispatch(clearSuccessMessage())}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "center",
  }}
>
  <Alert
    severity="success"
    variant="filled"
    onClose={() => dispatch(clearSuccessMessage())}
    sx={{ width: "100%" }}
  >
    {successMessage}
  </Alert>
</Snackbar>
    </Container>

    
  );
};

export default EmployeeListPage;