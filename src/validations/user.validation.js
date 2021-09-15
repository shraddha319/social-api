const Joi = require('joi');
const { objectId, password } = require('./custom.validation');

// TODO - test all validation types
// separate them from the route controller tests

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(8)
      .regex(/[a-zA-Z]/)
      .messages({
        'string.min': 'Must have atleast 8 characters',
        'string.pattern.base': 'Must have only letters',
      }),
    dob: Joi.date().required(),
    bio: Joi.string(),
    website: Joi.string(),
    location: Joi.string(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

const getUserByUsername = {
  query: Joi.object().keys({
    username: Joi.string().required(),
  }),
};

const updateUserById = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    bio: Joi.string(),
    website: Joi.string(),
    location: Joi.string(),
  }),
};

const deleteUserById = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUserById,
  deleteUserById,
};
