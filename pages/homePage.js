/*
Description: This class contains all the web elements used and actions performed in the user HOME main page.
*/

exports.HomePage = class HomePage {

    /**
     *Parameter(s) used by default when this class is instanciated
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        //Reuse of same page object within the same test
        this.page = page

        //Web Elements located dinamically
        this.companyNameTextbox = page.getByText('Company Name').locator('xpath=ancestor::div[contains(@class,"bubble-element Group")][1]').getByRole('textbox')
        this.addressTextbox = page.getByText('Address').locator('xpath=ancestor::div[contains(@class,"bubble-element Group")][1]').getByRole('textbox')
        this.einTextbox = page.getByText('EIN').locator('xpath=ancestor::div[contains(@class,"bubble-element Group")][1]').getByRole('textbox')
        this.sectorTextbox = page.getByText('Sector').locator('xpath=ancestor::div[contains(@class,"bubble-element Group")][1]').getByRole('textbox')
        this.automationToolTextbox = page.getByText('Automation Tool').locator('xpath=ancestor::div[contains(@class,"bubble-element Group")][1]').getByRole('textbox')
        this.annualSavingTextbox = page.getByText('Annual Saving').locator('xpath=ancestor::div[contains(@class,"bubble-element Group")][1]').getByRole('textbox')
        this.dateTextbox = page.getByText('Date').locator('xpath=ancestor::div[contains(@class,"bubble-element Group")][1]').getByRole('textbox')
        this.startButton = page.getByRole('button', { name: 'Start' })
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.downloadExcelButton = page.getByText('  Download Excel Spreadsheet')
        this.captchaButton = page.getByRole('button', { name: 'presentation' })
    }

    //////////////////////////////////////////Actions methods

    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async companyNameTextboxFill(companyName) {
        await this.companyNameTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.companyNameTextbox.clear()
        await this.companyNameTextbox.fill(companyName)
    }

    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async addressTextboxFill(address) {
        await this.addressTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.addressTextbox.clear()
        await this.addressTextbox.fill(address)
    }

    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async einTextboxFill(ein) {
        await this.einTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.einTextbox.clear()
        await this.einTextbox.fill(ein) 
    }
    
    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async sectorTextboxFill(sector) {
        await this.sectorTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.sectorTextbox.clear()
        await this.sectorTextbox.fill(sector)
    }
     

    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async automationToolTextboxFill(automationTool) {
        await this.automationToolTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.automationToolTextbox.clear()
        await this.automationToolTextbox.fill(automationTool)
    }

    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async annualSavingTextboxFill(annualSaving) {
        await this.annualSavingTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.annualSavingTextbox.clear()
        await this.annualSavingTextbox.fill(annualSaving)
    }

    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async dateTextboxFill(date) {
        await this.dateTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.dateTextbox.clear()
        await this.dateTextbox.fill(date)
    }

    /*
    * Parameter: None
    * Description: The method waits 2 secs for the element to be available in page and clicks on button
    */
    async startButtonClick() {
        await this.startButton.waitFor({ state: 'visible', timeout: 2000 })
        await this.startButton.click()
    }

    /*
    * Parameter: None
    * Description: The method waits 2 secs for the element to be available in page and clicks on button
    */
    async downloadExcelButtonClick() {
        await this.downloadExcelButton.waitFor({ state: 'visible', timeout: 2000 })
        await this.downloadExcelButton.click()
    }

    /*
    * Parameter: None
    * Description: The method waits 2 secs for the element to be available in page and clicks on button
    */
    async submitButtonClick() {
        await this.submitButton.waitFor({ state: 'visible', timeout: 2000 })
        await this.submitButton.click()
    }

}