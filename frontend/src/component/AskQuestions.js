


import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



const AskQuestions = () => {
    const { expertId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);



    const expertName = queryParams.get('askedToName');
    console.log("Expert name will be visible here amit - > " + expertName + " end  ");

    const userName = queryParams.get('userName');




    const prodCategory = queryParams.get('prodCategory');

    const currentUserId = queryParams.get('currentUserId');
    const history = useHistory();
    console.log(`Hey this is debug: expertId = ${expertId}, currentUserId = ${currentUserId}`);

    const [questionTitle, setQuestionTitle] = useState('');
    const [questionDetails, setQuestionDetails] = useState('');
    const [loading, setLoading] = useState(false);

    const handleQuestionSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');

        const payload = {
            expertId,
            expertName,
            currentUserId, // This should now be correctly defined( working here )
            questionTitle,
            questionDetails,
            prodCategory,
            userName
        };

        // const payload = {
        //     questionTitle,
        //     questionDetails,
        //     askedBy: currentUserId, // Replace with the correct user ID
        //     askedTo: expertId, // Replace with the correct expert ID
        // };


        console.log('Payload to be sent:', payload); // Add this log

        axios.post('/api/questions', payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {

            toast.success('Question submitted successfully!');

            setLoading(false);
            history.push('/user/dashboard');
        }).catch(error => {
            console.error('Error submitting question: ', error);
            toast.error('Failed to submit question.');
            setLoading(false);
        });
    };

    return (
        <div className="container  main-container ">
            <h2>Ask a Question to the Expert</h2>
            <form onSubmit={handleQuestionSubmit}>
                <div className="form-group">
                    <label>Question Title:</label>
                    <input type="text" className="form-control" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Question Details:</label>
                    <textarea className="form-control" value={questionDetails} onChange={(e) => setQuestionDetails(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Question'}
                </button>
            </form>
        </div>
    );
};

export default AskQuestions;
