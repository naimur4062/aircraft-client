import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './SimpleCardForm.css';

const SimpleCardForm = ({ handlePayment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess(null);
        } else {
            setPaymentSuccess(paymentMethod.id);
            setPaymentError(null);
            handlePayment(paymentMethod.card.brand)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button className="pay-btn" type="submit" disabled={!stripe}>
                    PAY
                </button>
            </form>
            <div className="mt-5">
                {
                    paymentError && <h2 style={{ color: 'red' }}>{paymentError}</h2>
                }
                {
                    paymentSuccess && <h2 style={{ color: 'aqua' }}>Your payment is successful.</h2>
                }
            </div>
        </div>
    );
};

export default SimpleCardForm;