# User Manual

Guide to use, run, and deploy Soundscape.

# Using Soundscape

## Access Deployed Site

1. Access [soundscape.work](https://soundscape.work) on a browser/computer with
geolocation.
    - Mobile compatibility is limited.
2. Allow location services access for Soundscape

## System Requirements

To use Soundscape, you need:
- A compatible web browser (see below)
- Location services enabled on your device
- An internet connection

### Browser Compatibility

Confirmed Working:
- Safari
- Firefox
    - base
    - Zen
- Google Chrome

Confirmed not Working:
- OperaGX

## How to Use
### Creating an Account

1. Visit website
2. Click "Sign Up"
3. Enter your email address
4. Check your email for a verification link
    - Sign up email is not through verified SMTP service, and may appear in your
    spam folder
5. Click the verification link to activate your account
    - Account sign-up email must be accepted on the same device/browser as the
    sign-up was submitted
6. Log in with your email and password

### Exploring Posts **(Work in Progress)**

To see what others have posted:
1. Click on any marker on the map
2. A popup will show:
   - The user's name
   - The song title and artist they were listening to
   - When they posted
   - Any comment they left

### Creating a Post **(Work in Progress)**

To share what you're listening to:
1. Click the "Create Post" button
2. A post creation dialog appears with:
   - **Song Title:** Enter the name of the song
   - **Artist:** Enter the artist name
   - **Location:** Your current location (auto-detected, can be adjusted)
   - **Comment:** Add an optional comment about the song or moment
3. Click "Share" to post

Your post will appear on the map for others to view.

## Reporting Bugs

If something isn't working correctly:

1. Go to our [Issue Tracker](https://github.com/jmcelhone/Soundscape/issues)
2. Click "New Issue"
3. Include:
   - What you were trying to do
   - What you expected to happen
   - What actually happened
   - Your browser and operating system
   - Screenshots if possible

# Deploy Locally

### Required Programs/Services

- Node.js v25
- npm
- Supabase (using schema in `server/sql`)
- OpenSSL (for generating HTTPS key/certification)
- Bash (for running environment setup script)
- Any of the following operating systems:
    - MacOS
    - Linux
    - Windows (with Git Bash or WSL)

## Set-up Environment

A Supabase project with the following is required:
- Database schema with the one used in `server/sql/schema.sql`
- With user password sign-ups and email verification enabled
- Gather publishable key in Project Settings -> API keys
- Gather public URL: `https://[project_id].supabase.co`

Run `npm run dev` which will start the `env-setup.sh` script. The script will
prompt for certain environment variables, which most can be found on Supabase.
The setup script can be run at any time independently with `./env-setup.sh`.

If there is an error in the setup of your environment, delete your environment
files and run `./env-setup.sh` again to rebuild your environment.

While running, Vite will give a URL to access the site. The server will
run on Port 8000 by default, but this can be changed in the `server/.env` file.

## Build for Production

In the `client` directory, run `npm run build` which will build a static webpage
in `client/dist`. Run `npm run preview` to view the compiled webpage through Vite.

In the `server` directory, run `npm start` which will start the node server.

The environment setup script will not be run, and the environment file may not be
setup correctly. `npm install` should be run on each deployment from both the
`client` and `server` directories.
