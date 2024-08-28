

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../style/quotecontainer.css'; // Import the custom CSS file
import '../style/signup.css'; // Import the custom CSS file
// import logo from './mainlogo.svg'; // Correct path to your logo
import logo from './logo3.png'; // Correct path to your logo
import { Link, useHistory } from 'react-router-dom'; // Assuming you use React Router for navigation

import imagehappy from './imagehappy.jpeg';
const QuoteContainer = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
        details: '',
        showPassword: false // State to manage password visibility
    });

    const { name, email, password, confirmpassword, showPassword, details } = values;
    const history = useHistory(); // Using useHistory hook from React Router
    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value });
    }

    const isLoggedIn = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/signup', {
                name,
                email,
                password,
                details
            });

            if (data.success === true) {
                setValues({ name: '', email: '', password: '', details: '' });
                toast.success("An email has been sent to your account. Please verify.");

            }

        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
        }
    }

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !showPassword });
    }


    return (
        <div style={{ backgroundColor: '#f9f9f9' }}>


            <div style={{ backgroundColor: '#f9f9f9' }}>
                <h1 style={{ color: 'green' }} className="introText">
                    Forget the old rules. You have the best place to connect, innovate and protect your IP
                </h1>
                <h1 style={{ color: 'green' }} className="introText">
                    Expert Advice on Your Invention's Patentability in Minutes
                </h1>
            </div>



            < div
                className="flex-container"
            >






                <div div id="imageContainer" >
                    <img src={logo} alt="Descriptive Text" />
                </div >

                {
                    !isLoggedIn && (<div className="signup-container">
                        <h2 className="signup_title text-center">SIGN UP</h2>
                        <form className="signup_form" onSubmit={handleSubmit}>
                            <div className="form-outline mb-4">
                                <input
                                    onChange={handleChange("name")}
                                    type="text"
                                    id="formName"
                                    className="form-control"
                                    value={name}
                                    placeholder=" " // For placeholder effect
                                />
                                <label className="form-label" htmlFor="formName">Name</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    onChange={handleChange("email")}
                                    type="email"
                                    id="formEmail"
                                    className="form-control"
                                    value={email}
                                    placeholder=" " // For placeholder effect
                                />
                                <label className="form-label" htmlFor="formEmail">Email</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    onChange={handleChange("password")}
                                    type={showPassword ? "text" : "password"}
                                    id="formPassword"
                                    className="form-control"
                                    value={password}
                                    placeholder=" " // For placeholder effect
                                />
                                <label className="form-label" htmlFor="formPassword">Password</label>

                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>


                            {/* <div className="form-outline mb-4">
                            <textarea
                                onChange={handleChange("details")}
                                id="formDetails"
                                className="form-control"
                                value={details}
                                placeholder=" " // For placeholder effect
                            />
                            <label className="form-label" htmlFor="formDetails">Details</label>
                        </div> */}

                            <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>

                        </form>

                    </div>)
                }

                {
                    isLoggedIn && (<div className="signup-container">
                        <img src={imagehappy} alt="Description of the image" />
                    </div>)
                }

            </div >
            {/* <h1 className="introText">
                Forget the old rules. You have the best place to connect, innovate and protect your IP
            </h1>
            <h1 className="introText">
                Expert Advice on Your Invention's Patentability in Minutes
            </h1> */}
            {/* <div style={{
                display: 'flex ', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>

                <div style={{
                    color: 'green', fontSize: '20px', justifyContent: 'center',
                    borderRadius: '5px', fontFamily: 'Times-Roman', fontSize: '1.8rem'
                }}> Expert Advice on Your Invention's Patentability in Minutes    </div>

                <div style={{
                    color: 'green', fontSize: '20px', justifyContent: 'center',
                    borderRadius: '5px', fontFamily: 'Times-Roman', fontSize: '2rem'
                }}>  Forget the old rules. You have the best place to connect, innovate and protect your IP    </div>


            </div > */}

        </div >

    );
};

export default QuoteContainer;
