import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}

export function signClaims<T>(claims: T) {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
  const runtimeConfig = useRuntimeConfig();
  return jwt.sign({ ...claims, exp }, runtimeConfig.jwtSecret);
}

export function decodeClaims<T>(token: string) {
  const runtimeConfig = useRuntimeConfig();
  return jwt.verify(token, runtimeConfig.jwtSecret) as T;
}
