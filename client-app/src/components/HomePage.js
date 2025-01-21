import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import ImageContainer from "./ImageContainer.js";
import "../styles.css";
import { showTab, toggleTips, toggleBack } from "./recipes.js";

function HomePage() {
  const [recetasPopulares, setRecetasPopulares] = useState([]);
  const [imagenesCocinas, setImagenesCocinas] = useState([]);
  const [recetasRapidas, setRecetasRapidas] = useState([]);

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const recetas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecetasPopulares(recetas);
      } catch (error) {
        console.error("Error al obtener las recetas populares:", error);
      }
    };

    const fetchImagenes = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "cocinasInternacionales")
        );
        const cocinas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImagenesCocinas(cocinas);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    const fetchRecetasRapidas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recetasRapidas"));
        const recetasRapidas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecetasRapidas(recetasRapidas);
      } catch (error) {
        console.error("Error al obtener las recetas rápidas:", error);
      }
    };

    fetchRecetas();
    fetchImagenes();
    fetchRecetasRapidas();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="nav">
          <div className="nav__logo">Cocinando con Sabor</div>
          <div className="nav__links">
            <Link to="/" className="header__nav-link">
              Inicio
            </Link>
            <Link to="/recetas" className="header__nav-link">
              Recetas
            </Link>
            <Link to="/consejos" className="header__nav-link">
              Consejos
            </Link>
            <div className="nav__search">Buscar</div>
          </div>
        </div>
      </div>

      <div className="hero">
        <h1 className="hero__title">Recetas de cocina</h1>
        <p className="hero__subtitle">
          Encuentra una amplia variedad de recetas de diferentes partes del
          mundo, seleccionadas con cuidado para ofrecerte opciones deliciosas y
          sencillas. Desde platos tradicionales hasta ideas modernas, nuestra
          misión es inspirar a cocineros de todos los niveles a probar y
          disfrutar nuevas recetas en la cocina.
        </p>
        <button>Explorar Categorías</button>
      </div>

      <div className="content">
        <div>
          <h2>Cocinas internacionales</h2>
          <div className="tab-content" id="tab-1">
            {imagenesCocinas.length > 0 ? (
              imagenesCocinas
                .slice(0, 3)
                .map((imagen) => (
                  <ImageContainer key={imagen.id} imagen={imagen} />
                ))
            ) : (
              <>
                <div className="image-container">
                  <img src="imagen1.jpg" alt="Imagen de País 1" />
                </div>
                <div className="image-container">
                  <img src="imagen2.jpg" alt="Imagen de País 2" />
                </div>
                <div className="image-container">
                  <img src="imagen3.jpg" alt="Imagen de País 3" />
                </div>
              </>
            )}
          </div>
          <div className="tab-content" id="tab-2" style={{ display: "none" }}>
            {imagenesCocinas.length > 3 ? (
              imagenesCocinas
                .slice(3)
                .map((imagen) => (
                  <ImageContainer key={imagen.id} imagen={imagen} />
                ))
            ) : (
              <>
                <div className="image-container">
                  <img src="imagen4.jpg" alt="Imagen de País 4" />
                </div>
                <div className="image-container">
                  <img src="imagen5.jpg" alt="Imagen de País 5" />
                </div>
                <div className="image-container">
                  <img src="imagen6.jpg" alt="Imagen de País 6" />
                </div>
              </>
            )}
          </div>
          <div className="tabs">
            <button
              className="tab-button active"
              data-tab="1"
              onClick={() => showTab(1)}
            >
              1
            </button>
            <button
              className="tab-button"
              data-tab="2"
              onClick={() => showTab(2)}
            >
              2
            </button>
          </div>
        </div>
        <div className="content__block">
          <h2 className="content__title recetas-populares-title">
            Recetas populares
          </h2>
          {recetasPopulares.length > 0 ? (
            recetasPopulares.map((receta) => (
              <div key={receta.id} className="recipe-container">
                <div className="image-frame">
                  <img src={receta.imagen} alt={`Receta ${receta.nombre}`} />
                </div>
                <div className="recipe-details">
                  <h3>{receta.nombre}</h3>
                  <p>{receta.descripcion}</p>
                  <button
                    className="button-custom"
                    onClick={() =>
                      (window.location.href = `/recipe/${receta.id}`)
                    }
                  >
                    Ver más
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="recipe-container">
  <div className="image-frame">
    <img src="receta1.jpg" alt="Receta 1" />
  </div>
  <div className="recipe-details">
    <h3>Comida Popular 1</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <button
      className="button-custom"
      onClick={() => (window.location.href = "/recipe/receta1")}
    >
      Ver más
    </button>
  </div>
</div>
<div className="recipe-container">
  <div className="image-frame">
    <img src="receta2.jpg" alt="Receta 2" />
  </div>
  <div className="recipe-details">
    <h3>Comida Popular 2</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <button
      className="button-custom"
      onClick={() => (window.location.href = "/recipe/receta2")}
    >
      Ver más
    </button>
  </div>
</div>
<div className="recipe-container">
  <div className="image-frame">
    <img src="receta3.jpg" alt="Receta 3" />
  </div>
  <div className="recipe-details">
    <h3>Comida Popular 3</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <button
      className="button-custom"
      onClick={() => (window.location.href = "/recipe/receta3")}
    >
      Ver más
    </button>
  </div>
</div>
<div className="recipe-container">
  <div className="image-frame">
    <img src="receta4.jpg" alt="Receta 4" />
  </div>
  <div className="recipe-details">
    <h3>Comida Popular 4</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <button
      className="button-custom"
      onClick={() => (window.location.href = "/recipe/receta4")}
    >
      Ver más
    </button>
  </div>
</div>

            </>
          )}
        </div>
      </div>
      <div className="tips">
        <div className="tips__text" id="tips-text">
          <h2 className="tips__title">
            Consejos que harán tu cocina más fácil y divertida
          </h2>
          <p className="tips__description">
            Descubre tips y trucos que te facilitarán la vida en la cocina.
            Aprende a sustituir ingredientes, conservar alimentos y ahorrar
            tiempo mientras preparas tus platillos favoritos. Con nuestros
            consejos, cocinar será más fácil y agradable, permitiéndote
            disfrutar cada momento en la cocina.
          </p>
          <button className="tips__button" onClick={() => toggleTips()}>
            Ver consejos
          </button>
        </div>
        <div className="tips__image" id="tips-image">
          <img src="/assets/consejos_cocina.jpg" alt="Food tips" />
        </div>
        <div className="tips__content" id="tips-content">
          <h3>Tip 1: Sustituye ingredientes</h3>
          <p>
            Cuando te falte un ingrediente, busca alternativas en tu despensa.
          </p>
          <h3>Tip 2: Conserva mejor los alimentos</h3>
          <p>
            Usa frascos herméticos para mantener frescos tus ingredientes más
            tiempo.
          </p>
          <h3>Tip 3: Ahorra tiempo en la cocina</h3>
          <p>Prepara todos los ingredientes antes de comenzar a cocinar.</p>
          <button className="tips__button-back" onClick={() => toggleBack()}>
            Regresar
          </button>
        </div>
      </div>

      <div className="list-section">
        <h2 className="list-section__title">Recetas rápidas</h2>
        <div className="list">
          {recetasRapidas.length > 0 &&
            recetasRapidas.map((receta) => (
              <div key={receta.id} className="list__item">
                <h3 className="list__item-title">{receta.nombre}</h3>
                <p>
                  <strong>Ingredientes:</strong>{" "}
                  {receta.ingredientes.join(", ")}
                </p>
                <p>
                  <strong>Preparación:</strong> {receta.preparacion}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="footer">
        <div className="footer__icons">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img src="/assets/icon_insta.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img src="/assets/icon_face.png" alt="Facebook" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <img src="/assets/icon_linke.png" alt="LinkedIn" />
          </a>
        </div>
        <p>
          © <b>Andrei Colio:</b> Desarrollador de Software
        </p>
      </div>
    </div>
  );
}

export default HomePage;
