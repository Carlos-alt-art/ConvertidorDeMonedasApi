import React, { useState } from 'react';
import BarraNav from './Componentes/BarraNav';
import Componente1 from './Componentes/componente1';
import Fondo from './Componentes/fondo';
import Footer from './Componentes/Footer';
import Historico from './Componentes/Historico';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentComponent, setCurrentComponent] = useState('Componente1');

  const handleButtonClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <>
      <BarraNav handleButtonClick={handleButtonClick} />
      <Fondo />
      {currentComponent === 'Componente1' && <Componente1 />}
      {currentComponent === 'Historico' && <Historico />}
      <Footer />
    </>
  );
}

export default App;
