const express = require("express");
const Favorite = require("../models/favorites");
const authenticate = require("../authenticate");
const cors = require("./cors");

const favoriteRouter = express.Router();

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .populate("campsites")
      .populate("user")
      .then(favorite => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch(err => next(err));

    //retrieve array of campsites
  })

  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          req.body.forEach(newFavorite => {
            if (!favorite.campsites.includes(newFavorite._id)) {
              favorite.campsites.push(newFavorite._id);
            }
          });
          favorite
            .save()
            .then(favorite => {
              res.send(favorite);
            })
            .catch(err => next(err));
        } else {
          Favorite.create({ user: req.user._id, campsites: req.body }).then(
            favorite => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            }
          );
        }
      })
      .catch(err => next(err));
  })

  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported");
  })

  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id }).then(response => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send("You've deleted all of your favorites.");
    });
  });

favoriteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported");
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          if (!favorite.campsites.includes(req.params.campsiteId)) {
            favorite.campsites.push(req.params.campsiteId);
            favorite.save().then(favorite => res.send(favorite));
          } else {
            res.send("This campsite's already in your favorites!");
          }
        } else {
          Favorite.create({
            user: req.user._id,
            campsites: [req.params.campsiteId]
          });
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })

      .catch(err => next(err));
  })

  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported");
  })

  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then(favorite => {
        if (favorite) {
          if (favorite.campsites.indexOf(req.params.campsiteId) != -1) {
            let indexOfToBeDeleted = favorite.campsites.indexOf(
              req.params.campsiteId
            );
            favorite.campsites.splice(indexOfToBeDeleted, 1);
            favorite
              .save()
              .then(favorite =>
                res.send("You've removed this campsite from your favorites.")
              );
          } else {
            res.send("This campsite isn't in your favorites");
          }
        } else {
          res.send("You don't have any favorite campsites");
        }
      })
      .catch(err => next(err));
  });

module.exports = favoriteRouter;
