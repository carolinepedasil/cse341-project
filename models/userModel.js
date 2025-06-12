const bcrypt = require('bcrypt');

const users = []; // Em memória. Pode ser substituído por MongoDB.

const findUser = (username) => users.find((user) => user.username === username);

const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

module.exports = { findUser, addUser };
