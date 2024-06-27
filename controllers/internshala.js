const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const { askQuestion } = require("../utils/readline.js")
const { run } = require("../utils/chatgpt")
const { assesment } = require("../utils/assesment.js")
const { setdriver } = require("../utils/driver.js")
const details = require("../details.json")




const login = async (driver) => {
        try {
            await driver.get('https://internshala.com/')
            const loginbtn = await driver.findElement(By.className("login-cta"));
            await loginbtn.click();


            const email1 = `${process.env.EMAIL}`

            await driver.sleep(450);
            await driver.findElement(By.id("modal_email")).sendKeys(email1, Key.RETURN)


            const password1 = `${process.env.PASSWORD}`

            await driver.sleep(463);
            await driver.findElement(By.id("modal_password")).sendKeys(password1, Key.RETURN)

            await driver.sleep(1000);
        } catch (e) {
            console.log(e)
        }
    
}
const internshala = async (req, res) => {
    let driver = await setdriver();
    try {
        // login(driver)
        await driver.get('https://internshala.com/')
        
        login(driver)
        await askQuestion("please login and press any key")
        let desiredRole = await askQuestion("please enter the skill")
        await driver.navigate().to(`https://internshala.com/internships/work-from-home-${desiredRole}-development-internships/`);

        await driver.wait(until.elementsLocated(By.className("internship_meta")), 10000);

        //store the id of the original window
        const originalWindow = await driver.getWindowHandle();

        // // Find all internship elements

        let p = 1;

        while (true) {
            await driver.sleep(3000)
            try {
                const internships = await driver.findElements(By.className("internship_meta"));
                const roles = await driver.findElements(By.className('job-internship-name'));

                for (let i = 1; i < 15; i++) {
                    try{
                        await internships[p].click();

                        const role = await roles[p-1].getText()
                        
                        let interest = await askQuestion("press y interested in appying to following internship " )
                        if (interest === "y") {
                            
                                const jobDes = await driver.findElement(By.className('text-container')).getText();

                                const applyBtn = await driver.wait(until.elementLocated(By.className('btn-large')), 10000);
                                await driver.wait(until.elementIsVisible(applyBtn), 10000);
                                const applybtn = await driver.findElement(By.className('btn-large'));
                                await driver.actions()
                                    .scroll(0, 0, 0, 0, applybtn)
                                    .perform();
                                await applybtn.click();
                                const companyname = await driver.findElement(By.id('easy_apply_company')).getText();

                                const exp = details[0].exp
                                const ach = details[0].ach
                                const coverletter = await run({
                                    jd: jobDes,
                                    role: role,
                                    cn: companyname,
                                    exp: exp,
                                    ach: ach
                                })
                                const coverLetterEditor = await driver.wait(until.elementLocated(By.css('.ql-editor')), 10000);
                                await driver.wait(until.elementIsVisible(coverLetterEditor), 10000);
                                await coverLetterEditor.sendKeys(coverletter, Key.RETURN);
                                // const asses = await askQuestion("are there any assesment?? (type y or press any key))")
                                // if (asses === "y") {
                                    const assessmentQuestions = await driver.findElements(By.className('additional_question'));
                                    for (let question of assessmentQuestions) {
                                        const labelElement = await question.findElement(By.css('.assessment_question > label'));
                                        const labelText = await labelElement.getText();
                                        const ans = await assesment({ "text": labelText });
                                        const textarea = await question.findElement(By.css('textarea'));
                                        await textarea.sendKeys(ans, Key.RETURN);
                                    }
                                // }
                                // else { }
                                await askQuestion("uploaded resume and submitted??");
                                const back = await driver.findElement(By.id('backToInternshipsCta'));
                                await back.click();

                            
                            
                        }
                        else{
                            p++;
                            await driver.navigate().to(`https://internshala.com/internships/work-from-home-${desiredRole}-development-internships/`);
                            await driver.executeScript("scrollBy(0, 120);")
                        }
                    }catch(e){
                        console.log("pleae wait");
                    }
                }
            } catch (error) {
                console.log("pleae wait");
            }
        }

    }
    catch (e) {
        console.log("pleae wait");
    }
}

