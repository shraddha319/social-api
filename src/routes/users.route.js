const express = require('express');
const { catchAsync } = require('../lib');
const { tokenVerifier, validate, validateUserId } = require('../middlewares');
const {
  postUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByUsername,
} = require('../controllers/user.controller');
const validation = require('../validations/user.validation');
const postRouter = require('./posts.route');

const router = express.Router();

router
  .route('/')
  .get(
    validate(validation.getUserByUsername, 'User'),
    catchAsync(getUserByUsername),
  )
  .post(validate(validation.createUser, 'User'), catchAsync(postUser));

router.use('/:userId', catchAsync(validateUserId), tokenVerifier);

router
  .route('/:userId')
  .get(validate(validation.getUserById, 'User'), getUser)
  .post(validate(validation.updateUserById, 'User'), catchAsync(updateUser))
  .delete(validate(validation.deleteUserById, 'User'), catchAsync(deleteUser));

router.use('/:userId/posts', postRouter);

module.exports = router;
