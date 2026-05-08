// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute: protegeix una ruta per autenticació i, opcionalment, per rol.
 *
 * Props:
 *   - allowedRole {string|null}: rol requerit ('client', 'admin'). Si null, només cal estar autenticat.
 *   - redirectTo   {string}: on redirigir si el rol no coincideix (per defecte '/')
 *   - children     {ReactNode}: component a renderitzar si té accés
 */
const PrivateRoute = ({ children, allowedRole = null, redirectTo = '/' }) => {
  const { user, loading } = useAuth();

  // Mentre es carrega la sessió des de localStorage, no renderitzem res
  if (loading) return null;

  // Sense sessió → login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Rol incorrecte → redirect (per defecte, a l'arrel)
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PrivateRoute;
