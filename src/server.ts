import app from "./app.ts"

const port = 8000

// setup environment
console.log("Starting server...");

// start server
app.listen(port, function(err) {
    if (err){
        throw err;
    } else {
        console.log("Server listening on port " + port);
    }
});
