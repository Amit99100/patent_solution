



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Header from '../component/Header';
// import Footer from '../component/Footer';
// import '../style/signup.css'; // Import the custom CSS file
// import { Link, useHistory } from 'react-router-dom';


// import imageCompression from 'browser-image-compression';


// const SignUp = () => {
//     const [values, setValues] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         Tell_About_Yourself: '',
//         expertise: '',
//         hourlyRate: '',
//         role: 2,
//         showPassword: false,

//     });

//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true); // State to manage loading state

//     const [pic, setPic] = useState();// for the picutre i added later . 
//     const [picLoading, setPicLoading] = useState(false);// for the picutre i added later . 

//     const history = useHistory();

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const { data } = await axios.get('/api/category/all');
//                 setCategories(data.categories);
//                 setLoading(false); // Update loading state after data fetch
//             } catch (err) {
//                 console.log(err.response.data.error);
//                 toast.error(err.response.data.error);
//                 setLoading(false); // Update loading state in case of error
//             }
//         };

//         fetchCategories();
//     }, []); // Empty dependency array ensures useEffect runs only once

//     const { name, email, phone, password, Tell_About_Yourself, expertise, hourlyRate, role, showPassword } = values;

//     const handleChange = name => (e) => {
//         setValues({ ...values, [name]: e.target.value });
//     }

//     // const handleRoleChange = () => {
//     //     setValues({ ...values, role: 2 }); // Change role to 2 (expert) when "Become a Consultant" is clicked

//     // }

//     const togglePasswordVisibility = () => {
//         setValues({ ...values, showPassword: !showPassword });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setPicLoading(true); // for the picutre i added later . 
//         try {
//             const { data } = await axios.post('/api/signup', {
//                 name,
//                 email,
//                 phone,
//                 password,
//                 Tell_About_Yourself: role === 2 ? Tell_About_Yourself : undefined,
//                 expertise: role === 2 ? expertise : undefined,
//                 hourlyRate: role === 2 ? hourlyRate : undefined,
//                 role,
//                 category: selectedCategory,
//                 pic
//             });

//             if (data.success === true) {
//                 setValues({
//                     name: '',
//                     email: '',
//                     phone: '',
//                     password: '',
//                     Tell_About_Yourself: '',
//                     expertise: '',
//                     hourlyRate: '',
//                     role: 1 // Reset role to default after signup
//                 });
//                 toast.success("An email has been sent to your account. Please verify.");
//                 history.push('/');
//             }

//         } catch (err) {
//             console.log(err.response.data.error);
//             toast.error(err.response.data.error);
//             history.push('/');
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>; // Render a loading indicator while fetching data
//     }
//     // ***************************  for image *************************************************







//     const postDetails = async (pics) => {
//         setPicLoading(true);
//         if (pics === undefined) {
//             toast({
//                 title: "Please Select an Image!",
//                 status: "warning",
//                 duration: 5000,
//                 isClosable: true,
//                 position: "bottom",
//             });
//             return;
//         }
//         console.log(pics);

//         const cloudname = "dx428yl39";

//         // Define image compression options
//         const options = {
//             maxSizeMB: 0.5, // Maximum file size in MB
//             maxWidthOrHeight: 1024, // Maximum width or height in pixels
//             useWebWorker: true // Use web worker for faster processing
//         };

//         try {
//             // Compress the image
//             const compressedPic = await imageCompression(pics, options);

//             // Check if the file type is valid
//             if (compressedPic.type === "image/jpeg" || compressedPic.type === "image/png") {
//                 const data = new FormData();
//                 data.append("file", compressedPic);
//                 data.append("upload_preset", "chat-app");
//                 data.append("cloud_name", cloudname);

//                 // Upload the compressed image to Cloudinary
//                 const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
//                     method: "post",
//                     body: data,
//                 });

//                 const result = await response.json();
//                 setPic(result.url.toString());
//                 console.log(result.url.toString());
//                 setPicLoading(false);
//             } else {
//                 toast({
//                     title: "Please Select an Image!",
//                     status: "warning",
//                     duration: 5000,
//                     isClosable: true,
//                     position: "bottom",
//                 });
//                 setPicLoading(false);
//                 return;
//             }
//         } catch (error) {
//             console.log(error);
//             setPicLoading(false);
//         }
//     };
//     // ******************************  for imgea ************************************************
//     return (
//         <div>
//             <Header />

//             <div className="container custom_signup_container pt-5">
//                 <div className="signup_title_heading">
//                     <div className="signup_title">SIGN UP</div>
//                 </div>
//                 <form className="signup_form" onSubmit={handleSubmit}>
//                     <div className="form-outline mb-4">
//                         <input
//                             onChange={handleChange("name")}
//                             type="text"
//                             id="formName"
//                             className="form-control"
//                             value={name}
//                             placeholder=" "
//                         />
//                         <label className="form-label" htmlFor="formName">Name</label>
//                     </div>

