import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('returns 404 if ID does not exist', async () => {
  // We need to generate a valid mongoose ObjetId
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({ title: 'Title', price: 50 })
    .expect(404);
});

it('returns 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: 'Title', price: 50 })
    .expect(401);
});

it('returns 401 if the user does not own the ticket', async () => {
  // Create a ticket with random user signed
  const title = 'Title';
  const price = 20;
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price,
    });

  const { id: ticketId } = response.body;

  // Attemp to update ticket with OTHER random user signed
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Updated title',
      price: 30,
    })
    .expect(401);

  // Check if created ticket still has their original values
  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

it('returns 400 if user provides invalid title or price', async () => {
  // Create a ticket with controled signed user
  const user = global.signin();
  const title = 'Title';
  const price = 20;
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', user)
    .send({
      title,
      price,
    });

  const { id: ticketId } = response.body;

  // Attemp to update ticket with invalid parameters
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', user)
    .send({
      title: '',
      price: -5,
    })
    .expect(400);

  // Check if created ticket still has their original values
  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

it('updates the tickewt when provided valid tickets', async () => {
  // Create a ticket with controled signed user
  const user = global.signin();
  const title = 'Title';
  const price = 20;
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', user)
    .send({
      title,
      price,
    });

  const { id: ticketId } = response.body;

  // Attemp to update ticket with valid parameters
  const newTitle = 'Updated title';
  const newPrice = 25;
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', user)
    .send({
      title: newTitle,
      price: newPrice,
    })
    .expect(200);

  // Check if updated their modified values
  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(newTitle);
  expect(ticketResponse.body.price).toEqual(newPrice);
});
