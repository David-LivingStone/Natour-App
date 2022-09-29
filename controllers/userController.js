const User = require("../models/userModel");
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const app = require("../app");



const filterObj = (obj, ...allowedFields) => {
    const newObj ={};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}
exports.getAllUsers = catchAsync (async (req, res, next) => {
    const user = await User.find();
    res.status(200).json({
        status: 'Success',
        result: user.length,
        user: {
            user
        }
    });
});
exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
exports.updateMe = catchAsync( async  ( req, res, next) => {
    //1. Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm){
        return next(new AppError('This route is not for password Update, Please use /updateMyPassword.', 400));
    }
    // 2. Filtered out unwanted fields
    const FilteredBody = filterObj(req.body, 'name', 'email')

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, FilteredBody, {
        new: true,
        runValidators: true 
    });

    res.status(200).json({
        status: 'Success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false});

    res.status(204).json({
        status: 'Success',
        data: null
    })
})
