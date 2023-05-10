const express = require('express');
const { MongoClient } = require('mongodb');
const userController = require('./routes/usersController');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('cesta_basica');
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

connectToDatabase();

app.use('/users', userController);




app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});







