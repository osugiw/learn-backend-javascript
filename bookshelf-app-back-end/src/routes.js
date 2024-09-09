const { 
    addBookHandler, 
    getAllBookHandler, 
    getBookByIdHandler,
    editBookByIdHandler, 
    deleteBookByIdHandler
} = require("./handler");

/**** 
 * Memuat kode konfigurasi routing server seperti menentukan path, method, dan handler yang digunakan. 
****/
const routes = [
    {
        method:'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;