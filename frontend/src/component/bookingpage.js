

import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingPage = () => {
    const { expertId } = useParams(); // Extract the expertId from the URL
    const location = useLocation();
    const { amount } = location.state; // Extract the fixed amount from the location state
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            toast.success('currently free !');
            setLoading(false);

            // Send confirmation email
            sendConfirmationEmail();
        }, 3000);
    };

    const sendConfirmationEmail = () => {
        const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage

        axios.post('/api/send-confirmation-email', {
            expertId,
            date,
            time,
            amount // Include the fixed amount in the request
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            toast.success('Confirmation email sent!');
        }).catch(error => {
            console.error('Error sending email:', error);
            toast.error('Failed to send confirmation email.');
        });
    };

    return (
        <div className="container">
            <h2>Book a Call with Expert</h2>
            <form onSubmit={handleBooking}>
                <div className="form-group">
                    <label>Select Date:</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Select Time:</label>
                    <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Amount (Fixed):</label>
                    <input type="text" className="form-control" value={`$${amount}`} readOnly />
                </div>
                <div className="form-group">
                    <label>UPI ID for Payment:</label>
                    <input type="text" className="form-control" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay and Book Call'}
                </button>
            </form>
        </div>
    );
};

export default BookingPage;
