
const admin = require('firebase-admin');
const serviceAccount = require('../utils/r-own-d0a2c-firebase-adminsdk-8vi0h-088627958e.json');
// Initialize Firebase Admin SDK with your project credentials

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://r-own-d0a2c-default-rtdb.firebaseio.com"
});