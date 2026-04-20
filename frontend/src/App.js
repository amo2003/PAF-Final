import LoginPage from "./M4/pages/LoginPage";
import LoginSuccessPage from "./M4/pages/LoginSuccessPage";
import ProtectedAdminPage from "./M4/components/ProtectedAdminPage";
import NotificationsPage from "./M4/pages/NotificationsPage";
import NotificationBell from "./M4/components/NotificationBell";

function App() {
  const path = window.location.pathname;

  if (path === "/login-success") {
    return <LoginSuccessPage />;
  }

  if (path === "/admin") {
    return <ProtectedAdminPage />;
  }

  if (path === "/notifications") {
    return (
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <NotificationBell />
        </div>
        <NotificationsPage />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <NotificationBell />
      </div>
      <LoginPage />
    </div>
  );
}

export default App;