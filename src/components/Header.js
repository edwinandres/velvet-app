import React from 'react'
import siataImg from '../images/siata.png'
import logoSiataAmva from '../images/Logos-SIATA_AMVA_Blanco.png'
import logoVelvet from '../images/velvetLogo.png'


class Header extends React.Component {
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <header className="  mb-4 col-12" style={{ color: "blue", width: "auto", backgroundColor: "#09202E" }}>
          <a className="nav-link" data-widget="pushmenu" href="/" role="button" style={{ marginTop: "20px", float: "left", alignItems: "left", textAlign: "left", color: "white" }}><i className="fas fa-bars" /></a>
          <a href={process.env.REACT_APP_HOMEPAGE} className="nav-link" style={{ float: "left", marginTop: "20px", alignItems: "center", textAlign: "center", verticalAlign: "center", color: "white" }}>Home</a>
          <img src={logoVelvet} style={{ width: '10%', right: "0", float: "right" }} alt='logo' />
        </header>
      </nav>
    );
  }
}

export default Header;
