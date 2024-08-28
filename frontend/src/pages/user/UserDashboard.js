


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../style/userDashboard.css'; // Import your CSS file for UserDashboard styling

import Header from '../../component/Header';
import Footer from '../../component/Footer';

const UserDashboard = () => {
    const [profile, setProfile] = useState({});
    const [myQuestions, setMyQuestions] = useState([]);

    const [answersToMyQuestions, setAnswersToMyQuestions] = useState([]);
    const [questionsForExpert, setQuestionsForExpert] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10; // Number of questions per page

    useEffect(() => {
        fetchProfile();
    }, []);





    useEffect(() => {
        if (profile._id) {
            fetchMyQuestions();
            fetchAnswersToMyQuestions();
            if (profile.role === 2) {
                fetchQuestionsForExpert();
            }
        }
    }, [profile]);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('/api/getme');
            setProfile(response.data.user);
        } catch (error) {
            toast.error('Failed to fetch profile.');
        }
    };

    const fetchMyQuestions = async () => {
        try {
            const response = await axios.get('/api/my-questions');
            setMyQuestions(response.data.questions);
            console.log("expert name is " + response.data.questions[0].askedTo);
        } catch (error) {
            // toast.error('Failed to fetch my questions. or There is no question');
            toast.success('There is no question asked by you ');
            toast.success('Ask your Questions with experts today ');


        }
    };

    const fetchAnswersToMyQuestions = async () => {
        try {
            const response = await axios.get('/api/answers-to-my-questions');
            setAnswersToMyQuestions(response.data.questions);
        } catch (error) {
            toast.error('Failed to fetch answers to my questions.');
        }
    };

    const fetchQuestionsForExpert = async () => {
        try {
            const response = await axios.get('/api/questions-for-expert');
            setQuestionsForExpert(response.data.questions);
        } catch (error) {
            toast.error('Failed to fetch questions for expert.');
        }
    };

    const handleAnswerQuestion = async (questionId, answer) => {
        try {
            await axios.post('/api/answer-question', { questionId, answer });
            fetchQuestionsForExpert(); // Refresh questions after submitting
            toast.success('Answer submitted successfully!');
        } catch (error) {
            toast.error('Failed to answer question.');
        }
    };

    const handleRemoveQuestion = async (questionId) => {
        try {
            await axios.post('/api/remove-question', { questionId });
            fetchMyQuestions();
            toast.success('question removed successfully!');
        } catch (error) {
            toast.error('Failed to remove question.');
        }
    };

    // Calculate pagination range
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = myQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    // Function to handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Header />
            <div className="container user-dashboard">
                <h2>User Dashboard</h2>

                <div className="card mb-3">
                    <div className="card-header">
                        <h4>User Information</h4>
                    </div>
                    <div className="card-body">

                        <li >Your Name: {profile.name}</li>
                        <li >Email: {profile.email}</li>
                        <li >Role: {profile.role === 1 ? 'Admin' : (profile.role === 2 ? 'Expert' : 'Registered User')}</li>
                        <li >Joined at: {new Date(profile.createdAt).toLocaleDateString()}</li>
                        <li >Details: {profile.details}</li>


                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h4>Your Asked Questions</h4>
                    </div>

                    <div className="card-body">

                        {myQuestions.length === 0 ? (
                            <p>No questions asked yet.</p>
                        ) : (
                            <ul className="list-group">
                                {currentQuestions.filter(question => !question.answer || question.answer.trim().length === 0).map(question => (
                                    <>
                                        <li key={question._id} className="list-group-item">

                                            <div className='questionsboxnew'>
                                                <h3>Question Title  : {question.questionTitle}</h3>

                                                {/* This is delete Questions box . start  */}
                                                <button style={{
                                                    "display__inline_block__outline__0__border__0__cursor__pointer__background___000000__color___FFFFFF__border_radius__8px__padding__14px_24px_16px__font_size__18px__font_weight__700__line_height__1__transition__transform_200ms": { "transform": "translateY(-2px)" }, "background_200ms___hover": { "transform": "translateY(-2px)" }
                                                }}
                                                    onClick={() => handleRemoveQuestion(question._id)} class="pushable">
                                                    <span class="shadow"></span>
                                                    <span class="edge"></span>
                                                    <span class="front">
                                                        Delete
                                                    </span>
                                                </button>
                                                {/* This is delete Questions box end  .  */}

                                                <div className='questionInfo' >
                                                    <h5>Asked to Expert   : {question.expertName}</h5>
                                                    <h5>Category   : {question.prodCategory}</h5>

                                                    <h6>Asked At: {new Date(question.createdAt).toLocaleDateString()} {new Date(question.createdAt).toLocaleTimeString()}</h6>

                                                </div>
                                                <h5>Question Details : {question.questionDetails}</h5>
                                                {!question.answer || question.answer.trim().length === 0 ? (
                                                    <span className='answerbox' >No answer provided yet.</span>
                                                ) : (
                                                    <div >
                                                        <h4><b>Answer:</b></h4>
                                                        <p>{question.answer}</p>
                                                    </div>
                                                )}
                                            </div>

                                        </li >
                                        <hr></hr></>
                                ))}
                            </ul>
                        )}

                        {/* Pagination controls */}
                        {myQuestions.length > questionsPerPage && (
                            <nav className="pagination-nav">
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(myQuestions.length / questionsPerPage) }, (_, index) => (
                                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button onClick={() => paginate(index + 1)} className="page-link">
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">
                        <h4>Answers to Your Questions</h4>
                    </div>
                    <div className="card-body">
                        {answersToMyQuestions.length === 0 ? (
                            <p>No answers received yet.</p>
                        ) : (
                            <ul className="list-group">
                                {answersToMyQuestions.map(question => (

                                    <>
                                        <li key={question._id} className="list-group-item">
                                            <div className='questionsboxnew'>

                                                <h5>Asked to Expert   : {question.expertName}</h5>
                                                <h5>Category   : {question.prodCategory}</h5>
                                                <h3>Question Title  : {question.questionTitle}</h3>
                                                {/* This is delete Questions box . start  */}
                                                <button style={{
                                                    "display__inline_block__outline__0__border__0__cursor__pointer__background___000000__color___FFFFFF__border_radius__8px__padding__14px_24px_16px__font_size__18px__font_weight__700__line_height__1__transition__transform_200ms": { "transform": "translateY(-2px)" }, "background_200ms___hover": { "transform": "translateY(-2px)" }
                                                }}
                                                    onClick={() => handleRemoveQuestion(question._id)} class="pushable">
                                                    <span class="shadow"></span>
                                                    <span class="edge"></span>
                                                    <span class="front">
                                                        Delete
                                                    </span>
                                                </button>
                                                {/* This is delete Questions box end  .  */}

                                                <h6>Asked At: {new Date(question.createdAt).toLocaleDateString()} {new Date(question.createdAt).toLocaleTimeString()}</h6>
                                                <p>Question Details : {question.questionDetails}</p>
                                                <h4><b>Answer : </b>  </h4> <p>{question.answer}</p>
                                            </div>

                                            <div>


                                            </div>
                                        </li>
                                        <hr></hr>
                                    </>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>


                {profile.role === 2 && (
                    <div className="card mt-3">
                        <div className="card-header">
                            <h4>Questions for Expert</h4>
                        </div>
                        <div className="card-body">
                            {questionsForExpert.length === 0 ? (
                                <p>No questions received yet.</p>
                            ) : (
                                <ul className="list-group">
                                    {questionsForExpert
                                        .sort((a, b) => {
                                            // Sort by answer availability, empty answers first
                                            if (!a.answer && b.answer) return -1; // a has no answer, b has answer
                                            if (a.answer && !b.answer) return 1; // b has no answer, a has answer
                                            return 0; // both have answers or no answers
                                        })
                                        .map(question => (
                                            <li key={question._id} className="list-group-item">

                                                <div className='questionsboxnew'>
                                                    <h5>Question Title : {question.questionTitle}</h5>
                                                    <h5>Asked by : {question.userName}</h5>
                                                    <h6>Asked At: {new Date(question.createdAt).toLocaleDateString()} {new Date(question.createdAt).toLocaleTimeString()}</h6>
                                                    <p>Question Details : {question.questionDetails}</p>
                                                </div>
                                                {question.answer ? (
                                                    <div>

                                                        <h6><b>Answer:</b></h6>
                                                        <p>{question.answer}</p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <textarea
                                                            rows="3"
                                                            className="form-control"
                                                            placeholder="Type your answer here..."
                                                            onChange={(e) => question.answer = e.target.value}
                                                        ></textarea>
                                                        <button
                                                            className="btn btn-primary mt-2"
                                                            onClick={() => handleAnswerQuestion(question._id, question.answer)}
                                                        >
                                                            Submit Answer
                                                        </button>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div >
            <Footer />
        </>
    );
};

export default UserDashboard;
