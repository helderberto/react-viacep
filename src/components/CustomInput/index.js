import React, { Component } from 'react';
import './index.css'

class CustomInput extends Component {
  render() {
    return(
      <div className="form__group">
        <input {...this.props} className="form__field" />
      </div>
    );
  }
}

CustomInput.defaultProps = {
  type: 'text'
};

export default CustomInput;