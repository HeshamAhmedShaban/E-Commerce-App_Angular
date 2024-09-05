
export enum CustomValidationType {
    required = 'required',
    minLength = 'minLength',
    maxLength = 'maxLength',
    minValue = 'minValue',
    maxValue = 'maxValue',
    mobileNumberValidation = 'mobileNumberValidation',
    englishOnly = 'englishOnly',
    arabicOnly = 'arabicOnly',
    numberOnly = 'numberOnly',
    IBAN = 'IBAN',
    SOFT_Code='SOFT_Code',
    patternValidator = 'patternValidator',
    slugValidator = 'slugValidator',
    heightValidator = 'heightValidator',
    descriptionValidator = 'descriptionValidator',
    negativeValue = 'negativeValue',
    languageMismatch ='languageMismatch',
    containsNumbers = 'containsNumbers'
}
    // last code in sportyanoWEbAPp
// export enum CustomValidationType {
//     required = 'required',
//     minLength = 'minLength',
//     maxLength = 'maxLength',
//     minValue = 'minValue',
//     maxValue = 'maxValue',
//     mobileNumberValidation = 'mobileNumberValidation',
//     patternValidator = 'patternValidator',
//     englishOnly = 'englishOnly',
//     arabicOnly = 'arabicOnly',
//     numberOnly = 'numberOnly',
//     IBAN = 'ibanError',
//     swift_code = 'swiftCodeError',
//     account_Name_En = 'invalidName',
//     customError = 'customError',
//     elevenDigitNumber = 'elevenDigitNumber',
//     slugValidator = 'slugValidator',
//     heightValidator = 'heightValidator',
//     descriptionValidator = 'descriptionValidator'
// }


export enum VariablesValidation {
    minLengthDescription = 10,
    maxLengthDescription = 25,
    minLengthShortname = 3,
    maxLengthShortname = 10,
    minValueNum = 110,
    maxValueNum = 1000,
}


export const PatternValidation = {

    SlugPattern: /^[a-z0-9]+$/,
    googleMapsLink: /https?:\/\/(www\.)?(google\.(com|[a-z]{2,3})\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)\/?.*?/,
    containsMaps: /maps/
} as const;