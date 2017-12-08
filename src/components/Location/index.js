import React from 'react';
import './index.css';

const Location = (props) => {
  return (
    <div className="location">
      {Object.keys(props.location).map((key, index) => {
          if (props.location[key]) {
            return <div className="location__item" key={index}><strong>{key.toUpperCase()}:</strong>{props.location[key]}</div>
          }
        })}
    </div>
  )
}

export default Location;