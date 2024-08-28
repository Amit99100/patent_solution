const express = require('express');
const router = express.Router();
const { signup, signin, logout, singleUser, userProfile, listUsers, approveExpert, getQuestionsForExpert, removeUser, questions, getAnswersToMyQuestions,
    getMyQuestions, answerQuestion, increaseRating, decreaseRating, removeQuestion,
    verifyToken } = require("../controllers/auth");
const { forgetpassword } = require("../controllers/forgetpassword");

const { isAuthenticated, isAdmin } = require('../middleware/auth');
const User = require("../models/user");


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);
router.get('/getme', isAuthenticated, userProfile);


//verify users that signup using token 
// router.get('/:id/verify/:token', verifyToken);
router.get('/users/:userId/verify/:token', verifyToken);



router.get('/user/:id', isAuthenticated, singleUser);
router.get('/users', isAuthenticated, listUsers);
router.get('/users/approve/:id', isAuthenticated, approveExpert);
router.get('/users/remove/:id', isAuthenticated, removeUser);
router.post('/forget-password', forgetpassword);



//for posting the questions ( don't touch it  , it's working fine )
router.post('/questions', isAuthenticated, questions)








router.get('/my-questions', isAuthenticated, getMyQuestions);
router.get('/answers-to-my-questions', isAuthenticated, getAnswersToMyQuestions);
router.get('/questions-for-expert', isAuthenticated, getQuestionsForExpert);
router.post('/answer-question', isAuthenticated, answerQuestion);

router.post('/remove-question', isAuthenticated, removeQuestion);


//increase rating of expert 
router.get('/users/increaseRating/:id', isAuthenticated, increaseRating);
router.get('/users/decreaseRating/:id', isAuthenticated, decreaseRating);

// make avilable in other file ( so that's why exports . )
module.exports = router;