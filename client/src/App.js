import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { useSelector} from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AddLead from "./pages/form/AddLead";
import AddEmployee from "./pages/form/AddEmployee";
import UsersLead from "./pages/tables/UsersLead";
import AllLead from "./pages/tables/AllLeaad";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import EditLead from "./pages/form/EditLead";
import EditAdminLead from "./pages/form/EditAdminLead";
import ViewLead from "./components/ViewLead";
import ViewLeadAdmin from "./components/ViewLeadAdmin";
function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <>
    {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
    <BrowserRouter>
    <Routes>
              <Route path="/sign-up" element={<PublicRoute><Registration/></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/add-new-lead" element={<ProtectedRoute><AddLead/></ProtectedRoute>} />
              <Route path="/all-lead" element={<ProtectedRoute><UsersLead /></ProtectedRoute>} />
              <Route path="/all-lead/:id/edit-lead" element={<ProtectedRoute><EditLead /></ProtectedRoute>} />
              <Route path="/all-lead/:id/user-specific-details" element={<ProtectedRoute><ViewLead /></ProtectedRoute>} />
              <Route path="/admin/all-lead" element={<ProtectedRoute><AllLead /></ProtectedRoute>} />
              <Route path="/admin/all-lead/:id/edit-lead" element={<ProtectedRoute><EditAdminLead /></ProtectedRoute>} />
              <Route path="/admin/all-lead/:id/user-specific-details" element={<ProtectedRoute><ViewLeadAdmin/></ProtectedRoute>} />
              <Route path="/admin/add-new-employee" element={<ProtectedRoute><AddEmployee/></ProtectedRoute>} />
              <Route path="/*" element={<Navigate to="/"/>}/> 
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
