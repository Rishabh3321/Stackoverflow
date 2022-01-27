import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import jwtConfig from 'src/config/jwt.config';

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    jwtConfig.secret,
    { algorithm: 'HS256', expiresIn: jwtConfig.expiresIn },
  );
};

export const verifyPassword = (
  passwordAttempt: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};
