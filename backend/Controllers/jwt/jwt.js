const jwt = require('jsonwebtoken');

// secret key for signing and verifying tokens
const secret = 'mysecretkey';

// function to generate access token

function generateAccessToken(user,id) {
  const payload = { id: id, username: user };
  const options = { expiresIn: '15m' };
  return jwt.sign(payload, secret, options);
}

// function to generate refresh token
function generateRefreshToken(user,id) {
  const payload = { id: id,username: user};
  const options = { expiresIn: '7d' };
  return jwt.sign(payload, secret, options);
}

// function to verify token and return payload
function verifyToken(token) {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};