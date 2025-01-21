import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  imagen: String,
  pais: String,
  ingredientes: [String],
  preparacion: String
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;
