const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const celebrateSignupConfig = require('../utils/configs/celebrateSignupConfig');
const celebrateSigninConfig = require('../utils/configs/celebrateSigninConfig');
const userRouter = require('./users');
const movieRouter = require('./movies');
const UnauthorizedError = require('../errors/not-found-error');

const { createUser, authorizeUser } = require('../controllers/users');

router.post('/signup', celebrate(celebrateSignupConfig), createUser);
router.post('/signin', celebrate(celebrateSigninConfig), authorizeUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new UnauthorizedError('Страница не найдена'));
});

module.exports = router;
