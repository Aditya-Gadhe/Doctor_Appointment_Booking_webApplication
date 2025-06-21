import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req,res) =>{
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,message:"availability changed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const doctorList = async (req,res) =>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for doctor login
const loginDoctor = async (req,res) =>{
    try {
        const {email,password} = req.body
        const doctor = await doctorModel.findOne({email})
        if(!doctor) {
            return res.json({success:false,message:"Invalid Credintials"})
        }

        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch) {
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Inavlid Credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for doctor appointments for Doctor Panel
const appointmentsDoctor = async (req,res) => {
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to mark appointment completed for doctor panel
const appointmentCompleted = async (req,res) => {
    try {
        const {docId , appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:"Appointment Completed"})
        } else {
            return res.json({success:false,message:"Mark Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to cancel appointment completed for doctor panel
const appointmentCancelled = async (req,res) => {
    try {
        const {docId , appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            return res.json({success:true,message:"Appointment Cancelled"})
        } else {
            return res.json({success:false,message:"Cancellation Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get dashboard data for doctor panel
const doctorDashboard = async (req,res) => {
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        let earnings = 0

        appointments.map((item)=>{
            if(item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item)=>{
            if(!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments : appointments.length,
            patients : patients.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to display doctor profile
const doctorProfile = async (req,res) => {
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        return res.json({success:true,docData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to update doctor profile
const updateProfile = async (req, res) => {
  try {
    const { docId, name, experience, fees, address, city, about} = req.body;
    const imageFile = req.file;

    if (!name || !experience || !address || !city || !fees || !about) {
      return res.json({ success: false, message: "Data Missing" });
    }

    let updateFields = { name, address, city, fees , experience , about };

    // Upload new image to Cloudinary if present
    if (imageFile) {
      const imgUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image'
      });
      updateFields.image = imgUpload.secure_url;
    }

    // Update doctor profile
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      docId,
      updateFields,
      { new: true } // Return the updated document
    );

    // Update doctorData in all their appointments
    await appointmentModel.updateMany(
      { docId: docId },
      { docData: updatedDoctor }
    );

    return res.json({ success: true, message: "Profile Updated" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentCompleted,appointmentCancelled,doctorDashboard,doctorProfile,updateProfile}