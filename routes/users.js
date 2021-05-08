const router = require('express').Router();
const { celebrate } = require('celebrate');
const celebrateUpdateUserConfig = require('../utils/configs/celebrateUpdateUserConfig');

const { clearCookie, getCurrentUser, updateUserProfile } = require('../controllers/users');

router.post('/signout', clearCookie);
router.get('/me', getCurrentUser);
router.patch('/me', celebrate(celebrateUpdateUserConfig), updateUserProfile);

module.exports = router;
