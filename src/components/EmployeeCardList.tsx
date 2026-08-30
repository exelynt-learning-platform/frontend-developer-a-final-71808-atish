import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Employee } from "../types/employee";

interface EmployeeCardListProps {
  employees: Employee[];
  deletingId: string | null;
  onDelete: (employee: Employee) => void;
}

const EmployeeCardList = ({
  employees,
  deletingId,
  onDelete,
}: EmployeeCardListProps) => {
  return (
    <Box
      sx={{
        display: { xs: "grid", md: "none" },
        gap: 2,
      }}
    >
      {employees.map((employee) => (
        <Paper
          component="article"
          key={employee.id}
          elevation={0}
          sx={{
            p: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
         <Stack
  direction="row"
  spacing={2}
  sx={{
    alignItems: "flex-start",
    justifyContent: "space-between",
  }}
>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{fontWeight:700}}
              >
                {employee.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Employee
              </Typography>
            </Box>

            <Chip
              label={`ID ${employee.id}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1.5} sx={{alignItems:"center"}}>
              <EmailOutlinedIcon
                fontSize="small"
                color="action"
                aria-hidden="true"
              />

              <Typography
                variant="body2"
                sx={{
                  overflowWrap: "anywhere",
                  minWidth: 0,
                }}
              >
                {employee.email}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{alignItems:"center"}}>
              <PhoneOutlinedIcon
                fontSize="small"
                color="action"
                aria-hidden="true"
              />

              <Typography variant="body2">
                {employee.mobile}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{alignItems:"center"}}>
              <PublicOutlinedIcon
                fontSize="small"
                color="action"
                aria-hidden="true"
              />

              <Typography variant="body2">
                {employee.country}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
            <Button
              component={Link}
              to={`/employees/${employee.id}/edit`}
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              fullWidth
            >
              Edit
            </Button>

            <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteOutlineRoundedIcon />}
              disabled={deletingId === employee.id}
              onClick={() => onDelete(employee)}
              fullWidth
            >
              Delete
            </Button>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default EmployeeCardList;