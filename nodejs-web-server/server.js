const http = require('http');

// Handle request with response
const requestListener = (request, response) => {
    // response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Powred-By", "Node.js");
    response.statusCode = 200;
    
    const { method, url } = request;
    
    if(url === "/"){
        // Get method
        if(method === "GET"){
            response.statusCode = 200;
            // response.end("<h1>Hello this is homepage!</h1>");
            response.end(JSON.stringify({
                message: `Hello this is homepage!`,
            }));
        }
        // Reject other methods
        else{
            response.statusCode = 400;
            // response.end(`<h1>This page can't be accessed using ${method} method!</h1>`);
            response.end(JSON.stringify({
                message: `This page can't be accessed using ${method} method!`,
            }));
        }
    }
    else if(url === "/about"){
        // Get method
        if(method === "GET"){
            response.statusCode = 200;
            // response.end("<h1>Hello this is about page!</h1>");
            response.end(JSON.stringify({
                message: `Hello this is about page!`,
            }));
        }
        // Post method
        else if(method === "POST" ){
            let body = [];

            // Buffer the received data into the array
            request.on("data", (chunk) => {
                body.push(chunk);
            });
            // Convert the buffer data into String
            request.on("end", () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                // response.end(`<h1>Hello, ${name} this is about page!</h1>`);
                response.end(JSON.stringify({
                    message: `Hello, ${name} this is about page!`,
                }));
            });
        }
        // Reject other methods
        else{
            response.statusCode = 400;
            // response.end(`<h1>This page can't be accessed using ${method} method!</h1>`);
            response.end(JSON.stringify({
                message: `This page can't be accessed using ${method} method!`,
            }));
        }
    }
    else {
        response.statusCode = 404;
        // response.end("<h1>Page is not found!</h1>");
        response.end(JSON.stringify({
            message: "Page is not found!",
        }));
    }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});