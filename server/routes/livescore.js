const scoreScraper = require('../scrapers/scrape-score').scrape;
const express = require('express');
const router = express.Router();


router.post('/', function (req, res) {
    let team = req.body.team;
    scoreScraper(team).then((value) => {
        console.log(value)
        res.send(value)
    });
});

module.exports = router;