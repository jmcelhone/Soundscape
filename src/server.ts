import express from 'express';
const app = express()
app.use(express.json())

const port: Number = 8000;

// setup environment
console.log("Starting server on port:" + port);

// routing
app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

// start server
app.listen(port, function(err) {
    if (err){
        throw err;
    } else {
        console.log("Server listening on port " + port);
    }
});
