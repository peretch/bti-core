import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

// DEPRECATED
// declare global {
//   namespace NodeJS {
//     interface Global {
//       signin(): Promise<String[]>;
//     }
//   }
// }

let mongo: any;

/**
 * This will be runned before all tests are executed
 */
beforeAll(async () => {
  process.env.JWT_KEY = 'secret';

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// Old signing funtion only works in auth service
// This is because the route handler is present only in our auth service
// global.signin = async () => {
//   const email = 'test@test.com';
//   const password = 'password';

//   const response = await request(app)
//     .post('/api/users/signup')
//     .send({ email, password })
//     .expect(201);

//   const cookie = response.get('Set-Cookie');

//   return cookie;
// };

// In this implementation, we will focus in return a cookie exact like the
// one returned when signin is success in auth servive.
// We will create our custom with this function
global.signin = () => {
  // 1. build JWT payload { id, email }
  const payload = { id: 'l213li21n3l9j', email: 'test@test.com' };

  // 2. Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // 3. Build session object {"jwt": MY_JWT }
  const session = { jwt: token };

  // 4. Turn session into Json
  const sessionJson = JSON.stringify(session);

  // 5. encode JSON as base64
  const base64 = Buffer.from(sessionJson).toString('base64');

  // 6. return string thats a cookie
  return [`session=${base64}`];
};
