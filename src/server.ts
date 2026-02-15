import app from './app.ts';

const port: Number = Number(process.env.PORT!);

// start server
app.listen(port, function(err){
    if (err){
        throw err;
    } else {
        console.log("Server listening on port " + port);
    }
});
