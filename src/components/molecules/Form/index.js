import React from "react";
import useLocation from "./useLocation";

import { Input, Button, Alert } from "components/atoms";
import { Location } from "components/molecules";

import ViaCep from "services/viacep";

import "./index.css";

const Form = props => {
  const [
    zipcode,
    setZipcode,
    location,
    setLocation,
    invalidZipcode,
    setStatusZipcode
  ] = useLocation();

  const onFormSubmit = event => {
    event.preventDefault();

    if (ViaCep.isValidZipcode(zipcode)) {
      ViaCep.getByCep(zipcode).then(response => {
        if (Object.keys(response).length > 1) {
          setLocation(response);
          setStatusZipcode(false);
          return;
        }
        setLocation("");
        setStatusZipcode(true);
        return;
      });
    } else {
      setLocation("");
      setStatusZipcode(true);
    }
  };

  const handleClickClear = () => {
    setLocation("");
    setZipcode("");
    setStatusZipcode(false);
  };

  const handleFieldBlur = () => {
    if (zipcode && !ViaCep.isValidZipcode(zipcode)) {
      const maskedZipcode = ViaCep.maskZipcode(zipcode);
      setZipcode(maskedZipcode);
    }
  };

  let alertValidation;
  let locationResult;
  let buttonClear;

  if (invalidZipcode === true) {
    alertValidation = (
      <Alert className="alert alert__error">Informe um CEP válido.</Alert>
    );
  }

  if (Object.keys(location).length > 1) {
    locationResult = <Location location={location} />;

    buttonClear = (
      <Button onClick={handleClickClear} className="btn btn__danger">
        Limpar resultados
      </Button>
    );
  }

  return (
    <div>
      <form {...props} onSubmit={onFormSubmit} className="form-zipcode inline">
        <Input
          type="tel"
          value={zipcode}
          onBlur={handleFieldBlur}
          onChange={event => setZipcode(event.target.value)}
          placeholder="Ex.: 99999-999"
          maxLength="9"
          name="cep"
        />
        <div className="form__group">
          <Button type="submit" className="btn btn__success">
            Consultar
          </Button>
        </div>
      </form>

      {alertValidation}

      {locationResult}
      {buttonClear}
    </div>
  );
};

export default Form;
