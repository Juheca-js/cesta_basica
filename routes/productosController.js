const express = require('express')
const router = express.Router();
const { ObjectId } = require('mongodb');






router.post('/createProducto', (req, res)=>{
    req.app.locals.db.collection('productos').insertOne(req.body, (err, data)=>{
        if(err !== undefined){
            console.log(err)
        } else {
            res.send(data)
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

        router.put('/editProducto/:id', (req, res) => {
            const productId = req.params.id;
            const updatedProduct = req.body;
          
            req.app.locals.db.collection('productos').updateOne(
              { _id: ObjectId(productId) },
              { $set: updatedProduct },
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