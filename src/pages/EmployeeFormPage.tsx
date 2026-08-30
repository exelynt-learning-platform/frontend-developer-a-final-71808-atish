import { useEffect, useMemo } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import EmployeeForm from "../components/EmployeeForm";
import { fetchCountries } from "../features/countries/countrySlice";
import {
  clearEmployeeToEdit,
  clearMutationError,
  createEmployee,
  fetchEmployeeForEdit,
  updateEmployee,
} from "../features/employees/employeeSlice";
import type { EmployeeFormValues } from "../features/employees/employeeValidation";

const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    countries,
    loading: countriesLoading,
    error: countriesError,
  } = useAppSelector((state) => state.countries);

  const {
    saving,
    mutationError,
    employeeToEdit,
    editLoading,
    editError,
  } = useAppSelector((state) => state.employees);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [countries.length, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeForEdit(id));
    }

    return () => {
      dispatch(clearEmployeeToEdit());
      dispatch(clearMutationError());
    };
  }, [id, dispatch]);

  const defaultValues = useMemo<EmployeeFormValues | undefined>(() => {
    if (!employeeToEdit) {
      return undefined;
    }

    return {
      name: employeeToEdit.name ?? "",
      email: employeeToEdit.email ?? "",
      mobile: employeeToEdit.mobile ?? "",
      country: employeeToEdit.country ?? "",
      state: employeeToEdit.state ?? "",
      district: employeeToEdit.district ?? "",
    };
  }, [employeeToEdit]);

  const handleSubmit = async (values: EmployeeFormValues) => {
    try {
      if (id) {
        await dispatch(
          updateEmployee({
            id,
            values,
          }),
        ).unwrap();
      } else {
        await dispatch(createEmployee(values)).unwrap();
      }

      navigate("/");
    } catch {
      // The Redux state displays the rejected error.
    }
  };

  const pageLoading =
    countriesLoading || (isEditMode && editLoading);

  const canShowForm =
    !pageLoading &&
    !countriesError &&
    !editError &&
    (!isEditMode || Boolean(employeeToEdit));

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          {isEditMode ? "Edit Employee" : "Add Employee"}
        </Typography>

        {pageLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 5,
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {countriesError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {countriesError}
          </Alert>
        )}

        {editError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {editError}
          </Alert>
        )}

        {mutationError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {mutationError}
          </Alert>
        )}

        {canShowForm && (
          <EmployeeForm
            countries={countries}
            defaultValues={defaultValues}
            submitting={saving}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/")}
          />
        )}
      </Box>
    </Container>
  );
};

export default EmployeeFormPage;