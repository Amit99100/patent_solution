

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/card.css'


const Card = ({ image, productName, expertId, expertName, prodCategory, email, price, currentUserId, userName }) => {


    return (

        <div className="  col-md-4 mb-4">

            <div className="card h-100 shadow ">
                <img style={{ width: '40%', margin: '10px', padding: '2px', border: '2px solid green', borderRadius: '50%' }} src={image || 'placeholder.png'} className="card-img-top img-fluid " alt={productName || 'Expert Image'} />
                <div className="card-body">
                    <h6 className="card-title font-weight-bold">{productName}</h6>
                    <div className="card-text">{prodCategory}</div>
                    <div className="card-text">${price}</div>
                    <h5 className="card-text"><small className="text-muted">{email}</small></h5>

                </div>

                <div className="card-footer bg-light">
                    {/* <Link to={`/ask-questions/${expertId}`} className="btn btn-primary btn-sm"> */}
                    {/* <Link to={`/ask-questions/${expertId}?currentUserId=${currentUserId}?askedToName=${expertName}`} className="btn btn-primary btn-sm">
                            Ask Free Questions
                        </Link> */}
                    <Link to={`/ask-questions/${expertId}?currentUserId=${currentUserId}&askedToName=${expertName}&prodCategory=${prodCategory}&userName=${userName}`} className="btn btn-primary btn-sm">
                        Ask Free Questions
                    </Link>
                    {console.log("Expert name will be Here ->   " + expertName)};
                    <Link to={{ pathname: `/book-call/${expertId}`, state: { amount: price } }} className="btn btn-primary btn-sm">
                        Book A Call
                    </Link>
                </div>
            </div>
        </div>
    )

};


// Card.propTypes = {
//     image: PropTypes.string.isRequired,
//     productName: PropTypes.string.isRequired,
//     expertId: PropTypes.string.isRequired, // Define the prop type
//     prodCategory: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     currentUserId: PropTypes.string // Define the current user's ID prop type
// };

export default Card;
