import React from "react";
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";

export const BookingContext = createContext();

function App() {
  const [bookingData, setBookingData] = useState({});
  return (
    <div className="App">
      <BookingContext.Provider value={[bookingData, setBookingData]}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Router>
      </BookingContext.Provider >
    </div >
  );
}

export default App;
