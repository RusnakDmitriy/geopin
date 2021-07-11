const user = {
  _id: '1',
  name: 'Dima',
  email: 'email@email.com',
  picture: 'https://cloudinary.com/gjhg'
};

module.exports = {
  Query: {
    me: () => user
  }
};