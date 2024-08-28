
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../component/Header';
import Footer from '../component/Footer';
import '../style/signup.css'; // Import the custom CSS file
import { Link, useHistory } from 'react-router-dom';



const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        details: '',
    });

    const { name, email, password, details } = values;

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value });
    }
    const history = useHistory();


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
                setValues({
                    name: '',
                    email: '',
                    password: '',
                    details: ''
                });
                toast.success("An email has been sent to your account. Please verify.");
                history.push('/');
            }

        } catch (err) {
            console.log(err.response.data.error);
            // toast.error(err.response.data.error);
            toast.error(err.response.data.error, {
                autoClose: 100, // Set the toast to disappear after 2 seconds
            });
        }
    }

    return (
        <div>
            <Header />

            <div className="container custom_signup_container pt-5">
                <div class="signup_title_heading ">
                    <div className="signup_title">SIGN UP</div>
                </div>
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
                            type="password"
                            id="formPassword"
                            className="form-control"
                            value={password}
                            placeholder=" " // For placeholder effect
                        />
                        <label className="form-label" htmlFor="formPassword">Password</label>
                    </div>

                    <div className="form-outline mb-4">
                        <textarea
                            onChange={handleChange("details")}
                            id="formDetails"
                            className="form-control"
                            value={details}
                            placeholder=" " // For placeholder effect
                        />
                        <label className="form-label" htmlFor="formDetails">Details</label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp;
