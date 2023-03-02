import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import { organisationModel } from '../models/organisationModel.js'
import { userModel } from '../models/userModel.js';
import ErrorHandler from '../utils/errorHandler.js';

export const getAllOrganisationsAdmin = catchAsyncError(async (req, res, next) => {
    const organisations = await organisationModel.find();
    res.status(200).json({
        success: true,
        organisations
    });
});

export const addMemberAdmin = catchAsyncError(async (req, res, next) => {
    
    const {organisation_id, organisation_name, user_id, user_name, user_type, user_email, user_phone, user_dob} = req.body;
    
    if(!organisation_id || !organisation_name || !user_id || !user_name || !user_type || !user_email || !user_phone || !user_dob) {
        return next(new ErrorHandler("PLEASE ENTER ALL FIELDS.", 400));
    }
    
    // FOR UPLOADING AVATAR
    // const file = req.file;

    let member = await userModel.findOne({ user_email });

    if(member) {
        return new ErrorHandler("MEMBER ALREADY EXISTS", 409);
    }

    member = await userModel.create({
        organisation_id,
        organisation_name,
        user_id,
        user_name, 
        user_type,
        user_password: user_dob,
        user_email,
        user_phone,
        user_dob,
        user_avatar: {
            public_id: "temp",
            url: "temp"
        }
    });

    res.status(201).json({
        success: true,
        message: "MEMBER ADDED SUCCESSFULLY."
    });
});