
const extractErrors = (errors) => {
    const extractedErrors = {};
    Object.keys(errors).forEach((field) => {
        extractedErrors[field] = errors[field].message;
    });
    return extractedErrors;
}

export {
    extractErrors
}