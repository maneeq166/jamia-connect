const { body, param, query, validationResult } = require('express-validator');

const runValidations = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((v) => v.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Log helpful debug info to diagnose multipart / body parsing issues
    try {
      const logger = require('../utils/logger');
      logger.warn('Validation failed', {
        path: req.path,
        method: req.method,
        contentType: req.headers['content-type'],
        bodyKeys: Object.keys(req.body || {}),
        errors: errors.array(),
      });
    } catch (e) {
      // swallow logging errors
      // eslint-disable-next-line no-console
      console.warn('logger not available', e.message || e);
    }

    return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
  }
  next();
};

module.exports = {
  runValidations,

  // Auth
  signupValidator: () =>
    [
      body('username')
        .trim()
        .isLength({ min: 3, max: 15 })
        .matches(/^[A-Za-z0-9_]+$/)
        .withMessage('username should be 3-15 chars and alphanumeric or underscore'),
      body('email').normalizeEmail().isEmail(),
      body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
    ],

  signinValidator: () =>
    [
      body('email').normalizeEmail().isEmail(),
      body('password').notEmpty(),
    ],

  // Chat
  sendMessageValidator: () =>
    [
      body('sender').trim().notEmpty(),
      body('receiver').trim().notEmpty(),
      body('content').trim().notEmpty(),
    ],

  getMessagesValidator: () =>
    [
      query('sender').trim().notEmpty(),
      query('receiver').trim().notEmpty(),
    ],

  // Blog
  addBlogValidator: () =>
    [
      body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required and must be under 200 characters'),
      body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
    ],

  blogIdParam: () => [param('id').isMongoId().withMessage('Invalid blog id')],

  voteValidator: () => [body('blogId').isMongoId().withMessage('Invalid blogId')],

  // Explore
  exploreUsersValidator: () => [query('page').optional().isInt({ min: 1 })],
  exploreUsernameParam: () => [param('username').trim().notEmpty()],

  // Pyq
  sendPyqValidator: () => [
    body('content').optional().trim().isLength({ min: 1 }),
    body('department').optional().trim().isLength({ min: 1 }),
    body('year').optional().isInt(),
    body('subject').optional().trim().isLength({ min: 1 }),
  ],

  // Profile
  updateProfileValidator: () => [
    body('username').optional().trim().isLength({ min: 3, max: 15 }).matches(/^[A-Za-z0-9_]+$/),
    body('email').optional().normalizeEmail().isEmail(),
    body('state').optional().trim().isString(),
    body('department').optional().trim().isString(),
    body('year').optional().isInt(),
    body('bio').optional().trim().isString(),
    body('links').optional().isArray({ max: 4 }),
  ],

  updatePasswordValidator: () => [
    body('currentPassword').isLength({ min: 6 }),
    body('newPassword').isLength({ min: 6 }),
  ],
};
