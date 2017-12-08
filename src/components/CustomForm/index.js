import React, { Component } from 'react';
import './index.css';
import CustomInput from '../CustomInput';
import Button from '../Button';

class CustomForm extends Component {
  render() {
    return(
      <form {...this.props} className="form-zipcode inline">
        <CustomInput placeholder="Ex.: 99999999" maxLength="8" name="cep" />
        <div className="form__group">
          <Button className="btn btn__success">Consultar</Button>
        </div>
      </form>
    );
  }
}

export default CustomForm;