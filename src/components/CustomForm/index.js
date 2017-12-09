import React, { Component } from 'react';
import './index.css';
import CustomInput from '../CustomInput';
import Button from '../Button';
import Location from '../Location';
import AlertValidation from '../AlertValidation';
import ViaCep from '../../services/viacep';

class CustomForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: '',
      location: '',
      invalidLocation: false
    };

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
  }

  handleChangeInput(event) {
    let zipcode = this.maskZipcode(event.target.value);

    this.setState({
      zipcode: zipcode
    });
  }

  maskZipcode = (zipcode) => {
    return (zipcode.length === 5 ? `${zipcode}-` : zipcode);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if (this.isValidZipcode(this.state.zipcode)) {
      ViaCep.getByCep(this.state.zipcode)
        .then(response => {
          if (response.erro) {
            this.setState({
              invalidLocation: true,
              location: ''
            });
          } else {
            this.setState({
              location: response,
              invalidLocation: false
            });
          }
        });
    } else {
      this.setState({
        invalidLocation: true
      });
    }
  }

  handleClickClear(event) {
    if (this.state.location !== '') {
      this.setState({
        zipcode: '',
        location: ''
      });
    }
  }

  isValidZipcode = (zipcode) => {
    return /^[0-9]{5}-[0-9]{3}$/.test(zipcode);
  }

  render() {
    const hasLocation = (this.state.location !== "" ? true : false);
    const isValidLocation = this.state.invalidLocation;

    let location = null;
    let buttonClear = null;

    if (hasLocation) {
      location = <Location location={this.state.location} />;
      buttonClear = <Button onClick={this.handleClickClear} className="btn btn__danger">Limpar resultados</Button>;
    }

    let alertValidation = null;
    if (isValidLocation) {
      alertValidation = <AlertValidation className="alert alert__error">Informe um CEP válido.</AlertValidation>;
    }

    return(
      <div>
        <form {...this.props} onSubmit={this.handleSubmit} className="form-zipcode inline">
          <CustomInput type="tel" value={this.state.zipcode} onChange={this.handleChangeInput} placeholder="Ex.: 99999-999" maxLength="9" name="cep" />
          <div className="form__group">
            <Button type="submit" className="btn btn__success">Consultar</Button>
          </div>
        </form>

        {alertValidation}

        {location}
        {buttonClear}
      </div>
    );
  }
}

export default CustomForm;