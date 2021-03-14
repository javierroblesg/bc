var express = require('express');
var usersRouter = express.Router();
const db = require('../database/index');
const User = db.models.User;
const UserType = db.models.UserType;
const UserCategories = db.models.UserCategories;
const { QueryTypes } = require('sequelize');
const crypto = require('crypto');
const cors = require('./cors');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const authenticate = require('../authenticate');

//route for /users/login
usersRouter.route('/login')
.options(cors.cors, (req, res) => { 
  res.setHeader('Allow', 'POST')
  res.sendStatus(200)
})
.post( cors.cors, async function(req, res, next) {
  const salt1 = '912a3bc67199222278d0a8735c602d680c7b66714a042ae42d426b34b0b9d616';
  const username = req.body.username;
  const sentPassword = req.body.password;
  if ( username && sentPassword ) {
    try {
      let password = crypto.pbkdf2Sync(sentPassword, salt1, 1000, 64, 'sha512').toString('hex');
      let user = await User.findOne({ where: {username, password} });
      if (user) {
        let payload = { id: user.id };
        let token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET/*, {expiresIn: 3600}*/ );
        //let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
        try {
          await user.update({ last_connection: new Date() })
        } catch (err) {
          next(err);
        }
        res.json({ success: true, token: token, modules: JSON.parse(user.modules) });
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ success: false, message: 'username or password incorrect'});
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ success: false, message: 'no username or password received'});
  }
});

// routes for /users
usersRouter.route('/')
.all( async (req, res, next) => {
  req.query.module = 1;
  next();
})
.options(cors.cors, (req, res) => { 
  res.setHeader('Allow', 'GET, POST')
  res.sendStatus(200) 
})
.get(cors.corsWithOptions, authenticate.verifyUser, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'firstname', 'lastname', 'last_connection'],
      include: [ {model: UserType} ],
      order: [["id", "ASC"]]
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.json(users);
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500)
    res.json({err: err})
  }
})
.post(cors.cors, authenticate.verifyUser, async (req, res, next) => {
  if (req.query.canEdit) {
    const salt1 = '912a3bc67199222278d0a8735c602d680c7b66714a042ae42d426b34b0b9d616';
    const Password = req.body.password;
    let hash = crypto.pbkdf2Sync(Password, salt1, 1000, 64, 'sha512').toString('hex');
    try {
      const userTypeModules = await UserType.findByPk(req.body.user_type);
      await User.create({
        username: req.body.username,
        password: hash,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        modules: userTypeModules.modules,
        user_type: req.body.user_type,
        last_connection: new Date(),
        can_services: userTypeModules.can_services
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

// routes for /users/:id
usersRouter.route('/:id')
.all( async (req, res, next) => {
  req.query.module = 1;
  next();
})
.options(cors.cors, (req, res) => { 
  res.setHeader('Allow', 'GET, PUT, DELETE')
  res.sendStatus(200) 
})
.get( cors.cors, authenticate.verifyUser, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'firstname', 'lastname', 'last_connection', 'createdAt', 'modules', 'can_services'],
      include: [ {model: UserType} ]
    });
    const query = "WITH user_services AS (SELECT sc.id as 'category_id' FROM services_categories sc LEFT JOIN user_categories uc on sc.id = uc.id_category WHERE uc.id_user = $user_id) SELECT sc.id, sc.name, CAST(CASE WHEN us.category_id IS NOT NULL THEN 1 ELSE 0 END as bit) as has_category FROM services_categories sc LEFT JOIN user_services us on us.category_id = sc.id";
    const categories = await db.sequelize.query(query, { bind: { user_id: req.params.id }, type: QueryTypes.SELECT });
    if (user) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({user, categories});
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).json({ exists: false });
    }
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json(err);
  }
})
.put( cors.cors, authenticate.verifyUser, async (req, res, next) => {
  if (req.query.canEdit) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        const userTypeModules = await UserType.findByPk(req.body.user_type);
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
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.destroy();
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

// routes for /users/modules/:id
usersRouter.route('/modules/:id')
.all( async (req, res, next) => {
  req.query.module = "1";
  next();
})
.options(cors.cors, (req, res) => { 
  res.setHeader('Allow', 'GET, POST, PUT')
  res.sendStatus(200) 
})
.put( cors.cors, authenticate.verifyUser, async (req, res, next) => {
  if (req.query.canEdit) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.update({
          modules: JSON.stringify(req.body.modules)
        }, {fields: ['modules'] } );
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


// routes for /users/categories/:id
usersRouter.route('/categories/:id')
.all( async (req, res, next) => {
  req.query.module = "1";
  next();
})
.options(cors.cors, (req, res) => { 
  res.setHeader('Allow', 'PUT')
  res.sendStatus(200) 
})
.put( cors.corsWithOptions, authenticate.verifyUser, async (req, res) => {
  if (req.query.canEdit) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        const hasCategory = await UserCategories.findOne({ where: { id_user: req.params.id, id_category: req.body.categoryId } })
        if (hasCategory) {
          // Already has category, delete it
          await hasCategory.destroy();
        } else {
          // Doesn't has category, add it
          await UserCategories.create({
            id_user: req.params.id,
            id_category: req.body.categoryId
          });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ success: true });
      }
    } catch (err) {
      next(err);
    }
  } else {
    const err = new Error('canEdit: false');
    err.status = 401;
    next(err);
  }
})

module.exports = usersRouter;
