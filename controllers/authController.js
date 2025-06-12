const passport = require('passport');
const { addUser, findUser } = require('../models/userModel');

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  const existingUser = findUser(username);
  if (existingUser)
    return res.status(409).json({ message: 'User already exists' });

  await addUser(username, password);
  res.status(201).json({ message: 'User registered' });
};

const login = passport.authenticate('local', {
  successRedirect: '/login/success',
  failureRedirect: '/login/fail',
});

const loginSuccess = (req, res) => {
  res.json({ message: 'Logged in' });
};

const loginFail = (req, res) => {
  res.status(401).json({ message: 'Invalid credentials' });
};

const logout = (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
};

const protectedRoute = (req, res) => {
  res.json({ message: 'You are authenticated' });
};

module.exports = {
  register,
  login,
  loginSuccess,
  loginFail,
  logout,
  protectedRoute,
};
