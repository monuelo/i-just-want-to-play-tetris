# Tetris Server

This server-side application is the backend for the I Just Want To Play Tetris web application

## Project Details

- Developed with Express.js
- Persists player scoreboard data via JSON file

## Installation

```
$ npm install
```

## Running the App

```bash
# development
$ npm run dev

# production mode
$ npm run start
```
## Configuring

 This application utilizes dotenv to host environment variables. Add a file named config.env to the 'src/config' directory and include:

- NODE_ENV=development (_or production_)
- PORT=3000 (_or port of choice_}
