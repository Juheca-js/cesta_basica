const express = require('express');

const mongodb = require('mongodb-legacy');

const app = express();




app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Configurar la carpeta 'views' como carpeta de vistas
app.set('views', __dirname + '/views');


const productosController = require('./routes/productosController')

app.use('/productos', productosController)

const usuarios = require('./routes/usersController')

app.use('/usuarios', usuarios)



const MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017',(err, client)=>{

    if(err !== undefined){
        console.log(err)
    } else {
        app.locals.db= client.db('cesta_basica')
    }
})

app.listen(3000, ()=>{
    console.log('Servidor levantado en el puerto 3000');
})

