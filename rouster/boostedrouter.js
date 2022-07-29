const express = require('express');
const routes = express.Router();


const {authenticateUser, authorizePermissions} = require('../middleware/authentication')


const {
    boost,
    justboostedSearch,
    mostboostedSearch,
    lessboostedsearch,
    getallboosted,
    getmyboosted
} = require('../controllers/boosted')

routes
    .route('/boost')
    .post([authenticateUser,authorizePermissions("employer")],boost)
routes
    .route('/boost1')
    .get(justboostedSearch)
routes
    .route('/boost2')
    .get(mostboostedSearch)
routes
    .route('/boost3')
    .get(lessboostedsearch)
routes
    .route('/boost4')
    .get(getallboosted)
routes
    .route('/boost5')
    .get([authenticateUser,authorizePermissions("employer")],getmyboosted)
    
module.exports = routes;