import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookingContext, TotalContext } from '../../App';
import './SeatCalculation.css'

const SeatCalculation = () => {
    const [bookedTickets, setBookedTickets] = useState(0);
    const [bookingData, setBookingData] = useContext(BookingContext);
    const [total, setTotal] = useContext(TotalContext);
    const { businessPrice, economyPrice, businessTicketNumbers, economyTicketNumbers, date } = bookingData;
    let subTotal = (businessPrice * businessTicketNumbers) + (economyPrice * economyTicketNumbers) | 0;
    let vat = subTotal * 0.1 | 0;
    let totalCost = subTotal + vat | 0;
    setTotal(totalCost);

    useEffect(() => {
        fetch('http://localhost:5000/userBookings?date=' + date)
            .then(res => res.json())
            .then(data => {
                let sumOfBTickets = 0;
                let sumOfETickets = 0;
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    const bTickets = parseFloat(element.data.businessTicketNumbers);
                    sumOfBTickets = sumOfBTickets + bTickets;
                };
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    const eTickets = parseFloat(element.data.economyTicketNumbers);
                    sumOfETickets = sumOfETickets + eTickets;
                };
                const totalTickets = sumOfBTickets + sumOfETickets;
                setBookedTickets(totalTickets);
            })
    }, [date]);


    return (
        <div className="seat-calculation mt-5">
            <h1 className="text-center">Total Seat: 50</h1>
            <div className="d-flex justify-content-center align-items-center">
                <h4 className="p-4">Booked: <span className="booked">{bookedTickets}</span></h4>
                <h4 className="p-4">Available: <span className="remaining">{50 - bookedTickets}</span></h4>
            </div>
            <div className="cost">
                <div className="tax-total">
                    <div className="amount">
                        <p>Subtotal</p>
                        <p>$ <span id="subTotal">{subTotal}</span></p>
                    </div>
                    <div className="amount">
                        <p>Charge 10% VAT</p>
                        <p>$ <span id="taxAmount">{vat}</span></p>
                    </div>
                </div>
                <div className="amount">
                    <h4>Total</h4>
                    <p>$ <span id="totalAmount">{totalCost}</span></p>
                </div>
            </div>
            <div className="proceed d-flex justify-content-center align-items-center mt-3">
                <Link to={totalCost ? '/payment' : '/'}>
                    {
                        totalCost ? <input type="submit" className="btn btn-danger" value="Proceed" required /> : <input type="submit" className="btn btn-primary" value="Proceed" disabled />
                    }
                </Link>
            </div>
        </div>
    );
};

export default SeatCalculation;