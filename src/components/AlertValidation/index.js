import React from 'react';
import './index.css';

const AlertValidation = (props) => {
  return (
    <div {...props}>
      {props.children}
    </div>
  )
}

export default AlertValidation;