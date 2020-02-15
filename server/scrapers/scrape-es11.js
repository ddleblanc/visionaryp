const puppeteer = require("puppeteer");

let scrape = async () => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto(
        `https://www.es11.nl/l/fg/1_352024294.html`
    );

    var standings;
    // object to hold collection of all scraped instagram urls + stop condition

    // wait 1 sec for page load
    await page.waitFor(1000);
    // call and wait extractedEvaluateCall and concatenate results every iteration.
    // You can use results.push, but will get collection of collections at the end of iteration
    extractedValues = await extractedEvaluateCall(page);
    standings = extractedValues;
    // this is where next button on page clicked to jump to another page
    // no next button on last page


    browser.close();
    return standings;
};

async function extractedEvaluateCall(page) {
    // just extracted same exact logic in separate function
    // this function should use async keyword in order to work and take page as argument
    return page.evaluate(() => {





        var standings = [];
        for (let i of document.querySelectorAll(".table-hovered")[0].rows) {
            let row = []
            for (let j of i.cells) {
                row.push(j.innerText)
                console.log(j.innerText)
            }
            standings.push(row)
        }

        console.log(standings);
        return standings;
    });
}

module.exports = {
    scrape: scrape
};