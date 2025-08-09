import { isPalindrome } from '../palindrome.js';

class MessageService {
  constructor() {
    this.messages = [];
    this.nextId = 1;
  }

  create(content) {
    const message = {
      id: this.nextId++,
      content,
      isPalindrome: isPalindrome(content),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.messages.push(message);
    return message;
  }

  getAll(filters = {}) {
    let filteredMessages = this.messages;
    
    if (filters.isPalindrome !== undefined) {
      filteredMessages = this.messages.filter(msg => msg.isPalindrome === filters.isPalindrome);
    }
    
    return filteredMessages;
  }

  getById(id) {
    return this.messages.find(msg => msg.id == id);
  }

  update(id, content) {
    const message = this.getById(id);
    if (!message) return null;
    
    message.content = content;
    message.isPalindrome = isPalindrome(content);
    message.updatedAt = new Date().toISOString();
    return message;
  }

  delete(id) {
    const index = this.messages.findIndex(msg => msg.id == id);
    if (index === -1) return null;
    return this.messages.splice(index, 1)[0];
  }

  reset() {
    this.messages = [];
    this.nextId = 1;
  }
}

export { MessageService };