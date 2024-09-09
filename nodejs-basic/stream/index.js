const fs = require("fs");
const path = require("path");

// Read file with stream (significantly useful for large files)
const readableStream = fs.createReadStream(path.resolve(__dirname, "input.txt"), {
    highWaterMark: 15
});
// Write the read file into a new file
const writeableStream = fs.createWriteStream(path.resolve(__dirname, "output.txt"));

readableStream.on("readable", () => {
    try{
        writeableStream.write(`${readableStream.read()}\n`);
    } catch(error){

    }
})
readableStream.on("end", () => {
    console.log("\nReading file has finished!\n");
});