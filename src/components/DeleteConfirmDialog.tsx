import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { Employee } from "../types/employee";

interface DeleteConfirmDialogProps {
  employee: Employee | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog = ({
  employee,
  loading,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog
      open={Boolean(employee)}
      onClose={loading ? undefined : onClose}
    >
      <DialogTitle>Delete employee?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete{" "}
          <strong>{employee?.name}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;