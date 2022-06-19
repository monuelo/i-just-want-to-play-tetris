// @packages
const express = require('express');
// @scripts
const { getLeaderboard, getScoreboard, postScore, removeScore, updateScore } = require('../controllers/scoreboard-controller');

const router = express.Router();

// @route /api/v1/scoreboard
router.route('/').get(getScoreboard);

router.route('/leaders').get(getLeaderboard);

router.route('/').post(postScore);

router.route('/:id').delete(removeScore);

router.route('/:id').put(updateScore);

module.exports = router;