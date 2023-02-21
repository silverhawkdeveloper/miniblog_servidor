var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
var db = mongoose.connection;

// GET del listado de usuarios ordenados por fecha de creación
router.get('/', function(req, res, next) {
    //User.find().sort('-creationdate').exec(function(err, users) {
    //    if (err) res.status(500).send(err);
    //    else res.status(200).json(users);
    //});
    
    //mostrar el título del post en el array en vez del ObjectId
    User.find().sort('-creationdate').populate({ path: 'posts', select: 'title' }).exec(function(err, users) {
      if (err) {
          res.status(500).send(err);
          console.log(err);
      } else res.status(200).json(users);
  });
});

// GET de un único usuario por su Id
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function(err, userinfo) {
        if (err) res.status(500).send(err);
        else res.status(200).json(userinfo);
    });
});

// POST de un nuevo por username
router.post('/finduser', function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
      if (err) res.status(500).send('¡Error comprobando el usuario!');
      // Si el usuario existe...
      if (user != null) {
          res.status(200).json(user);
      } else res.status(401).send({ err });
  });
});

// POST de un nuevo usuario
router.post('/', function(req, res, next) {
    User.create(req.body, function(err, userinfo) {
        if (err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

// PUT de un usuario por su Id
router.put('/:id', function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, userinfo) {
        if (err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

// PUT de todos los usuario
router.put('/', function(req, res) {
  User.updateMany({}, { $set: { role: "subscriber" } }, function(err, result) {
      if (err) res.status(500).send(err);
      else res.status(200).send("Acualizado " + result.modifiedCount + " Documentos");
  });
});

// DELETE de un usuario por su Id
router.delete('/:id', function(req, res, next) {
    User.findByIdAndDelete(req.params.id, function(err, userinfo) {
        if (err) res.status(500).send(err);
        else res.sendStatus(200);
    });
});

// Comprueba si el usuario existe
router.post('/signin', function(req, res, next) {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) res.status(500).send('¡Error comprobando el usuario!');
        // Si el usuario existe...
        if (user != null) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) return next(err);
                // Si el password es correcto...
                if (isMatch)
                    res.status(200).send({ message: 'ok', role: user.role, id: user._id });
                else
                    res.status(200).send({ message: 'la password no coincide' });
            });
        } else res.status(401).send({ message: 'usuario no registrado' });
    });
});


module.exports = router;
