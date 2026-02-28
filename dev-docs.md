# Developer Guidelines
## How to obtain the source code
Fork this repository (https://github.com/jmcelhone/Soundscape)

## Directory Structure
```
soundscape/
├── client/
│   ├── public/
│   └── src/
│       ├── hooks/
│       └── assets/
├── server/
│   ├── sql/
│   ├── test/
│   └── src/
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```
Our repo is seperated into client and server folders. In the root folder we have our documentation and our Node project configuration. In the client, public contains any static pages and assets and src contains assests used within React as well as React hooks and components. In server, we have a src directory for source code for our Express server and a sql directory for our schema.
The layout of your directory structure. What do the various directories (folders) contain, and where to find source files, tests, documentation, data files, etc.

## How to build the software 
To build our software, create a Supabase project and create a .env file in both the client and server directories with your Supabase project url and publishable key. In the server folder, generate a key.pem and cert.pem and set the HTTPS_KEY_PASSPHRASE to the password of your generated certs in the server .env and set the PORT environment variable to 8000. To run the express server independently, make sure your working directory is in server and install dependancies before running `npm start`. To run the development Vite server, make sure your working directory is client, install dependancies, and run `npm run dev`. To run both concurrently first install dependancies, navigate to the root folder, and run `npm run dev`.

## How to test the software. 
We are using Jest as our test framwork for unit testing. They will be located in a directory named test under root. More documentation to be added later.

## How to add new tests
Test suite is under construction and more documentation will be added later.

## How to build a release of the software. 
Our build system has not been configured yet but we plan to have an automated build workflow. More documentation on how to deploy to be added later.
