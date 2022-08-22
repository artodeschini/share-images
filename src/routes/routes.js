const express = require("express");
const router = express.Router();
const HomeController = require('../controller/HomeController');
const UserController = require('../controller/UserController');

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.delete('/user', UserController.remove);

module.exports = router;
