// ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../component/Header';
import Footer from '../component/Footer';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/forget-password', { email });

            if (data.success) {
                toast.success(data.msg);
                history.push('/api/reset-password');
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Error submitting request');
        }
    }

    return (
        <div>
            <Header />
            <div className="container custom_className">
                <div className="signup_title text-center">Forgot Password</div>

                <form className="col-sm-6 offset-3 pt-5 signup_form" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <input type="email" id="email" className="form-control" value={email} onChange={handleChange} />
                        <label className="form-label" htmlFor="email">Enter your email</label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default ForgotPassword;
