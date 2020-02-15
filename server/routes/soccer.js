const soccerStandingsScraper = require('../scrapers/soccer-standings').scrape;
const express = require('express');
const router = express.Router();

const league = "la+liga";

router.get('/standings', function (req, res) {
    // let team = req.body.team;
    soccerStandingsScraper(league).then((value) => {
        console.log(value)
        res.send(value)
    });
});

module.exports = router;