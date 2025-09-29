/*
Description: This class contains the method to get the data from an external excel file, from an specified sheet and return an array of objects with data in JSON format.
*/

//Import relevant class modules
const path = require('path')
const excelFile = require('xlsx')

exports.ExcelHandler = class ExcelHandler {
    
    /*
    * Parameter:
    *   - filePath: Excel file location
    *   - fileSheet: Sheet to be used as a data
    * Description: The method reads the excel file, reads the data from the specified sheet, transforms data into JSON format and returns an array of objects
    */
    async getTestData(filePath, fileSheet) { 
        // Load the workbook
        const workbook = excelFile.readFile(path.resolve(__dirname, filePath))

        // Pick the desired sheet with data
        const worksheet = workbook.Sheets[fileSheet]

        // Convert data sheet to JSON (array of objects)
        const data = excelFile.utils.sheet_to_json(worksheet)

        return data
    }

}




