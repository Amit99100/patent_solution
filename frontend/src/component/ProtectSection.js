// src/components/ProtectSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/services.css' // Ensure you have the CSS file imported



import tempimage from './temp.png';

import pic1 from '../image/Picture1.png';
import pic2 from '../image/Picture2.png';
import pic3 from '../image/Picture3.png';
import pic4 from '../image/Picture4.png';
import pic5 from '../image/Picture5.png';
import pic6 from '../image/Picture6.png';
import pic7 from '../image/Picture7.png';
import pic8 from '../image/Picture8.png';

const ServicesSection = () => {
    return (
        <section className="protect" >

            <div id='Protect-section' className="container">


                <h2 className="text-center">Popular Services</h2> {/* Centered heading */}
                <div className="slider">

                    <div className="slider-content" id="slider-content">
                        <div className="service">
                            <img src={pic1} alt="Service 1" />

                            <Link to="/design-registration" > <p>Design Registration</p></Link>
                        </div>
                        <div className="service">
                            <img src={pic2} alt="Service 2" />
                            <Link to="/patent-registration" > <p>Patent Registration </p></Link>
                        </div>
                        <div className="service">
                            <img src={pic3} alt="Service 3" />
                            <Link to='/trademark-registration'><p>Trademark Registration</p></Link>
                        </div>
                        <div className="service">
                            <img src={pic4} alt="Service 4" />

                            <Link to='/copyright-registration'><p>Copyright Registration</p></Link>
                        </div>
                        <div className="service">
                            <img src={pic5} alt="Service 5" />

                            <Link to='/research-devlopement'><p>Research & Development</p></Link>
                        </div>
                        <div className="service">
                            <img src={pic6} alt="Service 6" />

                            <Link to='/seminar-workshop'><p>Seminar & Workshop</p></Link>
                        </div>
                        <div className="service">
                            <img src={pic7} alt="Service 7" />

                            <Link to='/prototype-devlopement'><p>Prototype Development</p></Link>
                        </div>
                        <div className="service">
                            <img src={pic8} alt="Service 8" />

                            <Link to='/consultancy'><p>Consultancy</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default ServicesSection;
