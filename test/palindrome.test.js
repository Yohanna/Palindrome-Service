import { expect } from 'chai';
import { isPalindrome } from '../src/palindrome.js';

describe('Palindrome Detection', () => {
  describe('Basic palindromes', () => {
    it('should return true for simple palindromes', () => {
      expect(isPalindrome('racecar')).to.be.true;
      expect(isPalindrome('level')).to.be.true;
      expect(isPalindrome('madam')).to.be.true;
      expect(isPalindrome('noon')).to.be.true;
    });

    it('should return false for non-palindromes', () => {
      expect(isPalindrome('hello')).to.be.false;
      expect(isPalindrome('world')).to.be.false;
      expect(isPalindrome('test')).to.be.false;
    });
  });

  describe('Case sensitivity', () => {
    it('should handle mixed case palindromes', () => {
      expect(isPalindrome('Racecar')).to.be.true;
      expect(isPalindrome('Level')).to.be.true;
      expect(isPalindrome('MadaM')).to.be.true;
      expect(isPalindrome('RaceCar')).to.be.true;
    });
  });

  describe('Spaces and punctuation', () => {
    it('should handle palindromes with spaces', () => {
      expect(isPalindrome('race car')).to.be.true;
      expect(isPalindrome('a man a plan a canal panama')).to.be.true;
      expect(isPalindrome('was it a rat i saw')).to.be.true;
    });

    it('should handle palindromes with punctuation', () => {
      expect(isPalindrome('A man, a plan, a canal: Panama')).to.be.true;
      expect(isPalindrome("Madam, I'm Adam")).to.be.true;
      expect(isPalindrome('race a car')).to.be.false;
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      expect(isPalindrome('')).to.be.true;
    });

    it('should handle single character', () => {
      expect(isPalindrome('a')).to.be.true;
      expect(isPalindrome('A')).to.be.true;
      expect(isPalindrome('1')).to.be.true;
    });

    it('should handle numeric palindromes', () => {
      expect(isPalindrome('12321')).to.be.true;
      expect(isPalindrome('12345')).to.be.false;
    });

    it('should handle special characters only', () => {
      expect(isPalindrome('!@#@!')).to.be.true;
      expect(isPalindrome('!@#ab$%')).to.be.false;
    });
  });

  describe('Unicode support', () => {
    it('should handle unicode characters', () => {
      expect(isPalindrome('😀🎉🎉😀')).to.be.true;
      expect(isPalindrome('café')).to.be.false;
    });
  });
});