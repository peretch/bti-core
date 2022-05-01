import { cookie } from 'express-validator';
import request from 'supertest';
import { app } from '../../app';

it("responses with current user's details", async () => {
  // const signupResponse = await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //     email: 'test@test.com',
  //     password: 'password',
  //   })
  //   .expect(201);

  // ! Issue here: By default, cookies are not maintained between two requests with supertest
  // To avoid this problem, we will save cookie in a variable from previous response
  // const cookie = signupResponse.get('Set-Cookie');

  // Workaround, in test/testup.ts was defined a global function called singin to retunr cookie
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('Responses with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
