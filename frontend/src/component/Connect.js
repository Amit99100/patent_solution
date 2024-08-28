// src/components/ConnectSection.js
import React from 'react';
import '../style/connect.css';


const ConnectSection = () => {
    return (
        <section className="connect" >
            <div className="container">
                <h2 id='innovate-section' className="curly-font">Let's Connect Free</h2>
                <div className="columns">
                    <div className="column">
                        <h3 >Customers</h3>
                        <ul>
                            <li><a href="#corporations">Corporations and MNCs</a></li>
                            <li><a href="#patent-attorneys">Patent Attorneys</a></li>
                            <li><a href="#startups">Startups and Small Businesses</a></li>
                            <li><a href="#university-tech">University Technology Departments</a></li>
                        </ul>
                    </div>
                    <div className="column">
                        <h3>IP Services</h3>
                        <ul>
                            <li><a href="#patent-creation">Patent Creation</a></li>
                            <li><a href="#patent-search">Patent Search and Analytics</a></li>
                            <li><a href="#ip-protection">IP Protection</a></li>
                            <li><a href="#patent-strategy">Patent Strategy</a></li>
                            <li><a href="#all-ip-services">Explore All IP Services</a></li>
                        </ul>
                    </div>
                    <div className="column">
                        <h3>Innovation Experts</h3>
                        <ul>
                            <li><a href="#researcher">Researcher</a></li>
                            <li><a href="#industry-expert">Industry Expert</a></li>
                            <li><a href="#innovators">Innovators</a></li>
                            <li><a href="#consultant">Consultant</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ConnectSection;
