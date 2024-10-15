import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  if (!localStorage.getItem('blog-platform-userState')) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
}

export { ProtectedRoute };
