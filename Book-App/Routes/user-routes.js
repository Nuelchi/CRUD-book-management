const express = require('express');
const router = express.Router();
const {createUser, loginUser, resetPassword, getAllUsers} = require('../Controllers/user-controller.js');
const protection = require('../Controllers/user-controller.js');


router.post('/signup', createUser);
router.post('/login', loginUser);
router.put('/:id', protection.protectPath,resetPassword);
router.get('/', protection.protectPath,protection.restriction('admin'),getAllUsers);





module.exports = router;