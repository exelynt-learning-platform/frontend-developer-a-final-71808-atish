import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import {
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

interface EmployeeSearchProps {
  loading: boolean;
  onSearch: (id: string) => void;
  onClear: () => void;
}

const EmployeeSearch = ({
  loading,
  onSearch,
  onClear,
}: EmployeeSearchProps) => {
  const [employeeId, setEmployeeId] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedId = employeeId.trim();

    if (!trimmedId) {
      setInputError("Please enter an employee ID");
      return;
    }

    if (!/^\d+$/.test(trimmedId)) {
      setInputError("Employee ID must contain only digits");
      return;
    }

    setInputError("");
    onSearch(trimmedId);
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) {
      setInputError("Employee ID must contain only digits");
      return;
    }

    setEmployeeId(value);
    setInputError("");

    // Restore the complete list if the input is manually emptied.
    if (!value) {
      onClear();
    }
  };

  const handleClear = () => {
    setEmployeeId("");
    setInputError("");
    onClear();
  };

  return (
    <Paper
      component="form"
      aria-label="Search employees by ID"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{
          alignItems: {
            xs: "stretch",
            sm: "flex-start",
          },
        }}
      >
        <TextField
          label="Employee ID"
          placeholder="Enter an employee ID"
          value={employeeId}
          onChange={handleInputChange}
          error={Boolean(inputError)}
          helperText={inputError}
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon color="action" />
                </InputAdornment>
              ),
            },
            htmlInput: {
              inputMode: "numeric",
              pattern: "[0-9]*",
              "aria-label": "Employee ID",
            },
          }}
          sx={{ maxWidth: { sm: 420 } }}
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchRoundedIcon />}
          disabled={loading}
          sx={{ minWidth: { sm: 120 } }}
        >
          {loading ? "Searching..." : "Search"}
        </Button>

        <Button
          type="button"
          variant="outlined"
          startIcon={<RestartAltRoundedIcon />}
          onClick={handleClear}
          disabled={loading || !employeeId}
          sx={{ minWidth: { sm: 110 } }}
        >
          Clear
        </Button>
      </Stack>
    </Paper>
  );
};

export default EmployeeSearch;