import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Employee } from "../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  deletingId: string | null;
  onDelete: (employee: Employee) => void;
}

const EmployeeTable = ({
  employees,
  deletingId,
  onDelete,
}: EmployeeTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} hover>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.mobile}</TableCell>
              <TableCell>{employee.country}</TableCell>

              <TableCell align="right">
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ justifyContent: 'center' }}
                >
                  <Button
                    component={Link}
                    to={`/employees/${employee.id}/edit`}
                    size="small"
                    variant="outlined"
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    disabled={deletingId === employee.id}
                    onClick={() => onDelete(employee)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;