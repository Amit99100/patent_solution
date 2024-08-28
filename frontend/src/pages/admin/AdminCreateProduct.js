// import React, { useEffect, useState } from 'react'
// import Header from '../../component/Header'
// import Footer from '../../component/Footer'
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const AdminCreateProduct = () => {

//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [image, setImage] = useState([]);
//     const [email, setEmail] = useState('');

//     //categories from the backend
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         axios.get('/api/category/all')
//             .then(cat => {
//                 console.log(cat.data.categories);
//                 setCategories(cat.data.categories)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }, [])

//     //handle and convert it in base 64
//     const handleImage = (e) => {
//         const file = e.target.files[0];
//         setFileToBase(file);
//         console.log(file);
//     }

//     const setFileToBase = (file) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//             setImage(reader.result);
//         }

//     }

//     //submit the form
//     const submitForm = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post('/api/product/create', { name, description, price, category, email, image })
//             if (data.success === true) {
//                 setName('');
//                 setDescription('');
//                 setPrice('');
//                 setCategory('');
//                 setEmail('');
//                 setImage('');

//                 toast.success('product created successfully, visit Home page to see')

//             }
//             console.log(data);
//         } catch (error) {
//             console.log(error)
//         }

//     }

//     return (
//         <>
//             <Header />
//             <div className="container custom_class">
//                 <h2 className="signup_title ">CREATE PRODUCT</h2>
//                 <form className=" col-sm-6 offset-3 pt-5 signup_form " enctype="multipart/form-data" onSubmit={submitForm}>

//                     <div className="form-outline mb-4">
//                         <input onChange={(e) => setName(e.target.value)} type="text" id="form4Example1" className="form-control" value={name} />
//                         <label className="form-label" htmlFor="form4Example1">Name</label>
//                     </div>


//                     <div className="form-outline mb-4">
//                         <textarea onChange={(e) => setDescription(e.target.value)} type="text" id="form4Example2" className="form-control" value={description} />
//                         <label className="form-label" htmlFor="form4Example2">Description </label>
//                     </div>

//                     <div className="form-outline mb-4">
//                         <input onChange={(e) => setPrice(e.target.value)} type="number" id="form4Example3" className="form-control" value={price} />
//                         <label className="form-label" htmlFor="form4Example2">Price </label>
//                     </div>

//                     <div className="form-outline mb-4">
//                         <input onChange={(e) => setEmail(e.target.value)} type="text" id="form4Example1" className="form-control" value={email} />
//                         <label className="form-label" htmlFor="form4Example1">Email </label>
//                     </div>

//                     <div className="form-outline mb-1">
//                         <select onChange={(e) => setCategory(e.target.value)} id="category" name="cars" className="form-control select select-initialized" value={category}>
//                             <option value="" >Choose Category</option>
//                             {
//                                 categories && categories.map(cat => (
//                                     <option key={cat._id} value={cat._id} >{cat.name}</option>
//                                 ))
//                             }

//                         </select>
//                     </div>
//                     <br></br>


//                     <div className="form-outline mb-4">
//                         <input onChange={handleImage} type="file" id="formupload" name="image" className="form-control" />
//                         <label className="form-label" htmlFor="form4Example2">Image</label>
//                     </div>
//                     <img className="img-fluid" src={image} alt="" />
//                     <button type="submit" className="btn btn-primary btn-block mb-4">Create</button>

//                 </form>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default AdminCreateProduct


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
// import '../style/signup.css'; // Import the custom CSS file

const AdminCreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState(1); // Default role for regular users

    // Categories from the backend
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch user role from the backend or wherever it's stored
        const fetchUserRole = async () => {
            try {
                const { data } = await axios.get('/api/user/role'); // Adjust endpoint as per your backend
                setUserRole(data.role); // Assuming role is returned from the backend
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        // Fetch categories
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('/api/category/all');
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchUserRole();
        fetchCategories();
    }, []);

    // Handle image upload and convert to base64
    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    // Submit the form
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/product/create', {
                name,
                description,
                price,
                category,
                email,
                image
            });

            if (data.success === true) {
                setName('');
                setDescription('');
                setPrice('');
                setCategory('');
                setEmail('');
                setImage('');
                toast.success('Product created successfully. Visit Home page to see.');
            }
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Failed to create product. Please try again.');
        }
    };

    // Render the component based on user role
    if (userRole !== 1 && userRole !== 2) {
        return (
            <div>
                <Header />
                <div className="container custom_class">
                    <h2 className="signup_title">Access Denied</h2>
                    <p>You do not have permission to create products.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="container custom_class">
                <h2 className="signup_title">CREATE PRODUCT</h2>
                <form className="col-sm-6 offset-3 pt-5 signup_form" encType="multipart/form-data" onSubmit={submitForm}>
                    <div className="form-outline mb-4">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="form4Example1"
                            className="form-control"
                            value={name}
                            required
                        />
                        <label className="form-label" htmlFor="form4Example1">
                            Name
                        </label>
                    </div>

                    <div className="form-outline mb-4">
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            id="form4Example2"
                            className="form-control"
                            value={description}
                            required
                        />
                        <label className="form-label" htmlFor="form4Example2">
                            Description
                        </label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            id="form4Example3"
                            className="form-control"
                            value={price}
                            required
                        />
                        <label className="form-label" htmlFor="form4Example3">
                            Price
                        </label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            id="form4Example1"
                            className="form-control"
                            value={email}
                            required
                        />
                        <label className="form-label" htmlFor="form4Example1">
                            Email
                        </label>
                    </div>

                    <div className="form-outline mb-1">
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            id="category"
                            name="cars"
                            className="form-control select select-initialized"
                            value={category}
                            required
                            style={{
                                backgroundColor: '#f8f9fa', // Example background color
                                color: '#495057', // Example text color
                                border: '1px solid #ced4da', // Example border color
                                borderRadius: '4px', // Example border radius
                                padding: '0.375rem 0.75rem', // Example padding
                                fontSize: '1rem' // Example font size
                            }}
                        >
                            <option value="">Choose Category</option>
                            {categories &&
                                categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <br />

                    {/* <div className="form-outline mb-4">
                        <input
                            onChange={handleImage}
                            type="file"
                            id="formupload"
                            name="image"
                            className="form-control"
                            required
                        />
                        <label className="form-label" htmlFor="formupload">
                            Image
                        </label>
                    </div>
                    {image && (
                        <img className="img-fluid" src={image} alt="Product Preview" style={{ maxHeight: '200px' }} />
                    )} */}
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                        Create
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AdminCreateProduct;
