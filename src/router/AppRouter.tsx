import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { DashboardRoutes } from '../dashboard/routes';
import { RootState } from '../store/store';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { logout } from '../store/auth/authSlice';
import logo from "../assets/icons/logoAtten.png";

export const AppRouter = () => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if (tokenExpiration) {
        const expirationTime = parseInt(tokenExpiration);
        if (expirationTime < Date.now()) {
          dispatch(logout());
          navigate('/auth/login');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!loading && !isLoading) {
      if (!isAuthenticated) {
        navigate('/auth/login', { replace: true });
      } else if (isAuthenticated && window.location.pathname.startsWith('/auth')) {
        navigate('/home', { replace: true });
      }
    }
  }, [isAuthenticated, loading, isLoading, navigate]);

  if (loading || isLoading) {
    return (

      <div className='d-flex flex-column align-items-center justify-content-center'>
          <div className="d-flex justify-content-center mt-5">
              <img src={logo} alt="escudo-y-logo" width={180} style={{ borderRadius: 10 }} />
          </div>
          <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
              </div>
          </div>
      </div>
  );
  }

  return (
    <Provider store={store}>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          {isAuthenticated ? (
            <Route path='/*' element={<DashboardRoutes />} />
          ) : (
            <Route path='/auth/*' element={<AuthRoutes />} />
          )}
          <Route path='*' element={<Navigate to='/auth/login' />} />
        </Routes>
      </QueryParamProvider>
    </Provider>
  );
};
