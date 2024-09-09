/**** 
 * Memuat seluruh fungsi-fungsi handler yang digunakan pada berkas routes. 
****/
const { nanoid } = require('nanoid');
const bookshelfs  = require('./bookshelfs')

// Add a new Book
const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    
    // Variables to return
    const id = nanoid(16);  // Generate random ID 16 digits length
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage) ? true : false;

    // Error case
    if(typeof name === "undefined"){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    // Add the Book to the array
    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };
    bookshelfs.push(newBook);

    // Check if the Book is successfully inserted into the array
    const isSuccess = bookshelfs.filter((Book) => Book.id == id).length > 0;

    // If successfully added
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
};

// Get All Bookshelfs data
const getAllBookHandler = (request, h) => {
    // Request query
    let filterName = request.query.name;
    let filterReading = request.query.reading;
    let filterFinished = request.query.finished;

    // Value to return
    let id = 0;
    let name = "";
    let publisher = "";
    let retVal = []

    if(typeof filterName !== "undefined"){
        console.log(filterName);
        const books = bookshelfs.filter((n) => n.name.toLowerCase().includes(filterName.toLowerCase()));
        
        // Destructuring object inside the bookshelfs and push it to a new array
        for(let num = 0; num<books.length; num++){
            ({id, name, publisher} = books[num]);
            retVal.push({id, name, publisher});
        }

        return {
            status: "success",
            message: `Berhasil mengambil data buku dengan nama ${filterName}`,
            data: {
                books: retVal
            },
        };
    }
    else if(typeof filterReading !== "undefined"){
        filterReading = (request.query.reading === "1") ? true : false;
        console.log(`Receive books by on-going status ${filterReading}`);
        const books = bookshelfs.filter((n) => n.reading === filterReading);
        
        // Destructuring object inside the bookshelfs and push it to a new array
        for(let num = 0; num<books.length; num++){
            ({id, name, publisher} = books[num]);
            retVal.push({id, name, publisher});
        }

        return {
            status: "success",
            message: `Berhasil mengambil data buku dengan kondisi baca ${filterReading}`,
            data: {
                books: retVal
            },
        };
    }
    else if(typeof filterFinished !== "undefined"){
        filterFinished = (request.query.finished === "1") ? true : false;
        console.log(`Receive books by reading status ${filterFinished}`);
        const books = bookshelfs.filter((n) => n.finished === filterFinished);
        
        // Destructuring object inside the bookshelfs and push it to a new array
        for(let num = 0; num<books.length; num++){
            ({id, name, publisher} = books[num]);
            retVal.push({id, name, publisher});
        }

        return {
            status: "success",
            message: `Berhasil mengambil data buku dengan status selesai ${filterFinished}`,
            data: {
                books: retVal
            },
        };
    }


    // Destructuring object inside the bookshelfs and push it to a new array
    for(let num = 0; num<bookshelfs.length; num++){
        ({id, name, publisher} = bookshelfs[num]);
        retVal.push({id, name, publisher});
    }
    
    const response = h.response({
        status: 'success',
        data: {
            books: retVal,
        },
    });
    response.code(200);
    return response; 
};

// Get Book data by ID
const getBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = bookshelfs.filter((n) => n.id === id)[0];
   
    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    }
   
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

// Edit Book by ID
const editBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
   
    // Error case
    if(typeof name === "undefined"){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const index = bookshelfs.findIndex((Book) => Book.id === id);
    if (index !== -1) {
        bookshelfs[index] = {
            ...bookshelfs[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            updatedAt,
        };
   
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    else{
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }
};

// Delete Book by ID
const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = bookshelfs.findIndex((Book) => Book.id === id);

    if(index !== -1){
        bookshelfs.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { 
    addBookHandler, 
    getAllBookHandler, 
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler
};