import request from 'supertest';
import { app } from '../../app';

it('returns 404 if thicket is not found', async () => {
  await request(app).get('/api/tickets/123f9m92').send().expect(404);
});

it('returns ticket if ticket is found', async () => {
  const title = 'Coldplay concert in Buenos Aires';
  const price = 20;
  // This should be an empty array
  const createResponse = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const { id } = createResponse.body;
  const ticketResponse = await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
