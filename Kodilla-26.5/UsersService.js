class UsersService {
    constructor() {
      this.users = [];
      this.userCounter = 0; 
    }
  
    getAllUsers() {
      return this.users;
    }
  
    getUserById(userId) {
      return this.users.find(user => user.id === userId);
    }
  
    addUser(user) {
    this.userCounter++;
      
      let usersArray = this.users.map(el => el.name);
      if (usersArray.includes(user.name)) {
        user.name = `${user.name} - ${this.userCounter}`;
      } 
      this.users = [user, ...this.users];
    }
  
    removeUser(userId) {
      this.users = this.users.filter(user => user.id !== userId);
    }
  }
  module.exports = UsersService;