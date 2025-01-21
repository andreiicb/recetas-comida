import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CountryRecipes() {
  const { country } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`http://localhost:3001/api/recetas?pais=${country}`);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error al obtener las recetas:', error);
      }
    }

    fetchRecipes();
  }, [country]);

  return (
    <div className="country-recipes">
      <h2>Recetas de {country}</h2>
      {recipes.length > 0 ? (
        recipes.map((receta) => (
          <div key={receta.id} className="recipe-container">
            <div className="image-frame">
              <img src={receta.imagen} alt={`Receta ${receta.nombre}`} />
            </div>
            <div className="recipe-details">
              <h3>{receta.nombre}</h3>
              <p>{receta.descripcion}</p>
              <button className="button-custom" onClick={() => window.location.href = `/recipe/${receta.id}`}>Ver más</button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay recetas disponibles para este país.</p>
      )}
    </div>
  );
  
}

export default CountryRecipes;
