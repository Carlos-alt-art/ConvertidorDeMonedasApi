import React from 'react';
import logo from "./img/MConverter_redondo.png";

function BarraNav({ handleButtonClick }) {
    const handleConvertidorClick = () => {
        handleButtonClick('Componente1'); 
    };

    const handleHistoricoClick = () => {
        handleButtonClick('Historico');  
    };

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand me-auto" href="/">
                    <img src={logo} alt="Logo" width="70" height="70" className="d-inline-block align-text-top" />
                </a>

                <div className="container">
                    <div className="row">
                        <div className="col"> 
                            <button className="btn btn-info d-inline me-4" onClick={handleConvertidorClick}>Convertidor</button>
                            <button className="btn btn-info d-inline me-4" onClick={handleHistoricoClick}>Histórico</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default BarraNav;
