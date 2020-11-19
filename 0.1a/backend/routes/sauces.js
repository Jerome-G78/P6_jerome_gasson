const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/sauces');

const Sauces = require('../models/sauces');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createSauces);
router.get('/:id', auth, stuffCtrl.getOneSauces);
router.put('/:id', auth, multer, stuffCtrl.modifySauces);
router.delete('/:id', auth, stuffCtrl.deleteSauces);
router.post('/:id/like', auth, stuffCtrl.likeSauce);
router.post('/:id/dislike', auth, stuffCtrl.dislikeSauce);

module.exports = router;