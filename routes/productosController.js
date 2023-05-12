const express = require('express')
const router = express.Router();
const { ObjectId } = require('mongodb');






router.post('/createProducto', (req, res)=>{
    req.app.locals.db.collection('productos').insertOne(req.body, (err, data)=>{
        if(err !== undefined){
            console.log(err)
        } else {
            res.redirect('/usuarios/gestion')
        }
    })
})
router.delete('/deleteproducto', (req, res) =>{
    req.app.locals.db.collection('productos')
    .deleteOne({name: req.body.nameProducto},
    (err, data)=>{
    if(err !== undefined){
    console.log(err)
    } else {
    res.send(data)
    }
    })
    })

    router.get('/showProductos', (req, res)=> {
        req.app.locals.db.collection('productos').find().toArray((err, data)=>{
        if(err !== undefined){
        console.log(err)
        } else {
        res.send(data)
        }
        })
        })

        router.put('/editProducto',(req, res) => {
          console.log(req.body)
          console.log('entro en el put')
            const productId = req.body._id;
            console.log(productId)
            console.log(req.body.name)
          
            req.app.locals.db.collection('productos').updateOne(
              { _id: new ObjectId(productId) },
              { $set:{ name: req.body.name, cantidad: req.body.cantidad, preciolidl: req.body.preciolidl, preciomercadona: req.body.preciomercadona, precioresoki: req.body.precioeroski }},
              (err, data) => {
                if (err !== undefined) {
                  console.log(err);
                  res.status(500).send('Error al editar el producto');
                } else {
                  res.send(data);
                }
              }
            );
          });

module.exports = router;