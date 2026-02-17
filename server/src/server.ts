import * as fs from 'fs';
import * as https from 'https';
import app from './app.ts';

const port: Number = Number(process.env.PORT!);

// get HTTPS options
const options: https.ServerOptions = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
    passphrase: process.env.HTTPS_KEY_PASSPHRASE!
};

// start server
https.createServer(options, app).listen(port, () => {
    console.log("Server listening on port " + port);
});
