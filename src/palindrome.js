/**
 * Determines if a given text is a palindrome
 * @param {string} text - The text to check
 * @returns {boolean} True if the text is a palindrome, false otherwise
 * @example
 * isPalindrome('racecar') // returns true
 * isPalindrome('A man, a plan, a canal: Panama') // returns true
 * isPalindrome('hello') // returns false
 */
export function isPalindrome(text) {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string');
  }

  // Clean the text: convert to lowercase and keep only alphanumeric characters
  // This removes spaces, punctuation, and special characters for comparison
  const cleaned = text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  // Compare the cleaned string with its reverse
  return cleaned === cleaned.split('').reverse().join('');
}