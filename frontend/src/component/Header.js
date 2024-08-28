
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/header.css';
import SignUpExpert from '../pages/expertSignup'



const Header = () => {
    const history = useHistory();

    const logOut = () => {
        axios.get('/api/logout')
            .then(result => {
                toast.success('Logged out successfully');
                localStorage.removeItem('token');
                history.push('/');
                // window.location.reload();

            })
            .catch(error => {
                console.log(error);
            });
    };

    const scrollToSection = (event, sectionId) => {
        event.preventDefault(); // Prevent the default anchor behavior
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Check if the user is logged in by looking for a token in localStorage


    const isLoggedIn = localStorage.getItem('token');



    return (
        < > <nav className="navbar navbar-expand-lg ">

            <div className="container">


                <Link className="navbar-brand mt-2 mt-lg-0" to="/">

                    <div style={{ color: '#0acc34', fontSize: '24px' }}>

                        ELECTROGATI

                    </div>

                </Link>



                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" to="/HowItWorks">How This Site Works ? </Link>
                        </li>


                        {
                            isLoggedIn && (<li className="nav-item">
                                <a className="nav-link" href="#expert-section" onClick={(e) => scrollToSection(e, 'expert-section')}>Free Expert Consultation</a>
                            </li>)

                        }




                        <li className="nav-item">
                            <Link className="nav-link" to="/">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact-section" onClick={(e) => scrollToSection(e, 'contact-section')}>CONTACT</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#innovate-section" onClick={(e) => scrollToSection(e, 'innovate-section')}>INNOVATE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#Protect-section" onClick={(e) => scrollToSection(e, 'Protect-section')}>PROTECT</a>
                        </li>

                        {!isLoggedIn &&
                            (<li className="nav-item">
                                <Link className="nav-link" to="/signup/expert">
                                    <i className="fas fa-sign-in-alt"></i> Become A Consultant
                                </Link>
                            </li>)
                        }
                        {/* {isLoggedIn &&
                        (<li className="nav-item">
                            <Link className="nav-link" to="/admin/dashboard/product/create">
                                <i className="fas fa-sign-in-alt"></i> Create Your Service
                            </Link>
                        </li>)
                    } */}

                        {/* {!isLoggedIn && (<li className="nav-item">
                            <Link className="nav-link" to="/signup">
                                <i className="fas fa-user-plus"></i> Sign Up
                            </Link>
                        </li>)} */}



                        {!isLoggedIn && (<li className="nav-item">
                            <Link className="nav-link" to="/signin">
                                <i className="fas fa-sign-in-alt"></i> LOGIN
                            </Link>
                        </li>)}


                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/dashboard">
                                    <i className="fas fa-tachometer-alt"></i> Your Dashboard
                                </Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="" onClick={logOut}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    LOGOUT
                                </Link>
                            </li>
                        )}


                    </ul>

                </div>

            </div>

        </nav>

            <div style={{}}>

                <div className='expertTalk' style={{ display: 'flex', justifyContent: 'center', padding: '5px', borderRadius: '10px', fontFamily: 'Times New Roman', }}>
                    {
                        !isLoggedIn
                        && (
                            <h3 style={{ color: 'red' }}> Please Login To Talk with Experts for Free</h3>
                        )
                    }
                </div >
            </div>


        </ >

    );
};

export default Header;
