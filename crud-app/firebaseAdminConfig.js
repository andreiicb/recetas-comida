// firebaseAdminConfig.js

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

// Leer el archivo JSON con las credenciales
const serviceAccount = JSON.parse(fs.readFileSync('./firebase-adminsdk.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

export { db };
