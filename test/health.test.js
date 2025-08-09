import { expect } from 'chai';
import request from 'supertest';
import app from '../src/index.js';

describe('Health Check', () => {
  it('should return 200 and health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).to.deep.include({
      status: 'OK',
      service: 'palindrome-service'
    });
    expect(response.body).to.have.property('timestamp');
  });
});