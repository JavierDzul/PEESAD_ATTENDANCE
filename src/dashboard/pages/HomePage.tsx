import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useRoleChangeListener } from '../hooks/useRoleChangeListener';
import { NavLink } from 'react-router-dom';
import pasarLista from '../../assets/icons/pasarLista.png';
import verLista from '../../assets/icons/verLista.png';
import tutor from '../../assets/tutor.svg';

export const HomePage = () => {
  useRoleChangeListener();
  const { typeUser, user } = useSelector((state: RootState) => state.auth);

  const cardStyle: React.CSSProperties = {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    padding: '20px',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    width: '100%',
    maxWidth: '350px',
    margin: '0 auto',
  };

  const activeStyle = {
    background: '#e0e0e0',
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: '8px',
  };

  const imgStyle: React.CSSProperties = {
    marginTop: '15px',
  };

  const alertTextStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    fontWeight: '500',
    marginTop: '10px',
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '85vh' }}>
      {typeUser === null ? (
        <div className="alert alert-warning d-flex align-items-center p-3 text-center" role="alert" style={{ fontSize: '1rem' }}>
          <i className="fa-solid fa-triangle-exclamation me-2" style={{ fontSize: '1.5rem' }}></i>
          <div>Comunícate con el administrador para que te asignen un rol en el sistema.</div>
        </div>
      ) : (
        <div style={cardStyle}>
          <div className="alert alert-success p-4" role="alert">
            <div style={alertTextStyle}>
              ¡Hola {user?.name} {user?.lastName}!
            </div>
            <div>
              {typeUser === 'Tutor'
                ? '¿Listo para guiar a tus estudiantes hoy?'
                : 'Esperamos que tengas un excelente día enseñando.'}
            </div>
            <img style={imgStyle} src={tutor} width={150} alt='Tutor' />
          </div>

          {typeUser === 'Tutor' && (
            <NavLink
              to='/list'
              className='nav-link d-flex flex-column align-items-center mb-3 d-block d-md-none'
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
            >
              <img src={pasarLista} width={40} alt='Pasar lista' />
              <span className='mt-2' style={{ fontSize: '0.9rem' }}>Pasar lista</span>
            </NavLink>
          )}

          {typeUser === 'Profesor' && (
            <NavLink
              to='/list'
              className='nav-link d-flex flex-column align-items-center d-block d-md-none'
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
            >
              <img src={verLista} width={40} alt='Ver lista' />
              <span className='mt-2' style={{ fontSize: '0.9rem' }}>Ver lista</span>
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};
