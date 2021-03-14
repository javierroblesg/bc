var express = require('express');
var servicesCategoriesRouter = express.Router();
const db = require('../database/index');
const ServicesCategory = db.models.ServicesCategory;
const cors = require('./cors');

require('dotenv').config();
const authenticate = require('../authenticate');

// routes for /services_categories
servicesCategoriesRouter.route('/')
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
    const services_categories = await ServicesCategory.findAll({
      order: [["id", "ASC"]]
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.json(services_categories);
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500)
    res.json({err: err})
  }
})
.post(cors.cors, authenticate.verifyUser, async (req, res, next) => {
  if (req.query.canEdit) {
    try {
      await UserType.create({
        name: req.body.name
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

module.exports = servicesCategoriesRouter;
