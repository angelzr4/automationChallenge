/*
Description: This class contains all the web elements used and actions performed in the user LOGIN process.
*/

exports.LoginPage = class LoginPage {

    /**
     * Parameter(s) used by default when this class is instanciated
     * @param {import ('@playwright/test').Page} page 
     */
    constructor(page){
        //Reuse of same page object within the same test
        this.page = page

        //Web Elements located dinamically
        this.homeLoginButton = page.getByRole('button', { name: 'SIGN UP OR LOGIN' })
        this.signUpWindow = page.getByRole('link', {name: 'Privacy Policy'})
        this.registeredUserLoginButton = page.locator('xpath=//button[text()="OR LOGIN"]')
        this.resetPasswordButton = page.getByRole('button', { name: 'RESET PASSWORD' })
        this.emailTextbox = page.getByRole('textbox', { name: 'Email' })
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' })
        this.rememberMeCheckbox = page.getByRole('checkbox', { id: '1758833266264x8866' })
        this.finalLoginButton = page.getByRole('button', { name: 'LOG IN' })
        this.userLoggedButton = page.getByRole('button', { name: process.env.USER_NAME })
    }

    //////////////////////////////////////////Actions methods

    /*
    * Parameter: None
    * Description: The method waits 2 secs for the element to be available in page and clicks on button
    */
    async homeLoginButtonClick() {
        await this.homeLoginButton.waitFor({ state: 'visible', timeout: 2000 })
        await this.homeLoginButton.click()
    }

    /*
    * Parameter: None
    * Description: The method waits 2 secs for the element to be available in page and clicks on button
    */
    async registeredUserLoginButtonClick() {
        await this.registeredUserLoginButton.waitFor({ state: 'visible', timeout: 2000 })
        await this.registeredUserLoginButton.click()
    }

    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async emailTextboxFill(email) {
        await this.emailTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.emailTextbox.clear()
        await this.emailTextbox.fill(email) 
    }
    
    /*
    * Parameter: Receives data to be input into textbox
    * Description: The method waits 2 secs for the element to be available in page, clears the textbox and fill it with the received data as a parameter
    */
    async passwordTextboxFill(password) {
        await this.passwordTextbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.passwordTextbox.clear()
        await this.passwordTextbox.fill(password)
    }
     

    /*
    * Parameter: None
    * Description: The method waits 2 secs for the element to be available in page and checks the checkbox element
    */
    async rememberMeCheckboxState() {
        await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: 2000 })
        await this.rememberMeCheckbox.check()
    }

    /*
    * Parameter: None
    * Description: The method waits 2 secs for the element to be available in page and clicks on button
    */
    async finalLoginButtonClick() {
        await this.finalLoginButton.waitFor({ state: 'visible', timeout: 2000 })
        await this.finalLoginButton.click()
    }

}