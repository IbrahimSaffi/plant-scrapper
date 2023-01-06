const browserObject = require('./browser');
const scraperController = require('./pageController');
const ObjectsToCsv = require('objects-to-csv');

    let browserInstance = browserObject.startBrowser();
   async function saveData(){
        let scrapedData= await scraperController(browserInstance)
            const csv = new ObjectsToCsv(scrapedData);
            await csv.toDisk('./plants.csv');
            return "dataAdded"
    }
saveData()