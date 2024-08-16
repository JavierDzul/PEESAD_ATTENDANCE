import React from 'react';
import logo from "./../../assets/logoCompleto.png"
import logoTecnm from "./../../assets/tecnm.svg"
import logoGob from "./../../assets/logo.svg"

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container mt-1 p-1">
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body d-flex flex-column flex-md-row">
              <div
                className="d-flex flex-column align-items-center justify-content-center w-100 w-md-50 d-none d-md-flex"
                style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}
              >
                <img src={logoGob} alt="escudo-y-logo" width={320} className="my-3" />
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center w-100 w-md-50 p-1">
                <div className="d-flex justify-content-center">
                  <img src={logo} alt="escudo-y-logo" width={180} />
                </div>
                <div className="w-100">
                  {children}
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <img src={logoTecnm} className="me-3" alt="tecnm" width={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
