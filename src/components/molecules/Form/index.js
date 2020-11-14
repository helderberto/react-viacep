import useLocation from "../../../hooks/use-location";
import { Input, Button, Alert } from "../../atoms";
import { Location } from "../../molecules";
import Zipcode from "../../../utils/zipcode";
import ViaCep from "../../../services/viacep";

import "./index.css";

const Form = (props) => {
  const [
    zipcode,
    location,
    invalidZipcode,
    clearResults,
    handleBlur,
    updateLocation,
    updateZipcode,
  ] = useLocation();

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (Zipcode.isValid(zipcode)) {
      ViaCep.getByCep(zipcode).then((response) => {
        if (Object.keys(response).length > 1) {
          updateLocation({
            location: response,
            invalidZipcode: false,
          });
          return;
        }
        updateLocation({
          location: "",
          invalidZipcode: true,
        });
        return;
      });
    } else {
      updateLocation({
        location: "",
        invalidZipcode: true,
      });
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
      <Button onClick={clearResults} className="btn btn__danger">
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
          onBlur={handleBlur}
          onChange={(event) => updateZipcode({ zipcode: event.target.value })}
          placeholder="Ex.: 99999999"
          maxLength="8"
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
