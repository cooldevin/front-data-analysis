import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { JSX } from 'react';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/auth/verify', {
          credentials: 'same-origin'
        });
        
        if (!response.ok && location.pathname !== '/login') {
          navigate('/login', { state: { from: location } });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, location]);
};

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
  useAuthGuard();
  return children;
};