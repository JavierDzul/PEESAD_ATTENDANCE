import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import home from '../../assets/icons/home.png';
import logoLetras from '../../assets/icons/letrasLogo.png';
import logoImage from '../../assets/logo.svg';
import pasarLista from '../../assets/icons/pasarLista.png';
import verLista from '../../assets/icons/verLista.png';
import { RootState } from '../../store/store';
import { useRoleChangeListener } from '../hooks/useRoleChangeListener';

export const Sidebar = () => {
  useRoleChangeListener();

  const activeStyle = {
    background: '#f3f3f3',
    fontWeight: 'bold',
  };

  const disabledStyle: React.CSSProperties = {
    pointerEvents: 'none' as 'none',
    opacity: 0.5,
    color: 'grey',
  };

  const { typeUser } = useSelector((state: RootState) => state.auth);

  return (
    <div
      className='offcanvas offcanvas-start sidebarNav border-0 shadow-sm'
      tabIndex={-1}
      id='offcanvasExample'
      aria-labelledby='offcanvasExampleLabel'
    >
      <div className='offcanvas-header d-flex justify-content-center'>
        <img className='image-logo' src={logoLetras} width={'60%'} />
      </div>

      <div className='offcanvas-body p-0'>
        <div className='d-flex justify-content-center'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? activeStyle
                    : typeUser === null
                    ? disabledStyle
                    : undefined
                }
                className={`nav-link d-flex flex-column align-items-center ${
                  typeUser === null ? 'disabled-link' : ''
                }`}
                to='/home'
              >
                <img src={home} width={35} alt='Icon' />
                <span className='fs-6'>Home</span>
              </NavLink>
            </li>

            {typeUser === 'Tutor' && (
              <>
       
                <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) =>
                      isActive
                        ? activeStyle
                        : typeUser === null
                        ? disabledStyle
                        : undefined
                    }
                    className={`nav-link d-flex flex-column align-items-center ${
                      typeUser === null ? 'disabled-link' : ''
                    }`}
                    to='/list'
                  >
                    <img src={pasarLista} width={35} alt='Icon' />
                    <span className='fs-6'>Pasar lista</span>
                  </NavLink>
                </li>
              </>
            )}

            {typeUser === 'Profesor' && (
              <>
                <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) =>
                      isActive
                        ? activeStyle
                        : typeUser === null
                        ? disabledStyle
                        : undefined
                    }
                    className={`nav-link d-flex flex-column align-items-center ${
                      typeUser === null ? 'disabled-link' : ''
                    }`}
                    to='/list'
                  >
                    <img src={verLista} width={35} alt='ver lista' />
                    <span className='fs-6'>Ver lista</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className=' d-flex justify-content-center'>
        <img src={logoImage} width='50%' alt='Carrer' />
      </div>
    </div>
  );
};


/*
         <li className='nav-item'>
                  <NavLink
                    style={({ isActive }) =>
                      isActive
                        ? activeStyle
                        : typeUser === null
                        ? disabledStyle
                        : undefined
                    }
                    className={`nav-link d-flex flex-column align-items-center ${
                      typeUser === null ? 'disabled-link' : ''
                    }`}
                    to='/class'
                  >
                    <img src={clases} width={35} alt='class' />
                    <span className='fs-6'>Clases</span>
                  </NavLink>
                </li>
*/