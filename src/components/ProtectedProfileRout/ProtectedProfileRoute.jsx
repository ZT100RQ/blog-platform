import { Navigate, Outlet } from 'react-router-dom';

function ProtectedProfileRoute() {
  if (localStorage.getItem('blog-platform-userState')) {
    return <Outlet />;
  }
  return <Navigate to="/sign-in" replace />;
}

export { ProtectedProfileRoute };
