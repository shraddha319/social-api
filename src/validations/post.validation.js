const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId).required(),
  }),
};

const createPost = {
  body: Joi.object().keys({
    content: Joi.object()
      .keys({
        text: Joi.string(),
      })
      .required()
      .min(1),
  }),
};

module.exports = { getPost, createPost };
