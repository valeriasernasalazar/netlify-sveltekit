const admin = require('firebase-admin');
const serviceAccount = require('./sveltekit-fullstack-3429b-firebase-adminsdk-gpz1u-58d10d61ec.json'); // Cambia esto por la ruta correcta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
