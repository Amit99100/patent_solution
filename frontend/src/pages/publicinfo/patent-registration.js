// src/pages/DesignRegistration.js
import React from 'react';


import '../../style/publicinfo/design-registration.css'

import Header from '../../component/Header'




const PatentRegistration = () => {
    return (
        <>
            <Header />
            <div className="design-registration-container">
                <h1 className="main-heading">What is Patent Registration?</h1>
                <section className="section">
                    <h2 className="section-heading">Introduction</h2>
                    <p className="section-text">
                        Patent registration grants exclusive rights to inventors over their inventions. It protects new and useful inventions, processes, or methods, ensuring that others cannot make, use, or sell the invention without permission.
                    </p>
                </section>
                <section className="section">
                    <h2 className="section-heading">Why is it Important?</h2>
                    <p className="section-text">
                        Registering a patent provides legal recognition and ownership of an invention. It encourages innovation by rewarding inventors with the exclusive right to profit from their creations, fostering economic growth and technological advancement.
                    </p>
                </section>
                <section className="section">
                    <h2 className="section-heading">Process of Patent Registration</h2>
                    <p className="section-text">
                        The process typically involves filing a patent application with a detailed description of the invention. After examination and approval by the patent office, the patent is granted, providing exclusive rights for a specified period.
                    </p>
                    <ol className="steps-list">
                        <li>Prepare a detailed description and drawings or diagrams of the invention.</li>
                        <li>File a patent application with the relevant patent office.</li>
                        <li>The application undergoes examination to ensure it meets legal criteria.</li>
                        <li>If approved, the patent is granted, and the invention is protected.</li>
                    </ol>
                </section>
                <section className="section">
                    <h2 className="section-heading">Benefits of Patent Registration</h2>
                    <p className="section-text">
                        Patents provide inventors with exclusive rights, preventing others from using their inventions without permission. They can be licensed or sold, generating revenue and enhancing the market value and competitive advantage of the inventor and their business.
                    </p>
                    <ul className="benefits-list">
                        <li>Exclusive rights to use, make, or sell the invention.</li>
                        <li>Protection against unauthorized use or imitation.</li>
                        <li>Potential to license or sell the patent as an asset.</li>
                        <li>Encourages innovation and technological advancement.</li>
                    </ul>
                </section>
            </div>
        </>
    )

};
export default PatentRegistration
