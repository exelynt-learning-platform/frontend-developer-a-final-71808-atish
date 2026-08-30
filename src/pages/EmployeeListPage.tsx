import { useEffect } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearEmployeeSearch,
  fetchEmployees,
  searchEmployeeById,
} from "../features/employees/employeeSlice";
import EmployeeSearch from "../components/EmployeeSearch";
import EmployeeTable from "../components/EmployeeTable";

const EmployeeListPage = () => {
  const dispatch = useAppDispatch();

  const {
    employees,
    loading,
    error,
    searchedEmployee,
    searchLoading,
    searchError,
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

  const displayedEmployees = searchedEmployee
    ? [searchedEmployee]
    : employees;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Employee Management
        </Typography>

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

        {!loading && !error && displayedEmployees.length > 0 && (
          <EmployeeTable employees={displayedEmployees} />
        )}
      </Box>
    </Container>
  );
};

export default EmployeeListPage;