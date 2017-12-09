import React, { Component } from 'react';
import './index.css';
import CustomInput from '../CustomInput';
import Button from '../Button';
import Location from '../Location';
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
    this.handleClickClear = this.handleClickClear.bind(this);
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
    return(
      <div>
        <form {...this.props} className="form-zipcode inline">
          <CustomInput type="tel" value={this.state.zipcode} onChange={this.handleChangeInput} placeholder="Ex.: 99999-999" maxLength="9" name="cep" />
          <div className="form__group">
            <Button onClick={this.handleClick} className="btn btn__success">Consultar</Button>
          </div>
        </form>

        {(this.state.location !== "" ? <Location location={this.state.location} /> : '')}
        {(this.state.location !== "" ? <Button onClick={this.handleClickClear} className="btn btn__danger">Limpar resultados</Button> : '')}
      </div>
    );
  }
}

export default CustomForm;