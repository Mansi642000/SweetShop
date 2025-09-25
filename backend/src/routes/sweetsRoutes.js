const express = require('express');
const { createSweet } = require('../controllers/sweetsController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, isAdmin, createSweet);

module.exports = router;