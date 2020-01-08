import { useState } from "react";

import Zipcode from 'utils/zipcode';

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
    if (zipcode.length < Zipcode.size) {
      setStatusZipcode(true);
      return;
    }

    if (
      zipcode.length >= Zipcode.size &&
      !Zipcode.isValid(zipcode)
    ) {
      const maskedZipcode = Zipcode.mask(zipcode);
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
