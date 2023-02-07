
const CollegeModel = require("../models/collegeModel");
const InternModel = require("../models/internModel");
const axios=require("axios")
const { isValidName, isValidUrl,isValidFullName } = require("../validators/validators")




//=================================================================post API : createCollegeData=======================================
const createCollege = async(req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Put some data to create College" });

        let { name, fullName, logoLink } = data

        if (!name) return res.status(400).send({ status: false, message: "Name is required" })
        let validName = isValidName(name)
        if (!validName) return res.status(400).send({ status: false, message: "Name can contain only letters " })

        if (!fullName) return res.status(400).send({ status: false, message: "FullName is required" })
        let validFullName = isValidFullName(fullName)
        if (!validFullName) return res.status(400).send({ status: false, message: "FullName can contain only letters " })


        if (!logoLink) return res.status(400).send({ status: false, message: "LogoLink is required" })
        let validLogoName = isValidUrl(logoLink)
        if (!validLogoName) return res.status(400).send({ status: false, message: "Link is not valid " })
        let urlfound = false;
        // let url = { method: 'get', url: logoLink };
      
        await axios.get(logoLink)
        .then((result) => {
        if ( result.status == 201 || result.status == 200 )
            urlfound = true;
        })
        .catch((err) => {});
      
        if (urlfound == false) return res.status(400).send({ status: false, message: "Link is not valid " })




        let collegeExist = await CollegeModel.findOne({ $or: [{ fullName: fullName }, { name: name }] }).select({ fullName: 1, name: 1, _id: 0 })

        if (collegeExist) return res.status(404).send({ status: false, message: "College already exist with this name ", data: collegeExist })
        let collegeDetails = await CollegeModel.create(data);


        return res.status(201).send({ status: true, data: collegeDetails });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}

//=================================================================Get API : getcollegedata=======================================


const getCollegeData = async function (req, res) {
 try {

      const collegeName = req.query.collegeName
      if(!collegeName) return res.status(400).send({status:false, message:"Please enter college Name"})
      let validCollegeName = isValidName(collegeName)
      if (!validCollegeName) return res.status(400).send({ status: false, message: "CollegeName can contain only letters " })

      let collegeDetails = await CollegeModel.findOne({name:collegeName, isDeleted:false}).select({ name:1, fullName:1,logoLink:1})
      if(!collegeDetails) return res.status(404).send({status:false, message:"college doesn't exist with this name"})

      let obj  = {
        name : collegeDetails.name,
        fullName :collegeDetails.fullName,
        logoLink : collegeDetails.logoLink,
        }

        
      let internsDetails= await InternModel.find({collegeId:collegeDetails._id,isDeleted:false}).select({name:1, email:1, mobile:1})
        if(internsDetails.length===0){
           obj.interns="No interns applied for this college"
        }
         else {
      obj.interns=internsDetails
       }
   
        return res.status(200).send({status:true , Data: obj})
    
 } catch (error) {

    return res.status(500).send({ status: false, message: error.message })

 }



}

module.exports = { createCollege , getCollegeData};