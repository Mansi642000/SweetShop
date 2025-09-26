const express = require('express');
const {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require('../controllers/sweetsController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, isAdmin, createSweet);
router.get('/', authenticate, getSweets);
router.get('/search', authenticate, searchSweets);
router.put('/:id', authenticate, isAdmin, updateSweet);
router.delete('/:id', authenticate, isAdmin, deleteSweet);
router.post('/:id/purchase', authenticate, purchaseSweet);
router.post('/:id/restock', authenticate, isAdmin, restockSweet);

module.exports = router;