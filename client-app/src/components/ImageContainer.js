import React from 'react';
import { Link } from 'react-router-dom';

function ImageContainer({ imagen }) {
  return (
    <div className="image-container">
      <Link to={`/country/${imagen.pais}`}>
        <img src={imagen.url} alt={imagen.nombre} />
      </Link>
    </div>
  );
}

export default ImageContainer;
