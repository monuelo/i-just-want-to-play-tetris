// @packages
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
// @scripts
const asyncHandler = require('../middleware/async');

const scoreboard_path = path.join(process.cwd(), '/data/scoreboard.json');
const idFilter = (req) => (element) => element.id == req.params.id;

// @desc    Get scoreboard data for I Just Want To Play Tetris
// @route   GET /api/v1/scoreboard
exports.getScoreboard = asyncHandler(async (req, res, next) => {
  fs.readFile(scoreboard_path, 'utf-8', (err, jsonStr) => {
    if (err) {
      next(err);
    } else {
      try {
        const scoreboard_data = JSON.parse(jsonStr);
        res.status(200).json({success: 'true', scoreboard: scoreboard_data})
      } catch (err) {
        next(err);
      }
    }
  });
});

// @desc    Get top 5 scores for I Just Want To Play Tetris
// @route   GET /api/v1/scoreboard/leaders
exports.getLeaderboard = asyncHandler(async (req, res, next) => {
  fs.readFile(scoreboard_path, 'utf-8', (err, jsonStr) => {
    if (err) {
      next(err);
    } else {
      try {
        const leaderboard_data = JSON.parse(jsonStr).slice(0, 5);
        res.status(200).json({success: 'true', leaderboard: leaderboard_data})
      } catch (err) {
        next(err);
      }
    }
  });
});

// @desc    Add new scoreboard data for I Just Want To Play Tetris
// @route   POST /api/v1/scoreboard
exports.postScore = asyncHandler(async (req, res, next) => {
  const newScore = {
    id: uuid.v4(),
    player: req.body.player,
    score: req.body.score,
  };

  if (!newScore.player || !newScore.score) {
    return res.status(400).json({ msg: 'Please include a player and score' });
  }

  fs.readFile(scoreboard_path, 'utf-8', (err, jsonStr) => {
    if (err) {
      next(err);
    } else {
      try {
        const scoreboard_data = JSON.parse(jsonStr);
        scoreboard_data.push(newScore);
        // sort by descending order of score
        scoreboard_data.sort((obj1, obj2) => {
          return parseInt(obj2.score) - parseInt(obj1.score);
        });

        fs.writeFile(
          scoreboard_path,
          JSON.stringify(scoreboard_data, null, 2),
          (err) => {
            err
              ? next(err)
              : res.status(201).json({
                  success: true,
                  id: newScore.id,
                  player: newScore.player,
                  score: newScore.score,
                });
          }
        );
      } catch (err) {
        next(err);
      }
    }
  });
});

// @desc    Remove a scoreboard entry for I Just Want To Play Tetris
// @route   DELETE /api/v1/scoreboard/:id
exports.removeScore = asyncHandler(async (req, res, next) => {
  fs.readFile(scoreboard_path, 'utf-8', (err, jsonStr) => {
    if (err) {
      next(err);
    } else {
      try {
        const idToRemove = req.params.id;
        let scoreboard_data = JSON.parse(jsonStr);
        const found = scoreboard_data.some(idFilter(req));

        if (found) {
          scoreboard_data = scoreboard_data.filter(
            (child) => child.id !== idToRemove
          );
          fs.writeFile(
            scoreboard_path,
            JSON.stringify(scoreboard_data, null, 2),
            (err) => {
              err
                ? next(err)
                : res.status(200).json({
                    success: true,
                    scoreboard: scoreboard_data,
                  });
            }
          );
        } else {
          res
            .status(400)
            .json({ msg: `No score with the id of ${req.params.id}` });
        }
      } catch (err) {
        next(err);
      }
    }
  });
});

// @desc    Update a scoreboard entry for I Just Want To Play Tetris
// @route   PUT /api/v1/scoreboard/:id
exports.updateScore = asyncHandler(async (req, res, next) => {
  fs.readFile(scoreboard_path, 'utf-8', (err, jsonStr) => {
    if (err) {
      next(err);
    } else {
      try {
        const idToUpdate = req.params.id;
        let scoreboard_data = JSON.parse(jsonStr);
        const found = scoreboard_data.some(idFilter(req));

        if (found) {
          const updatedScore = req.body;
          scoreboard_data.forEach((element) => {
            if (element.id == idToUpdate) {
              element.player = updatedScore.player
                ? updatedScore.player
                : element.player;
              element.score = updatedScore.score
                ? updatedScore.score
                : element.score;
            }
          });
          // sort by descending order of score
          scoreboard_data.sort((obj1, obj2) => {
            return parseInt(obj2.score) - parseInt(obj1.score);
          });

          fs.writeFile(
            scoreboard_path,
            JSON.stringify(scoreboard_data, null, 2),
            (err) => {
              err
                ? next(err)
                : res.status(200).json({
                    success: true,
                    scoreboard: scoreboard_data,
                  });
            }
          );
        } else {
          res
            .status(400)
            .json({ msg: `No score with the id of ${req.params.id}` });
        }
      } catch (err) {
        next(err);
      }
    }
  });
});
