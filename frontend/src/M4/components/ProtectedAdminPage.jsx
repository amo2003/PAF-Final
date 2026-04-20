import React from "react";
import AdminUsersPage from "../pages/AdminUsersPage";
import AccessDenied from "../pages/AccessDenied";

function ProtectedAdminPage() {
  const currentUserRole = "ADMIN"; // temporary for testing

  return currentUserRole === "ADMIN" ? <AdminUsersPage /> : <AccessDenied />;
}

export default ProtectedAdminPage;