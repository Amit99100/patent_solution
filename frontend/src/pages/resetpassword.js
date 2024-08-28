// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Header from '../component/Header';
// import Footer from '../component/Footer';

// const ResetPassword = ({ history, location }) => {
//     const [password, setPassword] = useState('');
//     const [mailLink, setmailLink] = useState('');
//     const [token, setToken] = useState('');





//     // Extract token from URL query parameters
//     useEffect(() => {
//         const tokenFromQuery = new URLSearchParams(location.search).get('token');
//         setToken(tokenFromQuery);
//     }, [location.search]);

//     const handleChange = (setter) => (e) => {
//         setter(e.target.value);
//     }



//     const handleSubmit = async (e) => {
//         e.preventDefault();



//         try {
//             // Make POST request to update the password
//             const { data } = await axios.post(`${mailLink}`, { password });

//             if (data.success) {
//                 toast.success(data.msg);
//                 history.push('/'); // Redirect to dashboard after successful reset
//             } else {
//                 toast.error(data.msg);
//             }
//         } catch (error) {
//             console.error('Error:', error.message);
//             toast.error('Error resetting password');
//         }
//     }

//     return (
//         <div>
//             <Header />
//             <div className="container custom_className">
//                 <div className="signup_title text-center">Reset Password</div>

//                 <form className="col-sm-6 offset-3 pt-5 signup_form" onSubmit={handleSubmit}>
//                     <div className="form-outline mb-4">
//                         <input type="password" id="password" className="form-control" value={password} onChange={handleChange(setPassword)} />
//                         <label className="form-label" htmlFor="password">Enter new password</label>

//                     </div>

//                     <div className="form-outline mb-4">
//                         <input type="string" id="confirmPassword" className="form-control" value={mailLink} onChange={handleChange(setmailLink)} />
//                         <label className="form-label" htmlFor="confirmPassword">Enter Mail link copy </label>
//                     </div>

//                     <button type="submit" className="btn btn-primary btn-block mb-4">Reset Password</button>
//                 </form>
//             </div>
//             <Footer />
//         </div>
//     )
// }


// export default ResetPassword; 



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../component/Header';
import Footer from '../component/Footer';

const ResetPassword = ({ history, location }) => {
    const [password, setPassword] = useState('');
    const [mailLink, setMailLink] = useState('');
    const [token, setToken] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Extract token from URL query parameters
    useEffect(() => {
        const tokenFromQuery = new URLSearchParams(location.search).get('token');
        setToken(tokenFromQuery);
    }, [location.search]);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make POST request to update the password
            const { data } = await axios.post(`${mailLink}`, { password });

            if (data.success) {
                toast.success(data.msg);
                history.push('/'); // Redirect to dashboard after successful reset
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Error resetting password');
        }
    }

    return (
        <div>
            <Header />
            <div className="container custom_className">
                <div className="signup_title text-center">Reset Password</div>

                <form className="col-sm-6 offset-3 pt-5 signup_form" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={handleChange(setPassword)}
                        />
                        <label className="form-label" htmlFor="password">Enter new password</label>
                        <button
                            style={{
                                backgroundColor: showPassword ? '#28a745' : 'transparent',
                                color: showPassword ? 'white' : '#28a745',
                                borderColor: showPassword ? '#28a745' : '#6c757d'
                            }}
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            type="string"
                            id="confirmPassword"
                            className="form-control"
                            value={mailLink}
                            onChange={handleChange(setMailLink)}
                        />
                        <label className="form-label" htmlFor="confirmPassword">Enter Mail link copy</label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Reset Password</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default ResetPassword;
