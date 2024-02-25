import React from 'react';
import './GreyBackground.css'; 

const GreyBackground = ({ children }) => {
  return (
    <div className="grey-background">
      {children}
    </div>
  );
};

export default GreyBackground;
