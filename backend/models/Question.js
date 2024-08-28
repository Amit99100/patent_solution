const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionTitle: {
        type: String,
        required: true,
        maxlength: 100

    },
    questionDetails: {
        type: String,
        required: true,
        maxlength: 2000
    },
    askedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    askedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expertName: {
        type: String,
        default: "Not Found "
    },
    userName: {
        type: String,
    },
    prodCategory: {
        type: String,
    },
    answer: {
        type: String,
        maxlength: 5000,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
