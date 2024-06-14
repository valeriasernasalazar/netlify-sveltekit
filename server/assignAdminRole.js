// server/assignAdminRole.js
const admin = require('./admin');

async function assignAdminRole(email) {
    try {
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
        console.log(`Rol de administrador asignado a ${email}`);
    } catch (error) {
        console.error(`Error asignando rol a ${email}:`, error);
    }
}

// Especifica el correo electrónico del usuario que deseas convertir en administrador
const email = 'admin@gmail.com'; // Cambia esto al correo del usuario

assignAdminRole(email);
