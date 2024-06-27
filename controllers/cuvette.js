const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const { run } = require("../utils/chatgpt")
const { assesment } = require("../utils/assesment.js")
const { askQuestion } = require("../utils/readline.js")
const details = require("../details.json")


const cuvette = async (req, res) => {
    let driver = await new Builder().forBrowser(Browser.CHROME).build()
    try {
        await driver.get('https://cuvette.tech/')
        askQuestion("login in due")
    } catch (error) {
        console.log(error)
    }
}

module.exports = cuvette
