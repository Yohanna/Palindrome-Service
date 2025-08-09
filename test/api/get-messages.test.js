import { expect } from 'chai';
import request from 'supertest';
import app, { resetStorage } from '../../src/index.js';

describe('GET Messages', () => {
  // Reset storage before each test
  beforeEach(() => {
    resetStorage();
  });

  describe('GET /messages', () => {
    it('should return empty array for now', async () => {
      const response = await request(app)
        .get('/messages')
        .expect(200);
      
      expect(response.body).to.eql([]);
    });
  });

  describe('GET /messages/:id', () => {
    it('should return 404 for any id (no persistence yet)', async () => {
      const response = await request(app)
        .get('/messages/123')
        .expect(404);
      
      expect(response.body).to.eql({
        error: 'Message not found'
      });
    });
  });
});