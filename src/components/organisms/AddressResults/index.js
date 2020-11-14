import React from "react";

import { Map } from "../../atoms";
import { Form } from "../../molecules";

const AddressResults = () => {
  return (
    <div className="app">
      <Map height="200" />

      <h1>Buscar endereço pelo CEP</h1>

      <Form />
    </div>
  );
};

export default AddressResults;
