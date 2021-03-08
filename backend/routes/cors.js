const express = require('express');
const cors = require('cors');

const app = express();

const whiteList = ['http://localhost:3000'];
let corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whiteList.indexOf(req.headers.origin) !== -1 ) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);