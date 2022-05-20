import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

export function validatePassword(currentPassword,userPassword) {
  return !bcrypt.compareSync(currentPassword, userPassword)
}