import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name must contain atleast 3 characters"],
        maxLength: [30, "Name must contain maximum 30 characters"],
        validate: [validator.isAlphanumeric, "Please enter characters only"],
        trim: true,
    },
    dob: {
        type: String,
        validate: [validator.isDate, "Enter valid Date"],
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Other"],
            message: "Please select gender",
        },
        validate: [validator.isAlpha, "Enter valid entity"],
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    phone: {
        type: Number,
        minLength:[10, "Minimum length should be 10"]

    },
    email: {
        type: String,
        // required: [true, "Please enter email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"],
    },
    password: {
        type: String,
        minLength: [8, "Password must be atleast 8 characters"],
        select: false,
        validate: [validator.isStrongPassword, "Enter a strong Password"],
    },
    token: {
        type: String,
    },
    docAvatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    role: {
        type: String,
        enum: {
            values: ["Customer", "Admin"],
            message: "Please select role",
        },
    
        validate: [validator.isAlpha, "Enter a valid entity"],
    }

}, { timestamps: true }
);

const user = mongoose.model("User", userSchema);
export default user;