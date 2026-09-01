import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";

const EmployeeListPage = lazy(
  () => import("./pages/EmployeeListPage"),
);

const EmployeeFormPage = lazy(
  () => import("./pages/EmployeeFormPage"),
);

const App = () => {
  return (
    <>
      <AppHeader />

      <Suspense
        fallback={
          <Box
            sx={{
              minHeight: "60vh",
              display: "grid",
              placeItems: "center",
            }}
          >
            <CircularProgress aria-label="Loading page" />
          </Box>
        }
      >
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />

          <Route
            path="/employees/add"
            element={<EmployeeFormPage />}
          />

          <Route
            path="/employees/:id/edit"
            element={<EmployeeFormPage />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;