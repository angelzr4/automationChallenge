    /*
    Description: This function listens for an element to be displayed in page and performed the action in callback after element has been found.
    */

    /**
     * Parameter(s) used when this function is called
     * @param {import ('@playwright/test').Page} page                            
     * @param {import { captchaButton } from '../pages/homePage'} captchaButton  
     * @param {Function} callback                                                
     * @param {number} timeout                                                   
     */

    /*
    * Parameter:
    *   - page: Reuse of same page object within the same test
    *   - captchaButton: Web element to detect to be displayed in page
    *   - callback: Action performed after element has been found
    *   - timeout?: (Optional) Time to wait for the element to be displayed
    * Description: The function looks {timeout} milliseconds for the element, checks how many elements matches {captchaButton},
    *              if "element exists", then performs the {callback} action and returns, if "element is not present" the function
    *              function returns to test execution.
    */
    async function popupListener(page, captchaButton, callback, timeout = 200){
        //Get the current timestamp in milliseconds at the moment this function is called
        const start = Date.now()

        //Looks "timeout" milliseconds for the element to be displayed. If found, then perform the callback action.
        while (Date.now() -start < timeout){
            const count = await captchaButton.count()
            if(count > 0) {
                console.log('Captcha appeared')
                await callback(page, captchaButton)
                return
            }
        }
    }    

    module.exports = { popupListener }