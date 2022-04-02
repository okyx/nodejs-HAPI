const {
  getBooks,
  postBooks,
  getBooksById,
  updateBooksById,
  deleteBooksById,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: postBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBooksById,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksById,
  },

];

module.exports = routes;
