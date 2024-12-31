import ms from 'ms'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return 'never'
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`
}

export const hashSaltPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);  
  const hashedPassword = await bcrypt.hash(password, salt);
  
  return hashedPassword;
}

export const verifyPassword = async (password: string, hashedSaltedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedSaltedPassword);
  
  return isMatch;
}

export const generateRandomPassword = (length: number = 24): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from(randomBytes(length), byte => characters[byte % characters.length]).join('');
}