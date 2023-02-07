const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");
const { isValidEmail, isValidMobileNumber, isValidFullName } = require("../validators/validators")


const createIntern = async(req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Put some data to create College" });

        let { name, email, mobile, collegeName } = data


        if (!name) return res.status(400).send({ status: false, message: "Name is required" })
        let validName = isValidFullName(name)
        if (!validName) return res.status(400).send({ status: false, message: "Name can contain only letters " })


        if (!email) return res.status(400).send({ status: false, message: "Email is required" })
        let validEmail = isValidEmail(email)
        if (!validEmail) return res.status(400).send({ status: false, message: "Enter a valid email " })
        let emailExist = await InternModel.findOne({ email: email, isDeleted: false })
        if (emailExist) return res.status(400).send({ status: false, message: "email already exist  " })

        
        if (!mobile) return res.status(400).send({ status: false, message: "Mobile number is required" })
        let validMobile = isValidMobileNumber(mobile)
        if (!validMobile) return res.status(400).send({ status: false, message: "Enter a valid mobile number " })
        let mobileExist = await InternModel.findOne({ mobile: mobile, isDeleted: false })
        if (mobileExist) return res.status(400).send({ status: false, message: "Mobile number already exist  " })

        if (!collegeName) return res.status(400).send({ status: false, message: " college name is required  " })

        let collegeDetails = await CollegeModel.findOne({ name: collegeName, isDeleted: false })
        data.collegeId = collegeDetails._id

        if (!collegeDetails) return res.status(404).send({ status: false, message: " college does not exist with this name  " })

        let internDetails = await InternModel.create(data);
        return res.status(201).send({ status: true, data: internDetails });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

module.exports = { createIntern };