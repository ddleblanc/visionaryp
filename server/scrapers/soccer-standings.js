const puppeteer = require("puppeteer");

let scrape = async (league) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    const premier = "https://www.google.com/search?sxsrf=ACYBGNTjq8hw9U5eQS7xQsqHrzc3qTXd5g%3A1581298472277&ei=KLNAXsLMEMG4kwXB_LKoCQ&q=premier+league&oq=permier+&gs_l=psy-ab.3.0.35i305i39i70i253j0i67j0i10l8.2695.3981..4926...0.1..0.86.458.8......0....1..gws-wiz.......0i71j35i39j0j0i20i263j0i10i70i253.GvCc5kjmPuI#sie=lg;/g/11fj6snmjm;2;/m/02_tc;st;fp;1;;"

    await page.goto(
        `https://www.google.com/search?q=la+liga&oq=la+liga&aqs=chrome..69i57j69i61l2.6537j0j4&sourceid=chrome&ie=UTF-8#sie=lg;/g/11ff1xzn64;2;/m/09gqx;st;fp;1;;`
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
        for (let i of document.querySelectorAll(".liveresults-sports-immersive__stbl")[0].firstChild.rows) {
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