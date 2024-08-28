


import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { Link, useHistory } from 'react-router-dom';
import '../style/signin.css'




const SignIn = () => {
    const [values, setValues] = useState({
        email: 'akm1632456@gmail.com',
        password: 'Amit@1632456',
        showPassword: false
    });

    const { email, password, showPassword } = values;
    const history = useHistory();

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !showPassword });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const { data } = await axios.post('/api/signin', {
                email,
                password
            });

            if (data.success === true) {
                setValues({ ...values, email: '', password: '' });
                toast.success("Log In successfully");
                localStorage.setItem("token", JSON.stringify(data));

                setTimeout(() => {
                    history.push('/');
                    window.location.reload();
                }, 1500);

            }
        } catch (err) {
            toast.error(err.response.data.error);
            // toast.error(err.response.data.error, {
            //     autoClose: 2000, // Set the toast to disappear after 2 seconds
            // });
        }
    };

    return (
        <div>
            <Header />
            <div style={{ backgroundColor: "white" }} className="signin-container">
                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="signin-title">SIGN IN</div>
                    <div className="form-group">
                        <input
                            onChange={handleChange("email")}
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            onChange={handleChange("password")}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            value={password}
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button type="submit" className="btn-primary">Log In</button>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </form>
            </div>
            <hr></hr>
            <br></br>
            <br></br>
            <Footer />

        </div>
    )
}

export default SignIn;
