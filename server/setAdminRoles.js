const express = require('express');
const cors = require('cors');
const admin = require('./admin'); // Asegúrate de que la ruta sea correcta
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/setAdminRole', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    res.status(200).send(`Reclamación de administrador establecida para el usuario con UID: ${user.uid}`);
  } catch (error) {
    console.error('Error estableciendo la reclamación de administrador:', error);
    res.status(500).send('Error estableciendo la reclamación de administrador.');
  }
});

app.post('/setNivel2Role', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { nivel2: true });

    res.status(200).send(`Reclamación de nivel 2 establecida para el usuario con UID: ${user.uid}`);
  } catch (error) {
    console.error('Error estableciendo la reclamación de nivel 2:', error);
    res.status(500).send('Error estableciendo la reclamación de nivel 2.');
  }
});

app.post('/setMortalRole', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: false, nivel2: false });

    res.status(200).send(`Reclamación de mortal establecida para el usuario con UID: ${user.uid}`);
  } catch (error) {
    console.error('Error estableciendo la reclamación de mortal:', error);
    res.status(500).send('Error estableciendo la reclamación de mortal.');
  }
});

app.post('/deleteUser', async (req, res) => {
  const { uid } = req.body;

  try {
    // Eliminar usuario de Authentication
    await admin.auth().deleteUser(uid);

    // Eliminar usuario de Firestore
    await admin.firestore().collection('users').doc(uid).delete();

    res.status(200).send(`Usuario con UID: ${uid} eliminado exitosamente.`);
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).send('Error eliminando usuario.');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

