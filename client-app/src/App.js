import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import Login from './components/Login.js';
import AdminPage from './components/AdminPage.js';
import UserPage from './components/UserPage.js';
import CountryRecipes from './components/CountryRecipes.js';
import RecipeDetails from './components/RecipeDetails.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido a la aplicación de recetas</h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/recipes/country" element={<CountryRecipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
