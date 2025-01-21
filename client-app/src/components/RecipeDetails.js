// RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`http://localhost:3001/api/recetas/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error al obtener la receta:', error);
      }
    }

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Cargando receta...</p>;
  }

  return (
    <div className="recipe-detail">
      <h2>{recipe.nombre}</h2>
      <img src={recipe.imagen} alt={`Receta ${recipe.nombre}`} />
      <p><strong>Descripción:</strong> {recipe.descripcion}</p>
      <p><strong>Ingredientes:</strong> {recipe.ingredientes.join(', ')}</p>
      <p><strong>Preparación:</strong> {recipe.preparacion}</p>
    </div>
  );
}

export default RecipeDetail;
