
// Function to validate input files
export function isValidFile(inputFile) {
    let errMsg = "";
    let isValid = true;
    if (inputFile.size === undefined) {
        errMsg = "Please select a file"
        isValid = false
    } else if (!(inputFile.type === "image/jpg" || inputFile.type === "image/jpeg" || inputFile.type === "image/png" || inputFile.type === "application/pdf")) {
        errMsg = "Only .jpg, .jpeg, .png, .pdf files are allowed"
        isValid = false
    }
    else {
        errMsg = ""
        isValid = true
    }
    return { errorMessage: errMsg, isValid: isValid };
}

// Function to validate subjects
export function isValidSubject(inputField) {
    if (inputField === null || Object.keys(inputField).length === 0) {
        return false
    } else
        return true
}

// Function to validate titles
export function isValidText(inputField) {
    if (!inputField || inputField.length === 0) {
        return false
    } else
        return true
}



