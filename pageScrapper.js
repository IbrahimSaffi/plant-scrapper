const scraperObject = {
    async scraper(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to https://www.tradewindsfruit.com/content/fruitsscientific.htm ...`);
        await page.goto("https://www.tradewindsfruit.com/content/fruitsscientific.htm");
        let plants = await page.$x('//td//a')
        let plantsData = []
        let plantLinks = []
        for(let i=1;i<11;i++){
            let plant = {}
            plant.scientificName= await (await plants[i].getProperty("innerText")).jsonValue()
            plantsData.push(plant)
            plantLinks.push(await (await plants[i].getProperty("href")).jsonValue())
        }
        for(let i=0;i<11;i++){
            if(plantLinks[i]){
                await page.goto(plantLinks[i])
                let hardiness = await page.$x('//h2[contains(.,"Hardiness")]/following-sibling::p')
                plantsData[i].hardiness= await (await hardiness[0].getProperty("innerText")).jsonValue()
                let growingEnviornment = await page.$x('//h2[contains(.,"Growing Environment")]/following-sibling::p')
                plantsData[i].growingEnviornment =await (await growingEnviornment[0].getProperty("innerText")).jsonValue()
            }

        }
      
        browser.close()
        return plantsData
    }
}
module.exports = scraperObject;