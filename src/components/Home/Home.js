import React from 'react';
import BookingSection from '../BookingSection/BookingSection';
import SeatCalculation from '../SeatCalculation/SeatCalculation';

const Home = () => {

    return (
        <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <BookingSection />
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <SeatCalculation />
            </div>
        </div>
    );
};

export default Home;