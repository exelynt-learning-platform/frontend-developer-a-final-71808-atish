import { Navigate, Route, Routes } from "react-router-dom";
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import AppHeader from "./components/AppHeader"

const App = () => {
  return (
    <>
      <AppHeader />

      <Routes>
        <Route path="/" element={<EmployeeListPage />} />
        <Route path="/employees/add" element={<EmployeeFormPage />} />
        <Route
          path="/employees/:id/edit"
          element={<EmployeeFormPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;