import request from 'supertest';
import { app } from '../../app';

// if it returns 404, it fails
it('has a route handler listening to /api/tickets for POST erquests', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});

// This 401 comes from our common library the "notAuthorized" middleware, and our "NotAuthorizedError" error class
it('Can only be accessed if user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).toEqual(401);
});

it('returns status different to 401 if suer is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {});

it('returns an error rif an invalid price is provided', async () => {});

it('creates a tickets with valid parameters', async () => {});
