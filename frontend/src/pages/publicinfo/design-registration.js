// src/pages/DesignRegistration.js
import React from 'react';


import '../../style/publicinfo/design-registration.css'
import Header from '../../component/Header'




const DesignRegistration = () => {
    return (

        <>
            <Header />
            <div className="design-registration-container">
                <h1 className="main-heading">What is Design Registration?</h1>
                <section className="section">
                    <h2 className="section-heading">Introduction</h2>
                    <p className="section-text">
                        Design registration protects the visual appearance of a product. This includes aspects such as shape, configuration, pattern, or ornamentation applied to an article. It ensures that your unique design is legally protected from being copied or used without permission.
                    </p>
                </section>
                <section className="section">
                    <h2 className="section-heading">Why is it Important?</h2>
                    <p className="section-text">
                        Registering a design grants the creator exclusive rights to use and commercially exploit the design for a period of time. This helps to prevent unauthorized reproduction or imitation by competitors, ensuring that your investment in creativity and design is safeguarded.
                    </p>
                </section>
                <section className="section">
                    <h2 className="section-heading">Process of Design Registration</h2>
                    <p className="section-text">
                        The process typically involves submitting an application to the relevant authority, providing detailed representations of the design. Once the design is examined and approved, it is registered, granting the creator exclusive rights.
                    </p>
                    <ol className="steps-list">
                        <li>Prepare detailed illustrations or photographs of the design.</li>
                        <li>Submit an application with the necessary forms and fees.</li>
                        <li>The application undergoes examination for compliance with legal requirements.</li>
                        <li>If approved, the design is registered and published in the official journal.</li>
                    </ol>
                </section>
                <section className="section">
                    <h2 className="section-heading">Benefits of Design Registration</h2>
                    <p className="section-text">
                        Registered designs provide legal protection and can be a valuable asset for a business. They can be licensed or sold, providing additional revenue streams. Furthermore, they enhance the overall market value and competitive edge of a company.
                    </p>
                    <ul className="benefits-list">
                        <li>Exclusive rights to use and exploit the design.</li>
                        <li>Protection against unauthorized use or copying.</li>
                        <li>Potential to license or sell the design as an asset.</li>
                        <li>Enhances brand value and market position.</li>
                    </ul>
                </section>
            </div>
        </>

    );
}

export default DesignRegistration;
