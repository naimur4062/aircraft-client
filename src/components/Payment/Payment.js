import React, { useContext } from 'react';
import { BookingContext, LoginContext, TotalContext } from '../../App';
import safeJourney from '../../images/safeJourney.png';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Payment.css';

const Payment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const [bookingData, setBookingData] = useContext(BookingContext);
    const [total, setTotal] = useContext(TotalContext);
    const { destination, businessTicketNumbers, economyTicketNumbers } = bookingData;
    const totalTickets = parseFloat(businessTicketNumbers) + parseFloat(economyTicketNumbers);

    const handlePayment = (payment) => {
        const bookingDetails = { data: bookingData, ...loggedInUser, payment, date: bookingData.date };

        fetch('http://localhost:5000/postBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Your tickets booking is done successfully')
                }
            })
    }

    return (
        <>
            <div className="welcome">
                <h3>Welcome Dear</h3>
                <h3>{loggedInUser.name}</h3>
            </div>
            <div className="d-flex justify-content-center p-2">
                <div className="row container d-flex justify-content-between">
                    <div className="col-md-6 welcome-img">
                        <img src={safeJourney} alt="" />
                    </div>
                    <div className="col-md-6 d-flex justify-content-center text-white">
                        <div className="description">
                            <h1>Your Destination is</h1>
                            <h1>Dhaka to {destination}.</h1>
                            <h2>Business Class Ticket: {businessTicketNumbers}</h2>
                            <h2>Business Class Ticket: {economyTicketNumbers}</h2>
                            <h2>Total Tickets: {totalTickets}</h2>
                            <h2>Total Cost: ${total}</h2>
                            <ProcessPayment handlePayment={handlePayment} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;