
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
export function isValidSubject(subject) {
    if (subject === null || Object.keys(subject).length === 0) {
        return false
    } else
        return true
}

// Function to validate titles
export function isValidText(title) {
    const invalidTitle = /[)(*+/~`!@#$%^&]/g;
    if (!title || title.length === 0 || title.match(invalidTitle)) {
        return false
    } else
        return true
}

// Function to validate email
export function isValidEmail(email) {
    const validEmailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || email.length === 0) {
        return false
    } else {
        if (email.match(validEmailFormat)) {
            return true
        }
        else {
            return false
        }
    }
}

// Function to validate password
export function isValidPassword(password) {
    const lowercase = /[a-z]/g;
    const uppercase = /[A-Z]/g;
    const numbers = /[0-9]/g;

    if (!password || password.length < 8) {
        return false
    } else {
        if (
            password.match(lowercase) &&
            password.match(uppercase) &&
            password.match(numbers)
        ) {
            return true
        }
        else {
            return false
        }
    }
}

// Function to validate confirm password
export function isValidConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        return false
    } else {
        return true
    }
}

// Function to validate Phone No
export function isValidPhoneNo(phoneNo) {
    const numbers = /^\d{10}$/;
    if (phoneNo.length === 0 || phoneNo.match(numbers)) {
        return true
    } else {
        return false
    }
}