module.exports = internshala





//modal_login_submit
// const login2btn = await driver.findElement(By.className("modal_login_submit"));
// await login2btn.click();



/*
const interface = await askQuestion('which inteface is this press 1 for direct 2 for window ');

if (interface === "1") {

}
else {
                                await driver.switchTo().window(originalWindow);
                                await driver.sleep(3000);
                                const windows = await driver.getAllWindowHandles();

                                for (let i = windows.length - 1; i >= 1; i--) {
                                    // Switch to the new window
                                    await driver.switchTo().window(windows[i]);

                                    await driver.sleep(1000); // Small delay for page to load



                                    const jobDescription = await driver.wait(until.elementLocated(By.className('text-container')), 10000);
                                    await driver.wait(until.elementIsVisible(jobDescription), 10000);
                                    const jobDes = await driver.findElement(By.className('text-container')).getText();
                                    const companyname = await driver.findElement(By.className('link_display_like_text')).getText();
                                    const role = await driver.findElement(By.className('profile')).getText();
                                    //profile
                                    let userInput = await askQuestion('press 1 to continue with internship? ');
                                    // details_right
                                    await applybtn.click();


                                    //easy_apply_company
                                    if (userInput === "1") {

                                        const applyBtn = await driver.wait(until.elementLocated(By.className('btn-large')), 10000);
                                        await driver.wait(until.elementIsVisible(applyBtn), 10000);
                                        const applybtn = await driver.findElement(By.className('btn-large'));
                                        await driver.actions()
                                            .scroll(0, 0, 0, 0, applybtn)
                                            .perform();
                                        await applybtn.click();
                                        const exp1 = await driver.wait(until.elementLocated(By.className('details_right')), 10000);
                                        await driver.wait(until.elementIsVisible(exp1), 10000);
                                        const exp = await driver.findElement(By.className('details_right')).getText();
                                        //link_display_like_text
                                        const ach = await driver.findElement(By.id('additional_detail_4421890_description')).getText(); //additional_detail_4421890_description

                                        const coverletter = await run({
                                            jd: jobDes,
                                            role: role,
                                            cn: companyname,
                                            exp: exp,
                                            ach: ach
                                        })
                                        //proceed-btn
                                        const proceedBtn = await driver.wait(until.elementLocated(By.className('btn-large')), 10000);
                                        await driver.wait(until.elementIsVisible(proceedBtn), 10000);
                                        const proceedbtn = await driver.findElement(By.className('btn-large'));
                                        await driver.actions()
                                            .scroll(0, 0, 0, 0, proceedbtn)
                                            .perform();
                                        await proceedbtn.click();
                                        //cover_letter_container
                                        const coverLetterEditor = await driver.wait(until.elementLocated(By.css('.ql-editor')), 10000);
                                        await driver.wait(until.elementIsVisible(coverLetterEditor), 10000);
                                        await coverLetterEditor.sendKeys(coverletter, Key.RETURN);
                                        await driver.sleep(20000)
                                        const asses = await askQuestion("are there any assesment?? (type y or press any key))")
                                        if (asses === "y") {
                                            const assessmentQuestions = await driver.findElements(By.className('additional_question'));
                                            for (let question of assessmentQuestions) {
                                                const labelElement = await question.findElement(By.css('.assessment_question > label'));
                                                const labelText = await labelElement.getText();
                                                const ans = assesment(labelText);
                                                const textarea = await question.findElement(By.css('textarea'));
                                                await textarea.sendKeys(ans, Key.RETURN);
                                            }
                                        }
                                        else { }
                                        await askQuestion("uploaded resume and submitted??");
                                    }
                                    else {
                                        console.log("skip")
                                    }
                                }
                            }

*/ 