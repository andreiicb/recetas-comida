import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './firebaseAdminConfig.js';  // Importa el archivo correctamente

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());
app.use(cors());

// Registro de Usuario
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.collection('users').add({
    username,
    password: hashedPassword,
    role
  });
  res.status(201).send('Usuario registrado');
});

// Login de Usuario
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userSnapshot = await db.collection('users').where('username', '==', username).get();
  if (userSnapshot.empty) {
    return res.status(400).send('Usuario no encontrado');
  }
  const user = userSnapshot.docs[0].data();
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Contraseña incorrecta');
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY);
  res.json({ token });
});

// Middleware de Autenticación
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware de Autorización
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.sendStatus(403);
    }
    next();
  };
}

// CRUD de Recetas
app.post('/api/recetas', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { nombre, descripcion, imagen, pais, ingredientes, preparacion } = req.body;
  const docRef = await db.collection('recipes').add({
    nombre, descripcion, imagen, pais, ingredientes, preparacion
  });
  res.status(201).send({ id: docRef.id, ...req.body });
});

app.get('/api/recetas', authenticateToken, async (req, res) => {
  const recipesSnapshot = await db.collection('recipes').get();
  const recetas = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(recetas);
});

app.get('/api/recetas/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const doc = await db.collection('recipes').doc(id).get();
  if (!doc.exists) {
    return res.status(404).json({ error: 'Receta no encontrada' });
  }
  res.json({ id: doc.id, ...doc.data() });
});

app.put('/api/recetas/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen, pais, ingredientes, preparacion } = req.body;
  await db.collection('recipes').doc(id).update({
    nombre, descripcion, imagen, pais, ingredientes, preparacion
  });
  res.send({ id, nombre, descripcion, imagen, pais, ingredientes, preparacion });
});

app.delete('/api/recetas/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params;
  await db.collection('recipes').doc(id).delete();
  res.sendStatus(204);
});

// Añadir rutas para cocinas internacionales y recetas rápidas
app.get('/api/cocinas-internacionales', authenticateToken, async (req, res) => {
  const cocinasSnapshot = await db.collection('cocinasInternacionales').get();
  const cocinas = cocinasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(cocinas);
});

app.get('/api/recetas-rapidas', authenticateToken, async (req, res) => {
  const recetasRapidasSnapshot = await db.collection('recetasRapidas').get();
  const recetasRapidas = recetasRapidasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(recetasRapidas);
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
