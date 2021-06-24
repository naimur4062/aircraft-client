import React, { useContext } from 'react';
import { BookingContext } from '../../App';
import './SeatCalculation.css'

const SeatCalculation = () => {
    const [bookingData, setBookingData] = useContext(BookingContext);
    const { businessPrice, economyPrice, businessTicketNumbers, economyTicketNumbers } = bookingData;
    let subTotal = (businessPrice * businessTicketNumbers) + (economyPrice * economyTicketNumbers);
    let vat = subTotal * 0.1;
    let total = subTotal + vat;

    if (!subTotal) {
        subTotal = 0
    }
    if (!vat) {
        vat = 0
    }
    if (!total) {
        total = 0
    }

    return (
        <div className="seat-calculation mt-5">
            <h1 className="text-center">Total Seat: 50</h1>
            <div className="d-flex justify-content-center align-items-center">
                <h4 className="p-4">Booked: <span className="booked">30</span></h4>
                <h4 className="p-4">Available: <span className="remaining">20</span></h4>
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
                    <p>$ <span id="totalAmount">{total}</span></p>
                </div>
            </div>
            <div className="proceed d-flex justify-content-center align-items-center mt-3">
                <input type="submit" className="btn btn-danger" value="Proceed" required />
            </div>
        </div>
    );
};

export default SeatCalculation;