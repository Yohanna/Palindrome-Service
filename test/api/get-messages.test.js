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

    describe('with isPalindrome filter', () => {
      beforeEach(async () => {
        // Create test messages - mix of palindromes and non-palindromes
        await request(app).post('/messages').send({ content: 'racecar' }); // palindrome
        await request(app).post('/messages').send({ content: 'hello' }); // not palindrome
        await request(app).post('/messages').send({ content: 'level' }); // palindrome
        await request(app).post('/messages').send({ content: 'world' }); // not palindrome
      });

      it('should return all messages when no filter is applied', async () => {
        const response = await request(app)
          .get('/messages')
          .expect(200);
        
        expect(response.body).to.have.length(4);
      });

      it('should return only palindromes when isPalindrome=true', async () => {
        const response = await request(app)
          .get('/messages?isPalindrome=true')
          .expect(200);
        
        expect(response.body).to.have.length(2);
        expect(response.body.every(msg => msg.isPalindrome === true)).to.be.true;
        expect(response.body.map(msg => msg.content)).to.deep.equal(['racecar', 'level']);
      });

      it('should return only non-palindromes when isPalindrome=false', async () => {
        const response = await request(app)
          .get('/messages?isPalindrome=false')
          .expect(200);
        
        expect(response.body).to.have.length(2);
        expect(response.body.every(msg => msg.isPalindrome === false)).to.be.true;
        expect(response.body.map(msg => msg.content)).to.deep.equal(['hello', 'world']);
      });

      it('should handle case-insensitive "True" parameter', async () => {
        const response = await request(app)
          .get('/messages?isPalindrome=True')
          .expect(200);
        
        expect(response.body).to.have.length(2);
        expect(response.body.every(msg => msg.isPalindrome === true)).to.be.true;
      });

      it('should handle case-insensitive "FALSE" parameter', async () => {
        const response = await request(app)
          .get('/messages?isPalindrome=FALSE')
          .expect(200);
        
        expect(response.body).to.have.length(2);
        expect(response.body.every(msg => msg.isPalindrome === false)).to.be.true;
      });

      it('should return 400 for invalid isPalindrome parameter', async () => {
        const response = await request(app)
          .get('/messages?isPalindrome=invalid')
          .expect(400);
        
        expect(response.body).to.deep.equal({
          error: 'isPalindrome parameter must be "true" or "false"'
        });
      });

      it('should return empty array when filtering palindromes but none exist', async () => {
        resetStorage();
        await request(app).post('/messages').send({ content: 'hello' }); // not palindrome
        await request(app).post('/messages').send({ content: 'world' }); // not palindrome

        const response = await request(app)
          .get('/messages?isPalindrome=true')
          .expect(200);
        
        expect(response.body).to.eql([]);
      });
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