import React from 'react'

class Menu extends React.Component 
{
  render() 
  {
      return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <a href="#!" className="brand-link">
            <img src="dist/img/logoSiata.png" alt="AdminLTE Logo" className="brand-image" />
            <span className="brand-text font-weight-light"><strong>SISAT</strong></span>
          </a>
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src="dist/img/alina.jpg" className="img-circle elevation-2" alt="User " />
              </div>
              <div className="info">
                <a href="#!" className="d-block">Alina Miranda</a>
              </div>
            </div>
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item has-treeview menu-open">
                  <a href="#!" className="nav-link">
                    <i className="nav-icon far fa-plus-square" />
                    <p>
                      Indice
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="./cartera/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Cartera</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./estado/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Estado</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./marca/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Marca</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoNoSensor/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo No Sensor</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoSensor/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Sensor</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoServicio/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Servicio</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoNovedad/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Novedad</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoConsumible/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Consumible</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoComponente/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Componente</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./red/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Red</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoAdquisicion/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Adquisicion</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoMueble/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Mueble</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./tipoJardin/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Jardin</p>
                      </a>
                    </li>
                    
                  </ul>
                </li>

                {/* EN PROCESO */}


                <li className="nav-item has-treeview menu-open">
                  <a href="#!" className="nav-link">
                    <i className="nav-icon far fa-plus-square" />
                    <p>
                      En proceso
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    
                    <li className="nav-item">
                      <a href="./tipoComunicacion/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Tipo Comunicacion</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./prioridad/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Prioridad</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="./proveedor/" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Proveedor</p>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
    );
  }
}

export default Menu;