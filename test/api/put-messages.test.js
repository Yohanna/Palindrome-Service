import { expect } from 'chai';
import request from 'supertest';
import app, { resetStorage } from '../../src/index.js';

describe('PUT /messages/:id', () => {
  // Reset storage before each test
  beforeEach(() => {
    resetStorage();
  });

  it('should return 404 for any id (no persistence yet)', async () => {
    const response = await request(app)
      .put('/messages/123')
      .send({ content: 'updated content' })
      .expect(404);
    
    expect(response.body).to.eql({
      error: 'Message not found'
    });
  });

  it('should return 400 for missing content', async () => {
    const response = await request(app)
      .put('/messages/123')
      .send({})
      .expect(400);
    
    expect(response.body).to.eql({
      error: 'Message content must be a non-empty string'
    });
  });
});