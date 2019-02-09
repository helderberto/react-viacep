import { useState } from "react";

export default () => {
  const [zipcode, setZipcode] = useState("");
  const [location, setLocation] = useState("");
  const [invalidZipcode, setStatusZipcode] = useState(false);

  return [
    zipcode,
    setZipcode,
    location,
    setLocation,
    invalidZipcode,
    setStatusZipcode
  ];
};
