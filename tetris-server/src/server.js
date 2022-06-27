// @packages
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
// @routes
const scoreboard = require('./routes/scoreboard');
// @env vars
dotenv.config({ path: './config/config.env' });

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cors middleware
app.use(cors());

// mount routers
app.use('/api/v1/scoreboard', scoreboard);

app.get('/', (_req, res) => {
  res
    .status(200)
    .json({ success: true, msg: 'Hello from I Just Want to Play Tetris' });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
