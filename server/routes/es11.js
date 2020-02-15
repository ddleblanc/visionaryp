const es11Scraper = require('../scrapers/scrape-es11').scrape;
const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    let team = req.body.team;
    es11Scraper().then((value) => {
        console.log(value)
        res.send(value)
    });
});

module.exports = router;