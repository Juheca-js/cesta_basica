const express = require('express');
const session = require('express-session');
const router = express.Router();
const bcrypt = require('bcrypt');


router.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true 
}));

function requireLogin(req, res, next) {
  if (req.session.user) {
    console.log('ID de sesión:', req.sessionID);
    next();
  } else {
    res.redirect('/usuarios/login');
  }
}

router.get('/login', (req, res) => {
  const error = req.query.error; // Capturamos el mensaje de error en caso de que se haya pasado como parámetro
  res.render('login', { error }); // Pasamos el mensaje de error como variable a la vista login.ejs
});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/usuarios/login');
    });
  });

router.post('/crear', async (req, res) => {
  const { username, password } = req.body;

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insertar el usuario en la base de datos
  try {
    const result = await req.app.locals.db.collection('users').insertOne({ username, password: hashedPassword });
    res.send('Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  findUser(req, user, pass, (err, user) => {
    if (err) {
      res.status(500).send('Error al buscar el usuario');
    } else if (!user) {
      res.redirect('/users/login?error=Nombre de usuario o contraseña incorrectos');    
    } else {
        req.session.user = {
            id: user._id,
            name: user.name
        };
      res.redirect('/users/gestion');
    }
  });
});

function findUser(req, username, password, callback) {
  req.app.locals.db.collection('users').findOne({ username }, (err, user) => {
    if (err) {
      callback(err, null);
    } else if (!user) {
      callback(null, null);
    } else {
      bcrypt.compare(password, user.pass, (err, res) => {
        if (err) {
          callback(err, null);
        } else if (res) {
          callback(null, username);
        } else {
          callback(null, null);
        }
      });
    }
  });
}

router.get('/ver', (req, res)=>{
  req.app.locals.db.collection('users').find().toArray((err, data)=>{
    if(err !== undefined){
      throw new Error(err)
    } else {
      res.send(data)
    }
  })
});


router.get('/login', (req, res) => {
  const error = req.query.error; // Capturamos el mensaje de error en caso de que se haya pasado como parámetro
  res.render('login', { error }); // Pasamos el mensaje de error como variable a la vista login.ejs
});


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/usuarios/login');
    });
  });




  




  module.exports = router;