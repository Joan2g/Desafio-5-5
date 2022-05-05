const express = require("express");
const {Router} = express;

const router = new Router();

let arrProductos = []

router.get("/", (req, res) => {
    /* if(arrProductos.length== 0) {
        res.send({message: "No hay productos cargados"})
    }else {
        res.render("main", {data: arrProductos})
    } */
    res.render("main"/* , {data: arrProductos} */)
})

router.get("/productos/:id", (req, res) => {
    let byId = req.params.id
    if(byId > arrProductos.length) {
        res.send({error: "Producto no encontrado!!"})
    } else {
        let producto = arrProductos.filter(x => {
            return x.id == byId
        })
        res.send(producto)
    }
})

/* router.post("/", (req, res) => {
    console.log(req.body)
    let {title, price, thumbnail} = req.body
    let nuevoProducto = {
        title,
        price,
        thumbnail,
    }
    arrProductos.push(nuevoProducto)
    if(arrProductos.length <= 1) {
        nuevoProducto["id"] = arrProductos.length 
    }else if(arrProductos.length >= 1){
        nuevoProducto["id"] = arrProductos.length 
    }
    //res.send("Producto añadido con exito!! \n " + JSON.stringify(nuevoProducto))
    res.render("main", {data: arrProductos})
}) */

router.put("/productos/:id", (req, res) => {
    try {
        let byId = req.params.id
    let body = req.body
    arrProductos.filter(producto => {
        if(producto.id == byId) {
            producto.title = body.title,
            producto.price = body.price,
            producto.thumbnail = body.thumbnail
        }
    })
    res.send("Producto actualizado con exito!!")
    } catch(error) {
        res.send({error: "No se pudo actualizar el producto"})
    }
    
})

router.delete("/productos/:id", (req, res) => {
    let byId = req.params.id
    arrProductos.filter((producto, index) => {
        if(producto.id == byId) {
            arrProductos.splice(index, 1)
        }
    })
    res.send("Producto eliminado con exito")
})

module.exports = router;