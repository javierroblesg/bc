var express = require('express');
var userTypeRouter = express.Router();
const db = require('../database/index');
const UserType = db.models.UserType;
const cors = require('./cors');

require('dotenv').config();
const authenticate = require('../authenticate');

// routes for /user_types
userTypeRouter.route('/')
.all( async (req, res, next) => {
  req.query.module = 2;
  next();
})
.options(cors.cors, (req, res) => { 
  res.setHeader('Allow', 'GET, POST')
  res.sendStatus(200) 
})
.get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
  try {
    const userTypes = await UserType.findAll({
      order: [["id", "ASC"]]
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.json(userTypes);
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500)
    res.json({err: err})
  }
})
.post(cors.cors, authenticate.verifyUser, async (req, res, next) => {
  if (req.query.canEdit) {
    try {
      const firstUserType = await UserType.findByPk(1);
      await UserType.create({
        name: req.body.name,
        modules: firstUserType.modules,
        can_services: false
      });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  } else {
    const err = new Error('canEdit: false');
    err.status = 401;
    next(err);
  }
});

// routes for /user_types/:id
userTypeRouter.route('/:id')
.all( async (req, res, next) => {
  req.query.module = 1;
  next();
})
.options(cors.cors, (req, res) => { 
  res.setHeader('Allow', 'GET, PUT, DELETE')
  res.sendStatus(200) 
})
.put( cors.cors, authenticate.verifyUser, async (req, res, next) => {
  if (req.query.canEdit) {
    try {
      const userType = await UserType.findByPk(req.params.id);
      if (userType) {
        await user.update({
          username: req.body.username,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          user_type: req.body.user_type,
          modules: userTypeModules.modules,
          can_services: userTypeModules.can_services
        }, {fields: ['username', 'firstname', 'lastname', 'user_type', 'modules', 'can_services'] } );
        res.setHeader ('Content-Type', 'application/json');
        res.status(200).json(user);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({exists: false});
      }
    } catch (err) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json(err);
    }
  } else {
    const err = new Error('canEdit: false');
    err.status = 401;
    next(err);
  }
})
.delete( cors.cors, authenticate.verifyUser,async (req, res, next) => {
  if (req.query.canEdit) {
    try {
      const userTypeDelete = await UserType.findByPk(req.params.id);
      if (userTypeDelete) {
        await userTypeDelete.destroy();
        res.setHeader ('Content-Type', 'application/json');
        res.status(200).json({ success: true });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({exists: false});
      }
    } catch (err) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json(err);
    }
  } else {
    const err = new Error('canEdit: false');
    err.status = 401;
    next(err);
  }
});

module.exports = userTypeRouter;