//                     <div className="form-outline mb-4">
//                         <input
//                             onChange={handleChange("email")}
//                             type="email"
//                             id="formEmail"
//                             className="form-control"
//                             value={email}
//                             placeholder=" "
//                         />
//                         <label className="form-label" htmlFor="formEmail">Email</label>
//                     </div>

//                     <div className="form-outline mb-4">
//                         <input
//                             onChange={handleChange("phone")}
//                             type="text"
//                             id="formPhone"
//                             className="form-control"
//                             value={phone}
//                             placeholder=" "
//                         />
//                         <label className="form-label" htmlFor="formPhone">Phone Number</label>
//                     </div>

//                     <div className="form-outline mb-4">
//                         <input
//                             onChange={handleChange("password")}
//                             type="password"
//                             id="formPassword"
//                             className="form-control"
//                             value={password}
//                             placeholder=" "
//                         />
//                         <button
//                             type="button"
//                             className="toggle-password-btn"
//                             onClick={togglePasswordVisibility}
//                         >
//                             {showPassword ? "Hide" : "Show"}
//                         </button>
//                         <label className="form-label" htmlFor="formPassword">Password</label>
//                     </div>

//                     {( // Render additional fields only if role is 2 (consultant)
//                         role === 2 && (
//                             <>
//                                 <div className="form-outline mb-4">
//                                     <textarea
//                                         onChange={handleChange("Tell_About_Yourself")}
//                                         id="formDetails"
//                                         className="form-control"
//                                         value={Tell_About_Yourself}
//                                         placeholder=" "
//                                     />
//                                     <label className="form-label" htmlFor="formDetails">Tell About Yourself</label>
//                                 </div>

//                                 <div className="form-outline mb-4">
//                                     <input
//                                         onChange={handleChange("expertise")}
//                                         type="text"
//                                         id="formExpertise"
//                                         className="form-control"
//                                         value={expertise}
//                                         placeholder=" "
//                                     />
//                                     <label className="form-label" htmlFor="formExpertise">Expertise</label>
//                                 </div>

//                                 <div className="form-outline mb-4">
//                                     <input
//                                         onChange={handleChange("hourlyRate")}
//                                         type="number"
//                                         id="formHourlyRate"
//                                         className="form-control"
//                                         value={hourlyRate}
//                                         placeholder=" "
//                                     />
//                                     <label className="form-label" htmlFor="formHourlyRate">Hourly Rate</label>
//                                 </div>
//                                 <div className="form-outline mb-4" id="pic">
//                                     <div>Upload Profile Pciture </div>
//                                     <input
//                                         type="file"
//                                         p={1.5}
//                                         accept="image/*"
//                                         onChange={(e) => postDetails(e.target.files[0])}
//                                     />
//                                 </div>
//                             </>
//                         )
//                     )}

//                     {/* <div className="form-outline mb-4">
//                         <select
//                             onChange={e => setSelectedCategory(e.target.value)}
//                             value={selectedCategory}
//                             className="form-control"
//                         >
//                             <option value="">Select Category</option>
//                             {categories.map(category => (
//                                 <option key={category._id} value={category.name}>{category.name}</option>
//                             ))}
//                         </select>
//                         <label className="form-label" htmlFor="formCategory">Category</label>
//                     </div> */}

//                     <div className="form-group mb-4">
//                         <label htmlFor="formCategory" className="form-label">Category</label>
//                         <select
//                             onChange={e => setSelectedCategory(e.target.value)}
//                             value={selectedCategory}
//                             className="form-select"
//                             id="formCategory"
//                         >
//                             <option value="">Select Category</option>
//                             {categories.map(category => (
//                                 <option key={category._id} value={category.name}>{category.name}</option>
//                             ))}
//                         </select>
//                     </div>


