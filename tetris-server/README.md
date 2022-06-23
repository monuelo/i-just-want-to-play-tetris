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

 This application utilizes dotenv to host environment variables. Add a file named config.env to the 'src/config' directory, then include the contents of the config.env.example found within this folder

## Deploying to Heroku

To deploy to Heroku you will need to push the tetris-server/src subdirectory specifically. When ready to deploy, navigate to the root level of the project in the terminal and execute:

```bash
# create a new branch 'deploy' containing only the src subdirectory content
$ git subtree split --prefix tetris-server/src -b deploy

# push the newly created branch to Heroku
$ git push heroku deploy:master
```

## Deployed URL

https://i-just-want-to-play-tetris.herokuapp.com/
