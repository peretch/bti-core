import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

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
