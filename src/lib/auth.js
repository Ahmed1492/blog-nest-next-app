import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '30d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

/** Call inside a route handler — returns decoded payload or null */
export function getAuthFromRequest(request) {
  const token = request.headers.get('authorization');
  if (!token) return null;
  return verifyToken(token);
}
