const routes = [
    // Homepage routes
    {
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return `Homepage!`;
        },
    },
    {
        method: "*",
        path: "/",
        handler: (request, h) => {
            return `This page can't be accessed using other than GET method!`;
        },
    },
    // About routes
    {
        method: "GET",
        path: "/about",
        handler: (request, h) => {
            return `Hello this is about page!`;
        },
    },
    {
        method: "*",
        path: "/about",
        handler: (request, h) => {
            return `This page can't be accessed using other than GET method!`;
        },
    },
    // Greeting
    {
        method: "GET",
        path: "/hello/{name?}",
        handler: (request, h) => {
            const { name = "stranger" } = request.params;   // Path parameter
            const { lang } = request.query; // Query parameter

            if(lang === "id"){
                return `Hai ${name}!`;    
            }
            return `Hello ${name}!`;
        },
    },
    // Any routes
    {
        method: "*",
        path: "/{any*}",
        handler: (request, h) => {
            return `Page is not found!`;
        },
    },
];

module.exports = routes;