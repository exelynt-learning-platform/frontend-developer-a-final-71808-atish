import { useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Country } from "../types/country";
import {
  employeeSchema,
  type EmployeeFormValues,
} from "../features/employees/employeeValidation";

interface EmployeeFormProps {
  countries: Country[];
  defaultValues?: EmployeeFormValues;
  submitting: boolean;
  onSubmit: (values: EmployeeFormValues) => void;
  onCancel: () => void;
}

const emptyForm: EmployeeFormValues = {
  name: "",
  email: "",
  mobile: "",
  country: "",
  state: "",
  district: "",
};

const EmployeeForm = ({
  countries,
  defaultValues,
  submitting,
  onSubmit,
  onCancel,
}: EmployeeFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues ?? emptyForm,
  });

  useEffect(() => {
    reset(defaultValues ?? emptyForm);
  }, [defaultValues, reset]);

  return (
    <Paper sx={{ p: { xs: 2, sm: 4 } }}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 3,
          }}
        >
          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            label="Mobile"
            fullWidth
            {...register("mobile")}
            error={Boolean(errors.mobile)}
            helperText={errors.mobile?.message}
            slotProps={{
              htmlInput: {
                inputMode: "numeric",
                maxLength: 15,
              },
            }}
          />

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Country"
                fullWidth
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
              >
                {countries.map((country) => (
                  <MenuItem
                    key={country.id}
                    value={country.country}
                  >
                    {country.country}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="State"
            fullWidth
            {...register("state")}
            error={Boolean(errors.state)}
            helperText={errors.state?.message}
          />

          <TextField
            label="District"
            fullWidth
            {...register("district")}
            error={Boolean(errors.district)}
            helperText={errors.district?.message}
          />
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Employee"}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            disabled={submitting}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default EmployeeForm;