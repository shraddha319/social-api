const { User } = require('../models/user.model');
const { ApplicationError, ErrorTypes } = require('../lib');

const { RESOURCE_NOT_FOUND } = ErrorTypes;

const validateUserId = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user)
    return next(
      new ApplicationError(RESOURCE_NOT_FOUND, {
        message: `${userId} not found`,
      }),
    );
  req.userId = userId;
  req.user = user;
  return next();
};

module.exports = validateUserId;
