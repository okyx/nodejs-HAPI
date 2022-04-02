const { nanoid } = require('nanoid');
const book = require('./books');

const getBooks = (req) => {
  let buku = book;
  const { name, finished, reading } = req.query;
  if (finished !== undefined) {
    const finisheds = parseInt(finished, 10);
    buku = buku.filter((b) => b.finished === Boolean(finisheds));
  }
  if (reading !== undefined) {
    const finisheds = parseInt(reading, 10);
    buku = buku.filter((b) => b.reading === Boolean(finisheds));
  }
  if (name !== undefined) {
    buku = buku.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
  }
  return {
    status: 'success',
    data: {
      books: buku.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  };
};
const postBooks = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const finished = (pageCount === readPage);
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  book.push(newBooks);
  const isSuccess = book.filter((b) => b.id === id).length > 0;
  if (!isSuccess) {
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getBooksById = (req, h) => {
  const { id } = req.params;
  const filteredBook = book.filter((b) => b.id === id)[0];
  if (filteredBook === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  return {
    status: 'success',
    data: {
      book: filteredBook,
    },
  };
};

const updateBooksById = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;
  const { id } = req.params;
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const indexBook = book.findIndex((b) => b.id === id);
  if (indexBook === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const updatedAt = new Date().toISOString();
  book[indexBook] = {
    ...book[indexBook],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  return response;
};
const deleteBooksById = (req, h) => {
  const { id } = req.params;
  const indexBook = book.findIndex((b) => b.id === id);
  if (indexBook === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  book.splice(indexBook, 1);
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  response.code(200);
  return response;
};

module.exports = {
  getBooks,
  postBooks,
  getBooksById,
  updateBooksById,
  deleteBooksById,
};
