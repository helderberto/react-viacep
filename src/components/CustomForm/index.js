import React, { Component } from 'react';
import './index.css';
import CustomInput from '../CustomInput';
import Button from '../Button';
import ViaCep from '../../services/viacep';

class CustomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: '',
      location: ''
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeInput(event) {
    this.setState({
      zipcode: event.target.value
    });
  }

  handleClick(event) {
    if (this.isValidZipcode(this.state.zipcode)) {
      ViaCep.getByCep(this.state.zipcode)
        .then(response => {
          this.setState({
            location: response
          });
        });
    }
  }

  isValidZipcode = (zipcode) => {
    return /^[0-9]{5}-[0-9]{3}$/.test(zipcode);
  }

  render() {
    return(
      <form {...this.props} className="form-zipcode inline">
        <CustomInput value={this.state.zipcode} onChange={this.handleChangeInput} placeholder="Ex.: 99999-999" maxLength="9" name="cep" />
        <div className="form__group">
          <Button onClick={this.handleClick} className="btn btn__success">Consultar</Button>
        </div>
      </form>
    );
  }
}

export default CustomForm;