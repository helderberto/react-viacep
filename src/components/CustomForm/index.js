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
    this.handleBlurInput = this.handleBlurInput.bind(this);
  }

  handleChangeInput(event) {
    this.setState({
      zipcode: event.target.value
    });
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

  isValidZipcode = (zipcode) => {
    return (/^[0-9]{5}-[0-9]{3}$/.test(zipcode));
  }

  handleClickClear(event) {
    if (this.state.location !== '') {
      this.setState({
        zipcode: '',
        location: ''
      });
    }
  }

  handleBlurInput(event) {
    if (this.state.zipcode) {
      const zipcode = this.maskZipcode(this.state.zipcode);
      this.setState({
        zipcode: zipcode
      });
    }
  }

  maskZipcode = (zipcode) => {
    const zipcodeStart = zipcode.substring(0, zipcode.length-3);
    const zipcodeEnd = zipcode.substring(zipcode.length-3, zipcode.length);

    return `${zipcodeStart}-${zipcodeEnd}`;
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
          <CustomInput type="tel" value={this.state.zipcode} onBlur={this.handleBlurInput} onChange={this.handleChangeInput} placeholder="Ex.: 99999-999" maxLength="9" name="cep" />
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