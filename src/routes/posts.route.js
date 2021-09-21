const express = require('express');
const { catchAsync } = require('../lib');
const { validate } = require('../middlewares');
const { getPost, createPost } = require('../validations/post.validation');
const Post = require('../models/post.model');
const { ApplicationError, ErrorTypes, sendResponse } = require('../lib');

const { RESOURCE_NOT_FOUND } = ErrorTypes;

const router = express.Router();

router
  .route('/')
  .get(
    catchAsync(async (req, res) => {
      const posts = await Post.find({})
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: { name: 1, username: 1 },
          },
        })
        .populate({
          path: 'user',
          select: { name: 1, username: 1 },
        })
        .exec();

      return sendResponse({
        res,
        success: true,
        payload: {
          posts,
        },
      });
    }),
  )
  .post(
    validate(createPost),
    catchAsync(async (req, res) => {
      const {
        userId,
        body: { content },
      } = req;

      const savedPost = await Post.create({
        user: userId,
        content,
        likes: [],
        comments: [],
      });

      const populatedPost = await savedPost
        .populate('user', 'name username')
        .execPopulate();

      return sendResponse({
        res,
        success: true,
        statusCode: 201,
        payload: {
          post: populatedPost,
        },
      });
    }),
  );

router
  .route('/:postId')
  .get(
    validate(getPost),
    catchAsync(async (req, res, next) => {
      const { postId } = req.params;
      const post = await Post.findById(postId)
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: { name: 1, username: 1 },
          },
        })
        .populate({
          path: 'user',
          select: { name: 1, username: 1 },
        })
        .exec();

      if (!post)
        return next(
          new ApplicationError(RESOURCE_NOT_FOUND, {
            message: `${postId} not found`,
          }),
        );

      return sendResponse({
        res,
        success: true,
        payload: {
          post,
        },
      });
    }),
  )
  .post(async (req, res, next) => {
    const {
      params: { postId },
      body,
      userId,
    } = req;
    const post = await Post.findById(postId);

    switch (body.type) {
      case 'like':
        post.likes = post.likes.concat([userId]);
        break;

      case 'dislike':
        post.likes = post.likes.filter((user) => String(user) !== userId);
        break;

      case 'comment':
        post.comments = post.comments.concat([
          {
            user: userId,
            comment: body.comment,
          },
        ]);
        break;

      default:
        break;
    }

    await post.save();
    return sendResponse({ res, success: true, statusCode: 204 });
  });

module.exports = router;
