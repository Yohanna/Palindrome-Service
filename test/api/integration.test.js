import { expect } from 'chai';
import request from 'supertest';
import app, { resetStorage } from '../../src/index.js';

describe('Full CRUD Integration', () => {
  // Reset storage before each test
  beforeEach(() => {
    resetStorage();
  });

  it('should create, read, update, and delete messages', async () => {
    // 1. Create a message
    const createResponse = await request(app)
      .post('/messages')
      .send({ content: 'racecar' })
      .expect(201);
    
    expect(createResponse.body).to.deep.include({
      id: 1,
      content: 'racecar',
      isPalindrome: true
    });

    // 2. Get the message by ID
    const getResponse = await request(app)
      .get('/messages/1')
      .expect(200);
    
    expect(getResponse.body).to.deep.include({
      id: 1,
      content: 'racecar',
      isPalindrome: true
    });

    // 3. Get all messages
    const getAllResponse = await request(app)
      .get('/messages')
      .expect(200);
    
    expect(getAllResponse.body).to.have.length(1);
    expect(getAllResponse.body[0]).to.deep.include({
      id: 1,
      content: 'racecar',
      isPalindrome: true
    });

    // 4. Update the message
    const updateResponse = await request(app)
      .put('/messages/1')
      .send({ content: 'hello world' })
      .expect(200);
    
    expect(updateResponse.body).to.deep.include({
      id: 1,
      content: 'hello world',
      isPalindrome: false
    });

    // 5. Delete the message
    const deleteResponse = await request(app)
      .delete('/messages/1')
      .expect(200);
    
    expect(deleteResponse.body).to.deep.include({
      id: 1,
      content: 'hello world',
      isPalindrome: false
    });

    // 6. Verify message is gone
    await request(app)
      .get('/messages/1')
      .expect(404);

    const finalGetAllResponse = await request(app)
      .get('/messages')
      .expect(200);
    
    expect(finalGetAllResponse.body).to.have.length(0);
  });
});