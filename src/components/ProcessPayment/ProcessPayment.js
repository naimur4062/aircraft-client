import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from '../SimpleCardForm/SimpleCardForm';

const stripePromise = loadStripe('pk_test_51Ie1TEDUYQJyVNYgnBy5yAhJ6b0MPVq2BxttlizAQuV7lHHStmIm41r1JrQX4B7HgHa1RRceEm5Tqirr9H10PIA200TOr9mi8n');

const ProcessPayment = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment} />
        </Elements>
    );
};

export default ProcessPayment;