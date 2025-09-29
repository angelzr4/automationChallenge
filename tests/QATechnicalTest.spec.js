//Include and import all relevant class modules
const path = require('path')
const { popupListener } = require('../utils/popupHandler')

import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { HomePage } from '../pages/homePage'
import { ExcelHandler } from '../utils/excelHandler'

//////////////////////////////////////////////TEST CASE

/*
* Type: Hook - BeforeEach
* Description: Navigates to specified URL and verifies its correct navigation.
*/
test.beforeEach('Navigation to URL', async({page}) => {
    await test.step('Go to: https://www.theautomationchallenge.com/', async () => {
        //Navigate to the respective URL and verify correct page is displayed
        await page.goto(process.env.URL)
        await expect(page).toHaveTitle(process.env.PAGE_TITLE)
    })
})

/*
* Type: Main Test Case
* Description: Logins with user credentials, download and store the file to be used as a data input
*   and start fulfilling all the data into the respective fields until all data has been submitted.
*/
test('Automation Challenge', async({page}) => {
    //Classes Object instances
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)
    const excelHandler = new ExcelHandler()

    //Global variables declaration (shared between test steps)
    let data
    let auxCaptchaButton

    /*
    * Description: Login with user credential
    */ 
    await test.step('User login', async () => {
        try{
        //Verify "Login" window is displayed after clicking login button
            await loginPage.homeLoginButtonClick()
            await expect(loginPage.signUpWindow).toBeVisible()
            await loginPage.registeredUserLoginButtonClick()

        //Verify navigation to login input data window and enter user login data (email and password)
            await expect(loginPage.resetPasswordButton).toBeVisible()
            await loginPage.emailTextboxFill(process.env.USER_EMAIL)
            await loginPage.passwordTextboxFill(process.env.PASSWORD)
        
            //Verify "Remember me" checkbox status, if unchecked, then checks the element
            try{
                await expect(loginPage.rememberMeCheckbox).toBeChecked()
            } catch {
                await loginPage.rememberMeCheckboxState()
            }
        
        //Click on login button and verify user has logged in
            await loginPage.finalLoginButtonClick()
            await expect(loginPage.userLoggedButton).toHaveText(process.env.USER_NAME)

        } catch (error) {
            throw error
        }
    })

    /*
    * Description: Download and store the excel file available in home page and get the data to fill it
    *   into the respective fields. 
    */
    await test.step('Download and store excel file', async () => {
        try{
            //Download excel file with data to be input into web application
            const downloadPromise = page.waitForEvent('download')
            await homePage.downloadExcelButtonClick()
            const download = await downloadPromise
            //Save file at "data/..."
            await download.saveAs(path.resolve(__dirname, process.env.DATA_PATH))
            
            //Prepare downloaded excel data 
            data = await excelHandler.getTestData(process.env.DATA_PATH, process.env.DATA_SHEET)
       
        } catch (error) {
            throw error
        }
    })

    /*
    * Description: Clicks on "Start" button to start the challenge 
    */ 
    await test.step('Start challenge', async () => {
        try{
            await homePage.startButtonClick()

        } catch (error) {
            throw error
        }
    })

    /*Description: Enters the excel data into their respective fields and submits the form:
        - Company Name
        - Address
        - EIN
        - Sector
        - Automation Tool
        - Annual Savings
        - Date
    */      
    await test.step('Enter data into respective fields and submit the form', async () => {
        try{
            auxCaptchaButton = await homePage.captchaButton
            for (const dataRow of data) {
                //Looks for the reCaptcha window to be displayed and perform the action required by reCaptcha.
                await popupListener(page, auxCaptchaButton, async(page, auxCaptchaButton) => {auxCaptchaButton.click()})
                
                //Fills excel data into respective page fields
                await homePage.companyNameTextboxFill(dataRow.company_name)
                await expect(homePage.companyNameTextbox).not.toBeEmpty()
                await homePage.addressTextboxFill(dataRow.company_address)
                await expect(homePage.addressTextbox).not.toBeEmpty()
                await homePage.einTextboxFill(dataRow.employer_identification_number)
                await expect(homePage.einTextbox).not.toBeEmpty()
                await homePage.sectorTextboxFill(dataRow.sector)
                await expect(homePage.sectorTextbox).not.toBeEmpty()
                await homePage.automationToolTextboxFill(dataRow.automation_tool)
                await expect(homePage.automationToolTextbox).not.toBeEmpty()
                await homePage.annualSavingTextboxFill(dataRow.annual_automation_saving)
                await expect(homePage.annualSavingTextbox).not.toBeEmpty()
                await homePage.dateTextboxFill(dataRow.date_of_first_project)
                await expect(homePage.dateTextbox).not.toBeEmpty()

                //Submits entered data
                await homePage.submitButtonClick()
            }
        } catch (error) {
            throw error
        }
    })

})

/*
* Type: Hook - AfterEach
* Description: Attaches the downloaded excel file to the test report as a reference.
*/
test.afterEach('Teardown', async({page}) => {
    await test.step('Attach excel file to report', async () => {
        //Waits for 2 seconds to see achievement and attach screenshot and downloaded excel file
        const screenhotBuffer = await page.screenshot({fullPage: true})
        await page.waitForTimeout(2000)
        await test.info().attach('Challenge achieved', {contentType: 'image/png', body: screenhotBuffer})
        await test.info().attach('Downloaded Excel Data', {contentType: 'application/zip', path: path.resolve(__dirname, process.env.DATA_PATH)})

        //Close driver
        await page.close()
    })

})