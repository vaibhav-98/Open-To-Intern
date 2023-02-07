const mongoose = require("mongoose");




//__________________________ Validations : Name ___________________________________________

const isValidName = function(name) {
    name = name.trim()
    const nameRegex = /^[a-z]*$/;
    return nameRegex.test(name);
};

//__________________________ Validations : FullName ___________________________________________


const isValidFullName = function(fullName) {
    fullName = fullName.trim().replace(/\s+/g, ' ')
    const fnameRegex = /^[a-z, A-Z]*$/;
    return fnameRegex.test(fullName);
};
//__________________________ Validations : Email  ___________________________________________

const isValidEmail = function(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[com]+)*$/;
    return emailRegex.test(email);
};

//__________________________ Validations : Link  ___________________________________________

const isValidUrl = function(link) {
    const linkRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    return linkRegex.test(link);
};
//__________________________ Validations : MobileNumber  ___________________________________________

const isValidMobileNumber = function(mobile) {
    const MobileNumberRegex = /^[6-9]\d{9}$/;
    return MobileNumberRegex.test(mobile);
};


//__________________________ Validations :  ObjectId ___________________________________________

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
};

//__________________________ Export : Modules  ___________________________________________

module.exports = {

    isValidEmail,
    isValidName,
    isValidUrl,
    isValidMobileNumber,
    isValidObjectId,
    isValidFullName


};