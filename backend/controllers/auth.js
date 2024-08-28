const User = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');
const Question = require('../models/Question');






const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');



exports.signup = async (req, res, next) => {
    const { email } = req.body;

    // Check if the email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse('E-mail already exists', 400));
    }

    try {
        // Create the user
        const user = await User.create(req.body);

        // Generate a token for email verification
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save();

        // Create the verification URL
        const url = `${process.env.BACKEND_URL}/api/users/${user._id}/verify/${token.token}`;

        // Send verification email
        await sendEmail(user.email, "Verify Email", url);
        console.log("Verification email sent to:", user.email);



        // Respond to the client
        res.status(201).json({
            success: true,
        });



    } catch (error) {
        console.error("Signup Error:", error);
        next(error);
    }
};

//verify token that we send to users during signup process ( later i added this feature )
exports.verifyToken = async (req, res, next) => {


    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send({ message: "Invalid link" });

        // Update only the verified field
        await User.updateOne({ _id: user._id }, { $set: { verified: true } });

        // Remove the token after successful verification
        await token.remove();

        // res.status(200).send({ message: "Email verified successfully" });
        // Send an HTML response
        res.status(200).send(`
            <html>
                <head>
                    <title>Email Verified</title>
                </head>
                <body>
                    <h1>Email Verified Successfully!</h1>
                    <p>Thank you for verifying your email. You can now log in to your account.</p>
                    <a href=${process.env.FRONTEND_URL}/signin>Go to Login</a>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

}




// *********************************************************** ( later i added this )


exports.signin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {

            return next(new ErrorResponse('E-mail and password are required', 400))
        }

        // check user e-mail
        const user = await User.findOne({ email });
        if (!user) {

            return next(new ErrorResponse('Invalid credentials', 400))
        };




        if (user.verified == false) {

            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex')
            }).save();

            const url = `${process.env.BACKEND_URL}/api/users/${user._id}/verify/${token.token}`;

            await sendEmail(user.email, "Verify Email ", url);
            console.log("user mail is amit ", user.email);

            res.status(201).send({
                message: "An Email sent to your account please verfiy "
            });
        }

        // verify user password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {

            return next(new ErrorResponse('Invalid credentials', 400))
        }

        generateToken(user, 200, res);
    }
    catch (error) {
        console.log(error);

        next(new ErrorResponse('Cannot log in, check your credentials', 400))
    }

}


const generateToken = async (user, statusCode, res) => {
    const token = await user.jwtGenerateToken();

    // Ensure EXPIRE_TOKEN is a valid number
    const expireTokenDuration = parseInt(process.env.EXPIRE_TOKEN, 10);

    if (isNaN(expireTokenDuration)) {
        throw new Error('EXPIRE_TOKEN environment variable is not a valid number');
    }

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + expireTokenDuration),
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
};


//LOG OUT USER
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}



// USESR PROFILE 
exports.userProfile = async (req, res, next) => {

    const user = await User.findById(req.user.id);
    res.status(200).json({
        sucess: true,
        user
    });
}


exports.singleUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            sucess: true,
            user
        })

    } catch (error) {
        next(error)

    }

};


// Controller method to list all users
exports.listUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }


};




exports.approveExpert = async (req, res, next) => {
    try {
        // Find user by id and update approval status to true
        const user = await User.findByIdAndUpdate(
            req.params.id, // User ID from request parameters
            { approved: true }, // Update approved field to true
            { new: true } // Return updated document after update
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Expert approved successfully.', user });
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};

// Controller method to remove a user
exports.removeUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User removed successfully.' });
    } catch (error) {
        next(error);
    }
};



exports.questions = async (req, res) => {
    const { expertId, questionTitle, questionDetails, currentUserId, expertName, prodCategory, userName } = req.body;

    console.log(`Received data: expertId = ${expertId}, currentUserId = ${currentUserId}`);

    try {
        // Create a new question document
        const question = new Question({
            questionTitle,
            questionDetails,
            askedBy: currentUserId,
            askedTo: expertId,
            expertName: expertName,
            prodCategory: prodCategory,
            userName: userName,
        });


        // Save the question
        await question.save();

        res.status(200).json({ msg: 'Question submitted successfully' });
    } catch (error) {
        console.error('Error submitting question:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};



//*****************










// Fetch questions asked by the logged-in user
exports.getMyQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find({ askedBy: req.user.id });
        res.status(200).json({ success: true, questions });
    } catch (error) {
        next(new ErrorResponse('Error fetching questions', 500));
    }
};

// Fetch answers to questions asked by the logged-in user
exports.getAnswersToMyQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find({ askedBy: req.user.id, answer: { $exists: true } }).populate('askedTo', 'name');
        res.status(200).json({ success: true, questions });
    } catch (error) {
        next(new ErrorResponse('Error fetching answers', 500));
    }
};

// Fetch questions directed to the expert
exports.getQuestionsForExpert = async (req, res, next) => {
    try {
        const questions = await Question.find({ askedTo: req.user.id });
        res.status(200).json({ success: true, questions });
    } catch (error) {
        next(new ErrorResponse('Error fetching questions', 500));
    }
};

// Answer a question
exports.answerQuestion = async (req, res, next) => {
    const { questionId, answer } = req.body;
    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return next(new ErrorResponse('Question not found', 404));
        }
        question.answer = answer;
        await question.save();
        res.status(200).json({ success: true, msg: 'Answer submitted successfully' });
    } catch (error) {
        next(new ErrorResponse('Error answering question', 500));
    }
};


// Remove  a question
exports.removeQuestion = async (req, res, next) => {
    const { questionId } = req.body;
    try {
        const q = await Question.findById(questionId);
        if (!q) {
            return next(new ErrorResponse('Question not found', 404));
        }
        console.log("questions  is ", q);
        await Question.findByIdAndDelete(q._id);
        res.status(200).json({ success: true, msg: 'questions  deleted  successfully' });
    } catch (error) {
        next(new ErrorResponse('Error deleting question', 500));
    }
};



exports.increaseRating = async (req, res, next) => {
    try {
        // Find user by id and update approval status to true
        const user = await User.findByIdAndUpdate(

            req.params.id,
            { $inc: { rank: 1 } },
            { new: true, runValidators: true }
        );
        console.log(" user rank is  " + user.rank);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Expert Rating Updated  successfully.', user });
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};
exports.decreaseRating = async (req, res, next) => {
    try {
        // Find user by id and update approval status to true
        const user = await User.findByIdAndUpdate(

            req.params.id,
            { $inc: { rank: -1 } },
            { new: true, runValidators: true }
        );
        console.log(" user rank is  " + user.rank);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Expert Rating Updated  successfully.', user });
    } catch (error) {
        next(error); // Pass any errors to the error handler middleware
    }
};
