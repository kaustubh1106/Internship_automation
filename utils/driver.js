const { Builder, Browser } = require('selenium-webdriver')
async function setdriver(){
    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    return driver
}

module.exports = {setdriver}