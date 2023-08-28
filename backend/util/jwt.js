import jwt, { SignOptions } from 'jsonwebtoken'

export const signJwt = (payload, options = {}) => {
  const privateKey = process.env.accessTokenPrivateKey
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
    expiresIn: '8h',
  })
}

export const verifyJwt = (token) => {
  try {
    const publicKey = process.env.accessTokenPublicKey
    return jwt.verify(token, publicKey)
  } catch (error) {
    return null
  }
}
