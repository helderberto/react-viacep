import React from "react";
import MapSvg from "./map.svg";
import "./index.css";

const Map = props => {
  return (
    <img
      className="map__location"
      src={MapSvg}
      alt="Mapa de localização"
      {...props}
    />
  );
};

export default Map;
