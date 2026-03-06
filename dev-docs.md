# Developer Guide

## How to Obtain the Source Code
Clone or fork this repository (https://github.com/jmcelhone/Soundscape)

# Tech Stack

| Layer | Technology |
| - | - |
| Frontend | React |
| Frontend Map API | Leaflet |
| Frontend Build System | Vite |
| Frontend Testing Library | Vitest |
| Backend | Node.js, Express |
| Backend Build System | npm |
| Backend Testing Library | Jest |
| Database | Supabase |

# Directory Structure

```
soundscape/
├── client/
│   ├── __mocks__/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── hooks/
│   │   └── style/
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── vitest.setup.ts
├── server/
│   ├── sql/
│   ├── test/
│   ├── src/
│   ├── jest.config.ts
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── User-Manual.md
├── dev-docs.md
└── README.md
```

This repo is separated into the client and server directories for both the static
webpage using Vite, React and TypeScript, and the server for database interactions
using Node.js and TypeScript.

Root:
- `.gitignore` - General repo gitignore
- `package*` - npm package configuration files
- `tsconfig.json` - TypeScript language configuration
- `User-Manual.md` - Project user manual
- `dev-docs.md` - This document
- `README.md` - Project README

Client:
- `.gitignore` - Vite specific gitignore
- `README.md` - Vite specific README
- `eslint.config.js` - ESLint configuration
- `index.html` - Root HTML for webpage
- `package*` - Client specific npm package configuration
- `tsconfig*` - Client specific TypeScript language configuration
- `vite.config.ts` - Vite configuration
- `vitest.setup.ts` - Vitest configuration
- `__mocks__/` - Contains mocks for testing
- `public/` - Webpage assets
- `src/` - Webpage logic and React components
    - `assets/` - React assets
    - `hooks/` - Custom hooks for React
    - `style/` - Webpage CSS

Server:
- `jest.config.ts` - Jest configuration
- `package*` - Server specific npm configuration
- `tsconfig.json` - Server specific TypeScript language configuration
- `sql/` - Database SQL schemas
- `test/` - Server Jest testing suites
- `src` - Server logic

## Build for Development

In the root directory, run `npm run dev` which will run the `env-setup.sh` script.
Further details on this script can be found in [Set-up Environment](User-Manual.md#set-up-environment).

Once the environment is setup, both Vite and Node will be run concurrently. To
access the webpage, use the link provided by Vite. Any changes in the client
or server will relaunch the server that was modified automatically.

The client can also be build by running `npm run build` in the `client` directory.
This will compile the static webpage into the `client/dist` directory, and can
be viewed using `npm run preview`. The link given by Vite will access the static
webpage.

# Testing

## Run Tests

Run `npm run test` which will run the `env-setup.sh` script. Further details
on this script can be found in [Set-up Environment](User-Manual.md#set-up-environment)

Tests can be run individually in the `client` and `server` directories with
`npm run test`. The environment setup script will not run in this case. The
environment file may not be setup properly, and `npm install` may be needed
in order to install packages needed.

## How to Add New Tests

### Client

In the `client/src/` directory, create a new `*.test.tsx` file. When making tests,
import `@testing-library/react` for writing frontend unit tests. `SignUpForm.test.tsx`
contains good examples for using mocks with `beforeEach()`, as well as `describe()`
and `it()` for writing individual tests.

### Server

In the `server/test/` directory, create a new TypeScript file with the following,
as well as any imports you would like in your tests:
```
import { jest, describe, expect, test } from '@jest/globals';

describe(<test suite name>, () => {
    test(<test name>, () => {
        <test to write>
    });
});
```
Writing multiple tests in the suite is done by adding more `test()` calls in the
`describe()` anonymous function. Further information can be found in the
[Jest Documentation](https://jestjs.io/docs/getting-started).

# Build/Release for Production

In the `client` directory, run `npm run build` which will build a static webpage
in `client/dist`. Run `npm run preview` to view the compiled webpage through Vite.

In the `server` directory, run `npm start` which will start the node server.

The environment setup script will not be run, and the environment file may not be
setup correctly see [Set-up Environment](User-Manual.md#set-up-environment) for
more information. `npm install` should be run on each deployment from both the
`client` and `server` directories.
