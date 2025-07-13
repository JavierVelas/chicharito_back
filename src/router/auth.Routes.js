const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('../controllers/auth.controller');
const authenticateToken = require('../../middlewares/authenticateToken');


router.post('/login', authController.login);


module.exports = router;