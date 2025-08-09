import { expect } from 'chai';
import request from 'supertest';
import app, { resetStorage } from '../../src/index.js';

describe('DELETE /messages/:id', () => {
  // Reset storage before each test
  beforeEach(() => {
    resetStorage();
  });

  it('should return 404 for any id (no persistence yet)', async () => {
    const response = await request(app)
      .delete('/messages/123')
      .expect(404);
    
    expect(response.body).to.eql({
      error: 'Message not found'
    });
  });
});