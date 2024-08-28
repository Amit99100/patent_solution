


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 100,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        maxlength: 20,
        default: "",
        required: function () {
            return this.role === 2; // Required only if role is 2 (expert)
        },
        match: [
            /^\+(?:[0-9] ?){6,14}[0-9]$/,
            'Please add a valid phone number, including country code'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        maxlength: 400,
        match: [
            /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special character'
        ]
    },
    details: {
        type: String,
        maxlength: 200,
        // required: function () {
        //     return this.role === 0; // Required only if role is 0 (user)
        // }
    },
    role: {
        type: Number,
        default: 0 // Default role for regular users
    },
    Tell_About_Yourself: {
        type: String,
        maxlength: 300,
        required: function () {
            return this.role === 2; // Required only if role is 2 (expert)
        },
    },
    pic: {
        type: "String",
        // default:
        //     "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        required: function () {
            return this.role === 2; // Required only if role is 2 (expert)
        }
    },
    expertise: {
        type: String,
        maxlength: 300,
        required: function () {
            return this.role === 2; // Required only if role is 2 (expert)
        }
    },
    hourlyRate: {
        type: Number,
        maxlength: 10,
        required: function () {
            return this.role === 2; // Required only if role is 2 (expert)
        }
    },
    approved: {
        type: Boolean,
        default: false, // Default to false (not approved)
    },
    token2: {
        type: String
    },
    category: {
        type: String,
        default: "none"
    },
    rank: {
        type: Number,
        default: 0
    },
    verified: { type: Boolean, default: false },
    // questions: [questionSchema] // Add questions as a subdocument array
}, { timestamps: true });

// Encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Verify password
userSchema.methods.comparePassword = async function (yourPassword) {
    return await bcrypt.compare(yourPassword, this.password);
};

// Generate JWT token
userSchema.methods.jwtGenerateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
};

module.exports = mongoose.model('User', userSchema);
