const express = require('express');
const passport = require('passport');
const {
  register,
  loginSuccess,
  loginFail,
  logout,
  protectedRoute,
} = require('../controllers/authController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       409:
 *         description: User already exists
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirects on success or failure
 */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/login/success',
  failureRedirect: '/login/fail',
}));

/**
 * @swagger
 * /login/success:
 *   get:
 *     summary: Login success handler
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login was successful
 */
router.get('/login/success', loginSuccess);

/**
 * @swagger
 * /login/fail:
 *   get:
 *     summary: Login fail handler
 *     tags: [Auth]
 *     responses:
 *       401:
 *         description: Invalid credentials
 */
router.get('/login/fail', loginFail);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out the user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out
 */
router.get('/logout', logout);

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Access protected route (must be logged in)
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticated access granted
 *       401:
 *         description: Not authenticated
 */
router.get('/protected', isAuthenticated, protectedRoute);

module.exports = router;
