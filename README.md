# Soundscape

## Group 11 <br> >> Tiffany Chang <br> >> Leonidas Sallos <br> >> Christopher Calderon <br> >> Jeremy McElhone

Soundscape is a music-sharing social platform that allows users to post what they
are listening to along with the associated location and optional comment. Soundscape
creates a map-based feed of music sharing personal moments. This enables users to
discover music through friend's real world experiences. Users will be able to link
music provider apps, such as Spotify, to their Soundscape account in order to
create posts with a song they are listening to, their location, and a description.
Soundscape combines music-sharing, location posting, and social interaction into
a personal and engaging experience.

# Access Server

1. Access [soundscape.work](https://soundscape.work) on a browser/computer with
geolocation. Mobile compatibility is limited.
2. Allow access for location services on for Soundscape.

### For Beta Testers

The test account can be signed in through `test@email.mail` with password `pass1`.

The current available features are:
- Viewing existing posts on the map
- Creating new posts with the following entries
    - Song Name
    - Artist Name
    - Comment

# Deploy Locally

### Required Programs/Services

- Node.js v25
- npm
- OpenSSL
- Supabase (using schema in `server/sql`)
- Bash
- any of the following operating systems:
    - Windows
    - Mac
    - Linux

## Set-up Dev Environment

Run `npm run dev` which will start the `env-setup.sh` script. The script will
prompt for certain environment variables, which most can be found on Supabase.
The setup script can be run at any time independently with `./env-setup.sh`.

If there is an error in the setup of your environment, delete your environment
files and run `./env-setup.sh` again to reset your environment.

While running, Vite will give a URL to access the site. The server will
run on Port 8000 by default, but this can be changed in the `server/.env` file.

## Run Tests

Run `npm run test` which will also run the `env-setup.sh` script.

Tests can be run individually in the `client` and `server` directories with
`npm run test`. The environment setup script will not run in this case. The
environment file may not be setup properly, and `npm install` may be needed
in order to install packages needed.

## Build for Production

In the `client` directory, run `npm run build` which will build a static webpage
in `client/dist`. Run `npm run preview` to view the compiled webpage through Vite.

In the `server` directory, run `npm start` which will start the node server.

Like individually run tests, the environment setup script will not be run. The
environment file may not be setup correctly, and `npm install` may be needed in
order to install packages.
