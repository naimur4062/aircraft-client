import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import './BookingSection.css';
import { MenuItem, Select } from '@material-ui/core';
import { BookingContext } from '../../App';

const BookingSection = () => {
    const { register, handleSubmit } = useForm();
    const [destination, setDestination] = useState('');
    const [businessPrice, setBusinessPrice] = useState(0);
    const [economyPrice, setEconomyPrice] = useState(0);
    const [bookingData, setBookingData] = useContext(BookingContext);
    const [businessTicketNumbers, setBusinessTicketNumber] = useState(0);
    const [economyTicketNumbers, setEconomyTicketNumber] = useState(0);

    let businessTicketPrice;
    let economyTicketPrice;
    const handleUpdate = (destination) => {
        if (destination === 'Chittagong') {
            businessTicketPrice = 300;
            economyTicketPrice = 200;
        }
        else if (destination === 'India') {
            businessTicketPrice = 500;
            economyTicketPrice = 400;
        }
        else if (destination === 'USA') {
            businessTicketPrice = 800;
            economyTicketPrice = 600;
        }
        setBusinessPrice(businessTicketPrice);
        setEconomyPrice(economyTicketPrice);
    }

    const onSubmit = data => {
        setBusinessTicketNumber(data.business);
        setEconomyTicketNumber(data.economy);
        const bookingData = {
            destination: destination,
            businessTicketNumbers: businessTicketNumbers,
            economyTicketNumbers: economyTicketNumbers,
            date: data.journeyDate,
            businessPrice: businessPrice,
            economyPrice: economyPrice
        };
        setBookingData(bookingData);
        if (businessTicketNumbers === undefined) {
            alert('Before re-calculate, need to reload.')
            document.location.reload();
        }
        if (economyTicketNumbers === undefined) {
            alert('Before re-calculate, need to reload.')
            document.location.reload();
        }
    }
    return (
        <div className="admin-form mt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="admin container shadow p-4 mb-3 mt-5 bg-body rounded">
                    <h1 style={{ color: 'grey' }}>Ticket from Dhaka Airport</h1>
                    <div className="row">
                        <div className="col-md-12 pt-2 form-group mx-auto">
                            <label htmlFor="form-label">Select a date</label><br />
                            <input name="journeyDate" type="date" className="form-control mt-2" required ref={register} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 pt-2 form-group mx-auto">
                            <label htmlFor="form-label">From</label> <br />
                            <p id="from" className="mt-2">Dhaka</p>
                        </div>
                        <div className="col-md-6 pt-2 form-group">
                            <label htmlFor="form-label">To</label><br />
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                required
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value)
                                    handleUpdate(e.target.value)
                                }}
                            >
                                <MenuItem value="Chittagong">Chittagong</MenuItem>
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="USA">USA</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="row pt-2">
                        <div className="col-md-6 pt-2 form-group mx-auto">
                            <label className="mb-3" htmlFor="form-label">Business Class (${businessPrice})</label> <br />
                            <label htmlFor="form-label">Select Ticket Number</label><br />
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={businessTicketNumbers}
                                onChange={(e) => {
                                    setBusinessTicketNumber(e.target.value);
                                }}
                            >
                                <MenuItem value="0">0</MenuItem>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                            </Select>
                        </div>
                        <div className="col-md-6 pt-2 form-group mx-auto">
                            <label className="mb-3" htmlFor="form-label">Economy Class (${economyPrice})</label> <br />
                            <label htmlFor="form-label">Select Ticket Number</label><br />
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={economyTicketNumbers}
                                onChange={(e) => {
                                    setEconomyTicketNumber(e.target.value);
                                }}
                            >
                                <MenuItem value="0">0</MenuItem>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                                <MenuItem value="5">5</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="save-button col-md-8 mt-4 form-group mx-auto text-center sendMessage">
                        <input type="submit" className="btn btn-danger" value="Calculate" required />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BookingSection;