import { useState, type FormEvent } from "react";
import { Button, Stack, TextField } from "@mui/material";

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

    setInputError("");
    onSearch(trimmedId);
  };

  const handleClear = () => {
    setEmployeeId("");
    setInputError("");
    onClear();
  };

  return (
    <Stack
      component="form"
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ mb: 3 }}
    >
      <TextField
        label="Search by employee ID"
        value={employeeId}
        onChange={(event) => setEmployeeId(event.target.value)}
        error={Boolean(inputError)}
        helperText={inputError}
        size="small"
        inputProps={{ inputMode: "numeric" }}
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>

      <Button type="button" variant="outlined" onClick={handleClear}>
        Clear
      </Button>
    </Stack>
  );
};

export default EmployeeSearch;