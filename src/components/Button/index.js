import React from 'react';
import './index.css';

const Button = (props) => {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button'
};

export default Button;