import { expect } from 'chai';
import request from 'supertest';
import app, { resetStorage } from '../../src/index.js';

describe('POST /messages', () => {
  // Reset storage before each test
  beforeEach(() => {
    resetStorage();
  });

  it('should create a message with palindrome detection', async () => {
    const response = await request(app)
      .post('/messages')
      .send({ content: 'racecar' })
      .expect(201);
    
    expect(response.body).to.deep.include({
      content: 'racecar',
      isPalindrome: true
    });
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('createdAt');
    expect(response.body).to.have.property('updatedAt');
  });

  it('should create a message for non-palindrome', async () => {
    const response = await request(app)
      .post('/messages')
      .send({ content: 'hello world' })
      .expect(201);
    
    expect(response.body).to.deep.include({
      content: 'hello world',
      isPalindrome: false
    });
  });

  it('should trim whitespace from content', async () => {
    const response = await request(app)
      .post('/messages')
      .send({ content: '  level  ' })
      .expect(201);
    
    expect(response.body).to.deep.include({
      content: 'level',
      isPalindrome: true
    });
  });

  it('should return 400 for missing content', async () => {
    const response = await request(app)
      .post('/messages')
      .send({})
      .expect(400);
    
    expect(response.body).to.eql({
      error: 'Message content must be a non-empty string'
    });
  });

  it('should return 400 for empty content', async () => {
    const response = await request(app)
      .post('/messages')
      .send({ content: '' })
      .expect(400);
    
    expect(response.body).to.eql({
      error: 'Message content must be a non-empty string'
    });
  });

  it('should return 400 for non-string content', async () => {
    const response = await request(app)
      .post('/messages')
      .send({ content: 123 })
      .expect(400);
    
    expect(response.body).to.eql({
      error: 'Message content must be a non-empty string'
    });
  });
});