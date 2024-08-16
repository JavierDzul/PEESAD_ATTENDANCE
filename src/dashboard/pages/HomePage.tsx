import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useRoleChangeListener } from '../hooks/useRoleChangeListener';

export const HomePage = () => {
  useRoleChangeListener();
  const { typeUser, isLoadingRole } = useSelector((state: RootState) => state.auth);

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      {isLoadingRole ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      ) : typeUser === null ? (
        <div className="alert alert-warning d-flex align-items-center p-4" role="alert" style={{ fontSize: '1.25rem' }}>
          <i className="fa-solid fa-triangle-exclamation me-3" style={{ fontSize: '2rem' }}></i>
          <div>Comunícate con el administrador para que te asignen un rol en el sistema.</div>
        </div>
      ) : (
        <div className="alert alert-success d-flex align-items-center p-4" role="alert" style={{ fontSize: '1.25rem' }}>
          <i className="fa-solid fa-user me-3" style={{ fontSize: '2rem' }}></i>
          <div>Bienvenido usuario</div>
        </div>
      )}
    </div>
  )
}
