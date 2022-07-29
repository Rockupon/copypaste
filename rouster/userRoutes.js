const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateAUser,
  updateUserPassword,
} = require('../controllers/userController');

const {authenticateUser, authorizePermissions} = require('../middleware/authentication')

router.route('/').get(authenticateUser,authorizePermissions('admin'), getAllUsers);
  
  

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateAUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
