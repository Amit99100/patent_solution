


import React from 'react';
import '../style/HowItWorks.css';

import Header from './Header';

function HowItWorks() {
    return (
        <>
            <Header />
            <section className="how-it-works">
                <h2>How This Site Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>Step 1: Register and Become a Consultant</h3>
                        <ol>
                            <li>Register or sign up to access our services.</li>
                            <li>If you want to offer services, click on "Become a Consultant" and fill out the form.</li>
                            <li>We will verify your application, and once approved, you can start providing services to other users.</li>
                        </ol>
                    </div>
                    <div className="step">
                        <h3>Step 2: Ask Questions and Get Help</h3>
                        <ol>
                            <li>As a registered user, you can view experts on the Home page after logging in.</li>
                            <li>You can ask questions to these experts; some may offer free help for a limited number of questions.</li>
                            <li>For additional questions or services, paid options are available.</li>
                            <li>We provide an end-to-end solution to address your needs.</li>
                        </ol>
                    </div>
                    <div className="step">
                        <h3>Step 3: Get Expert Advice and Innovate</h3>
                        <ol>
                            <li>Receive expert advice tailored to your queries and innovation needs.</li>
                            <li>Utilize our platform to protect and advance your intellectual property.</li>
                            <li>Stay connected with industry professionals to drive your projects forward.</li>
                        </ol>
                    </div>
                </div>
                {/* Optionally, you can add an image or video */}
                {/* <img src="path/to/your/image.jpg" alt="How it works" /> */}
                {/* Or a video */}
                <div>
                    <iframe width="95%" height="500px" src="https://www.youtube.com/embed/Cm_3JqZgLFk" title="How to Know if My Idea is Already Patented?" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </section>
        </>
    );
}

export default HowItWorks;
