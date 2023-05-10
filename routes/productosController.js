const express = require('express')
const router = express.Router();






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
    .deleteOne({name: req.body.name},
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

module.exports = router;