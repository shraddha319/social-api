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

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    type: Joi.string().valid('like', 'dislike', 'comment'),
    comment: Joi.string(),
  }),
};

module.exports = { getPost, createPost, updatePost };
