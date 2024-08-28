

const User = require("../models/user");
const bcrypt = require('bcryptjs');

const resetpassword = async (req, res) => {
    try {
        // Retrieve token from query parameters
        const token = req.query.token;
        console.log('Received Token:', token); // Log the token received for debugging

        // Find user by the token
        const tokenData = await User.findOne({ token2: token });
        console.log('Token Data:', tokenData); // Log the tokenData to see what's returned

        if (tokenData) {
            // Retrieve the new password from the request body
            const password = req.body.password;

            // Hash the new password
            const newpassword = await bcrypt.hash(password, 10);

            // Update the user's password and clear the token2 field
            const user_data = await User.findByIdAndUpdate(
                tokenData._id, // Use the user's ID found by the token
                { $set: { password: newpassword, token2: '' } }, // Update password and clear token2
                { new: true } // Return the updated document
            );

            // Respond with success
            res.status(200).send({ success: true, msg: "User password has been reset", data: user_data });
        } else {
            // If no user is found with the token, respond with an error
            res.status(404).send({ success: false, msg: "Token not found or expired" });
        }
    } catch (error) {
        // Handle errors
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = { resetpassword };
