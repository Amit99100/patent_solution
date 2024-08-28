
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../component/Card';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom'; // Import Redirect for redirection
import { jwtDecode } from 'jwt-decode';

import '../style/card.css'


const HomeGod = () => {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState([]); // State to store the current user ID

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3); // Number of users per page
    const [isAuthorized, setIsAuthorized] = useState(true); // State to manage authorization
    // Fetch all users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/users");

            // Filter users based on role and approval status
            const filteredUsers = response.data.filter(user => user.role === 2 && user.approved);




            // Filter by selected category if one is selected
            let usersToSet;


            if (selectedCategory) {
                usersToSet = filteredUsers.filter(user => user.category === selectedCategory);

            } else {
                usersToSet = filteredUsers;
            }


            //sort user by rank in desending order 
            usersToSet.sort((a, b) => b.rank - a.rank);

            //set the sorted users 
            setUsers(usersToSet);


        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fetch categories on component mount
    useEffect(() => {
        axios.get('/api/category/all')
            .then(response => {
                setCategories(response.data.categories);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Effect to fetch users on component mount and whenever category or page changes
    useEffect(() => {
        fetchUsers();
    }, [selectedCategory, currentPage]);

    // Logic to calculate current users for pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Handle category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset page number when category changes
    };

    // Handle pagination change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Check for the token in localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuthorized(false);
        } else {
            // Decode the token to get the current user ID
            const decodedToken = jwtDecode(token);
            setCurrentUserId(decodedToken.id);
        }
        // Optionally, you can verify the token with your backend
        // axios.post('/api/verify-token', { token })
        //     .then(response => {
        //         setIsAuthorized(response.data.valid);
        //     })
        //     .catch(error => {
        //         console.error('Error verifying token:', error);
        //         setIsAuthorized(false);
        //     });

    }, []);

    if (!isAuthorized) {
        // If not authorized, redirect to the login page
        return <Redirect to="/" />;
    }

    // const temp_url = "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720137600&semt=ais_user";

    return (isAuthorized &&
        (<div id='expert-section' className="container pt-5 pb-5 expertlist">
            <div className="row">
                <div className="col-sm-12">
                    <h4 style={{ color: 'green' }}>Find Experts in Patent/Innovation Area:</h4>
                </div>
                <div className="col-sm-3">
                    <h5 style={{ color: 'green' }}>Filter by Category:</h5>
                    <div className="form-group">
                        <select onChange={handleCategoryChange} className="form-control">
                            <option value="">All   </option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="row  cardcontainer">
                        {currentUsers.map(user => (
                            <Card
                                key={user._id}
                                image={user.pic} // Replace with your user image field
                                productName={user.name}
                                expertId={user._id}
                                expertName={user.name}
                                prodCategory={user.category}
                                email={user.email}
                                price={user.hourlyRate}
                                currentUserId={currentUserId} // Pass the current logged-in user's ID
                                userName={user.name}


                            />
                        ))}
                    </div>

                    <Pagination current={currentPage} total={users.length} onChange={handlePageChange} pageSize={usersPerPage} />

                </div>
            </div>
        </div>)
    );
};

export default HomeGod;

