const express = require('express');
const routes = express.Router();


const {authenticateUser, authorizePermissions} = require('../middleware/authentication')


const {
    barSearch,
    abcSearch,
    cbaSearch,
    salaryHTL,
    remoteSearch,
    newestSearch,
    oldestSearch,
} = require('../controllers/jobseachorder')

routes
    .route('/search9')
    .post(barSearch)
routes
    .route('/search')
    .get(abcSearch)
routes
    .route('/search1')
    .get(cbaSearch)
routes
    .route('/search2')
    .get(salaryHTL)
routes
    .route('/search3')
    .get(remoteSearch)
routes
    .route('/search4')
    .get(newestSearch)
routes
    .route('/search5')
    .get(remoteSearch)
routes
    .route('/search6')
    .get(oldestSearch)
    
module.exports = routes;