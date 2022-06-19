# Tetris Server

This server-side application is the backend for the I Just Want To Play Tetris web application

## Project Details

- Developed with Express.js
- Persists player scoreboard data via JSON file

## Getting Started

- Navigate in the terminal to the 'src' directory & install dependencies

```
$ npm install
```

- To run the development server

```
$ npm run dev
```

This application utilizes dotenv to host environment variables. Add a file named config.env to the 'src/config' directory and include:
- NODE_ENV=development (*or production*)
- PORT=3000 (*or port of choice*}