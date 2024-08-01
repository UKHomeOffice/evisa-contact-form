'use strict';
// common.js sets up the  testing environment for Mocha
// `yarn add mocha chai nyc reqres proxyquire sinon sinon-chai --dev`

/* eslint-disable max-len */
require('dotenv').config();

process.env.NODE_ENV = 'test';
process.env.AWS_BUCKET = 'test';
process.env.AWS_SECRET_ACCESS_KEY = 'test';
process.env.AWS_ACCESS_KEY_ID = 'test';

// "reqres" creates stub request and response objects for testing express applications and middleware
global.reqres = require('hof').utils.reqres;

const sinonChai = require('sinon-chai');
// chai is packaged in ES Modules and must be dynamically loaded
(async () => {
  const chai = await import('chai');
  global.chai = chai.use(sinonChai);
  global.should = chai.should();
  global.expect = chai.expect;
})();

// "sinon" provides framework agnostic test spies, stubs and mocks
global.sinon = require('sinon');
// "proxyquire" provides an alternative to require() for loading modules in order to make overriding dependencies during testing easy
global.proxyquire = require('proxyquire');
global.path = require('path');
// the application's HOF config
global.config = require('../config.js');
global._ = require('lodash');

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
process.stdout.setMaxListeners(0);
