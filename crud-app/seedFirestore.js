import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

// Leer el archivo JSON con las credenciales
const serviceAccount = JSON.parse(fs.readFileSync('./firebase-adminsdk.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

// Agregar Datos a la Colección `recipes`
const recipes = [
  {
    nombre: "Pizza",
    descripcion: "Pizza Margarita con masa crujiente",
    imagen: "https://t2.rg.ltmcdn.com/es/posts/0/3/7/pizza_margarita_5730_600.jpg",
    pais: "Italia",
    ingredientes: ["masa de pizza", "salsa de tomate", "queso mozzarella", "albahaca"],
    preparacion: "Extiende la masa de pizza, añade la salsa de tomate, el queso mozzarella y albahaca. Hornea a 220°C por 15-20 minutos."
  },
  {
    nombre: "Sushi",
    descripcion: "Sushi tradicional japonés",
    imagen: "https://images.hola.com/imagenes/cocina/noticiaslibros/20210629192325/sushi-consejos-utiles-rr/0-968-891/sushi-adobe-m.jpg",
    pais: "Japón",
    ingredientes: ["arroz", "alga nori", "pescado fresco", "wasabi"],
    preparacion: "Cocina el arroz, coloca sobre el alga nori, añade pescado fresco y enrolla. Sirve con wasabi."
  },
  {
    nombre: "Tacos",
    descripcion: "Tacos de carne asada con guacamole",
    imagen: "https://images.aws.nestle.recipes/resized/e1ff3ab7ed57d5e63b1414503f3179ef_Tacos_de_Carne_que_van_Embotellados_940_600.jpg",
    pais: "México",
    ingredientes: ["tortillas", "carne asada", "guacamole", "cebolla", "cilantro"],
    preparacion: "Calienta las tortillas, añade la carne asada, guacamole, cebolla y cilantro. Sirve caliente."
  },
  {
    nombre: "Paella",
    descripcion: "Paella tradicional de mariscos",
    imagen: "https://www.pequerecetas.com/wp-content/uploads/2021/07/paella-de-marisco-receta.jpg",
    pais: "España",
    ingredientes: ["arroz", "mariscos", "azafrán", "pimientos", "caldo de pescado"],
    preparacion: "Cocina los mariscos, añade el arroz y los pimientos, agrega el caldo de pescado y el azafrán. Cocina a fuego lento hasta que el arroz esté cocido."
  },
];

recipes.forEach(async (recipe) => {
  await db.collection('recipes').doc(recipe.nombre).set(recipe);
});

// Agregar Datos a la Colección `cocinasInternacionales`
const cocinasInternacionales = [
  {
    nombre: "Cocina Italiana",
    pais: "Italia",
    imagen: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg"
  },
  {
    nombre: "Cocina Japonesa",
    pais: "Japón",
    imagen: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
  },
  {
    nombre: "Cocina Mexicana",
    pais: "México",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg"
  },
  {
    nombre: "Cocina Española",
    pais: "España",
    imagen: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg"
  },
  {
    nombre: "Cocina Francesa",
    pais: "Francia",
    imagen: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
  },
  {
    nombre: "Cocina Estadounidense",
    pais: "Estados Unidos",
    imagen: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
  },
];

cocinasInternacionales.forEach(async (cocina) => {
  await db.collection('cocinasInternacionales').doc(cocina.pais).set(cocina);
});

// Agregar Datos a la Colección `recetasRapidas`
const recetasRapidas = [
  {
    nombre: "Tostada de Aguacate",
    ingredientes: ["pan", "aguacate", "sal"],
    preparacion: "Tuesta el pan y unta el aguacate con sal."
  },
  {
    nombre: "Sándwich de Jamón y Queso",
    ingredientes: ["pan", "jamón", "queso", "mantequilla"],
    preparacion: "Unta mantequilla en el pan, coloca jamón y queso. Cocina en una sartén hasta que el pan esté dorado."
  },
  {
    nombre: "Tacos de Pollo Rápidos",
    ingredientes: ["tortillas", "pollo cocido", "salsa", "lechuga", "queso rallado"],
    preparacion: "Calienta las tortillas, añade pollo cocido desmenuzado, salsa, lechuga y queso rallado. Sirve caliente."
  },
  {
    nombre: "Quesadilla de Queso",
    ingredientes: ["tortillas", "queso"],
    preparacion: "Calienta una tortilla, agrega queso, cubre con otra tortilla y cocina hasta que el queso se derrita."
  },
];

recetasRapidas.forEach(async (receta) => {
  await db.collection('recetasRapidas').doc(receta.nombre).set(receta);
});
