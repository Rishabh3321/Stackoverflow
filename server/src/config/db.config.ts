import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/example',
}));
