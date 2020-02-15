const puppeteer = require("puppeteer");

let scrape = async (searchTeam) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto(
        `https://www.google.com/search?q=${searchTeam}&oq=${searchTeam}&aqs=chrome..69i57j69i59j69i61l2j69i60.5175j0j1&sourceid=chrome&ie=UTF-8`
    );

    var score;
    // object to hold collection of all scraped instagram urls + stop condition

    // wait 1 sec for page load
    await page.waitFor(1000);
    // call and wait extractedEvaluateCall and concatenate results every iteration.
    // You can use results.push, but will get collection of collections at the end of iteration
    extractedValues = await extractedEvaluateCall(page);
    score = extractedValues;
    // this is where next button on page clicked to jump to another page
    // no next button on last page


    browser.close();
    return score;
};

async function extractedEvaluateCall(page) {
    // just extracted same exact logic in separate function
    // this function should use async keyword in order to work and take page as argument
    return page.evaluate(() => {

        // // away team score 
        // console.log(document.querySelectorAll(".imso_mh__r-tm-sc")[0].innerText)
        // // away team name
        // console.log(document.querySelectorAll(".kno-fb-ctx")[6].firstChild.innerText)


        // // home team name
        // console.log(document.querySelectorAll(".kno-fb-ctx")[3].firstChild.innerText)
        // // home team score 
        // console.log(document.querySelectorAll(".imso_mh__l-tm-sc")[0].innerText)

        let homeTeam = document.querySelectorAll(".kno-fb-ctx")[3].firstChild.innerText;
        let homeScore = document.querySelectorAll(".imso_mh__l-tm-sc")[0].innerText;

        let awayTeam = document.querySelectorAll(".kno-fb-ctx")[6].innerText;
        let awayScore = document.querySelectorAll(".imso_mh__r-tm-sc")[0].innerText;

        let data = {
            homeTeam: {
                name: homeTeam,
                score: homeScore
            },
            awayTeam: {
                name: awayTeam,
                score: awayScore
            }
        }

        console.log(data);
        return data;
    });
}

module.exports = {
    scrape: scrape
};