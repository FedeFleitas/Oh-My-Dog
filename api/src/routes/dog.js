const { Router } = require('express');
const router = Router();
const { Dog } = require('../db.js');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res, next) => {
    //Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
    //Crea una raza de perro en la base de datos
    const dog  = req.body;
    console.log(dog)
    if(!dog){
        return res.sendStatus(500).send('Completar los campos obligatorios')
    }

    return await Dog.create({
        ...dog,
        id: uuidv4(),
    })
    .then(dog => res.send(dog))
    .catch(error => next(error));
});


module.exports = router;