import { useState } from "react";

import ViaCep from "services/viacep";

export default () => {
  const [zipcode, setZipcode] = useState("");
  const [location, setLocation] = useState("");
  const [invalidZipcode, setStatusZipcode] = useState(false);

  const clearResults = () => {
    setLocation("");
    setZipcode("");
    setStatusZipcode(false);
  };

  const handleBlur = () => {
    const ZIPCODE_WITHOUT_DASH_SIZE = 8;

    if (zipcode.length < ZIPCODE_WITHOUT_DASH_SIZE) {
      setStatusZipcode(true);
      return;
    }

    if (
      zipcode.length >= ZIPCODE_WITHOUT_DASH_SIZE &&
      !ViaCep.isValidZipcode(zipcode)
    ) {
      const maskedZipcode = ViaCep.maskZipcode(zipcode);
      setZipcode(maskedZipcode);
      setStatusZipcode(false);
    }
  };

  const updateLocation = ({ location, invalidZipcode }) => {
    setLocation(location);
    setStatusZipcode(invalidZipcode);
  };

  const updateZipcode = ({ zipcode }) => setZipcode(zipcode);

  return [
    zipcode,
    location,
    invalidZipcode,
    clearResults,
    handleBlur,
    updateLocation,
    updateZipcode
  ];
};
