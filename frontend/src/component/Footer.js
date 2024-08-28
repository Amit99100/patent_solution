import React from 'react'
import '../style/footersection.css'
const Footer = () => {
    return (
        <footer id="contact-section">

            <div className="footer-links">
                <div className="link-to-fotter">
                    <div>

                        <h4 >About</h4>
                    </div>
                    <div>
                        <ul >
                            <li><a href="#">Press & News</a></li>
                            <li><a target="_blank" href="https://www.uspto.gov/patents/basics">More about Patent</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>

                </div>
                <div className="link-to-fotter">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="tel:+1234567890"><i className="fas fa-phone"></i> +1 (234) 567-890</a></li>
                        <li><a href="https://wa.me/1234567890" target="_blank"><i className="fab fa-whatsapp"></i> WhatsApp</a></li>
                    </ul>
                </div>
                <div className="link-to-fotter">
                    <h4 >Follow Us</h4>
                    <ul className="social-links">
                        <li><a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i> Twitter</a></li>
                        <li><a href="https://facebook.com" target="_blank"><i className="fab fa-facebook"></i> Facebook</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 electrogati. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
