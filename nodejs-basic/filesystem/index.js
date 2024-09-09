const fs = require("fs");
const path = require("path");

// Read file with async
const fileReadCallback = (error, data) => {
    if(error) {
        console.log('Gagal membaca berkas');
        return;
    }
    console.log(data);
};
fs.readFile((path.resolve(__dirname, "notes.txt")), "UTF-8", fileReadCallback);