//                     <button
//                         //  onClick={handleRoleChange}
//                         type="submit" className="btn btn-primary btn-block mb-4">Register</button>
//                 </form>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default SignUp;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../component/Header';
import Footer from '../component/Footer';
import '../style/signup.css'; // Import the custom CSS file
import { Link, useHistory } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        Tell_About_Yourself: '',
        expertise: '',
        hourlyRate: '',
        role: 2,
        showPassword: false,
    });

    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [pic, setPic] = useState(); // for the picture
    const [picLoading, setPicLoading] = useState(false); // for the picture
    const history = useHistory();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('/api/category/all');
                setCategories(data.categories);
                setLoading(false); // Update loading state after data fetch
            } catch (err) {
                console.log(err.response.data.error);
                toast.error(err.response.data.error);
                setLoading(false); // Update loading state in case of error
            }
        };

        fetchCategories();
    }, []); // Empty dependency array ensures useEffect runs only once

    const { name, email, phone, password, Tell_About_Yourself, expertise, hourlyRate, role, showPassword } = values;

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setValues({ ...values, showPassword: !showPassword });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPicLoading(true); // for the picture
        try {
            const { data } = await axios.post('/api/signup', {
                name,
                email,
                phone,
                password,
                Tell_About_Yourself: role === 2 ? Tell_About_Yourself : undefined,
                expertise: role === 2 ? expertise : undefined,
                hourlyRate: role === 2 ? hourlyRate : undefined,
                role,
                category: selectedCategory,
                pic
            });

            if (data.success === true) {
                setValues({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    Tell_About_Yourself: '',
                    expertise: '',
                    hourlyRate: '',
                    role: 1 // Reset role to default after signup
                });
                toast.success("An email has been sent to your account. Please verify.");
                history.push('/');
            }

        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error);
            history.push('/');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Render a loading indicator while fetching data
    }

    const postDetails = async (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(pics);

        const cloudname = "dx428yl39";

        // Define image compression options
        const options = {
            maxSizeMB: 0.5, // Maximum file size in MB
            maxWidthOrHeight: 1024, // Maximum width or height in pixels
            useWebWorker: true // Use web worker for faster processing
        };

        try {
            // Compress the image
            const compressedPic = await imageCompression(pics, options);

            // Check if the file type is valid
            if (compressedPic.type === "image/jpeg" || compressedPic.type === "image/png") {
                const data = new FormData();
                data.append("file", compressedPic);
                data.append("upload_preset", "chat-app");
                data.append("cloud_name", cloudname);

                // Upload the compressed image to Cloudinary
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
                    method: "post",
                    body: data,
                });

                const result = await response.json();
                setPic(result.url.toString());
                console.log(result.url.toString());
                setPicLoading(false);
            } else {
                toast({
                    title: "Please Select an Image!",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setPicLoading(false);
                return;
            }
        } catch (error) {
            console.log(error);
            setPicLoading(false);
        }
    };

    return (
        <div>
            <Header />

            <div className="container custom_signup_container pt-5">
                <div className="signup_title_heading">
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
                            placeholder=" "
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
                            placeholder=" "
                        />
                        <label className="form-label" htmlFor="formEmail">Email</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            onChange={handleChange("phone")}
                            type="text"
                            id="formPhone"
                            className="form-control"
                            value={phone}
                            placeholder=" "
                        />
                        <label className="form-label" htmlFor="formPhone">Phone Number</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            onChange={handleChange("password")}
                            type={showPassword ? "text" : "password"}
                            id="formPassword"
                            className="form-control"
                            value={password}
                            placeholder=" "
                        />
                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        <label className="form-label" htmlFor="formPassword">Password</label>
                    </div>

                    {( // Render additional fields only if role is 2 (consultant)
                        role === 2 && (
                            <>
                                <div className="form-outline mb-4">
                                    <textarea
                                        onChange={handleChange("Tell_About_Yourself")}
                                        id="formDetails"
                                        className="form-control"
                                        value={Tell_About_Yourself}
                                        placeholder=" "
                                    />
                                    <label className="form-label" htmlFor="formDetails">Tell About Yourself</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        onChange={handleChange("expertise")}
                                        type="text"
                                        id="formExpertise"
                                        className="form-control"
                                        value={expertise}
                                        placeholder=" "
                                    />
                                    <label className="form-label" htmlFor="formExpertise">Expertise</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        onChange={handleChange("hourlyRate")}
                                        type="number"
                                        id="formHourlyRate"
                                        className="form-control"
                                        value={hourlyRate}
                                        placeholder=" "
                                    />
                                    <label className="form-label" htmlFor="formHourlyRate">Hourly Rate</label>
                                </div>
                                <div className="form-outline mb-4" id="pic">
                                    <div>Upload Profile Picture  <p style={{ color: 'red' }}>only JPEG or  PNG </p> </div>

                                    <input
                                        type="file"
                                        p={1.5}
                                        accept="image/*"
                                        onChange={(e) => postDetails(e.target.files[0])}

                                    />

                                </div>
                            </>
                        )
                    )}

                    <div className="form-group mb-4">
                        <label htmlFor="formCategory" className="form-label">Category</label>
                        <select
                            onChange={e => setSelectedCategory(e.target.value)}
                            value={selectedCategory}
                            className="form-select"
                            id="formCategory"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                    >
                        Register
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default SignUp;
