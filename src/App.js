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
import Login from "./components/Login/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import Payment from "./components/Payment/Payment";

export const LoginContext = createContext();
export const BookingContext = createContext();
export const TotalContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [bookingData, setBookingData] = useState({});
  const [total, setTotal] = useState(0);
  return (
    <div className="App">
      <LoginContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <BookingContext.Provider value={[bookingData, setBookingData]}>
          <TotalContext.Provider value={[total, setTotal]}>
            <Router>
              <NavBar />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                <PrivateRoute path="/payment">
                  <Payment />
                </PrivateRoute>
                <Route path="/login">
                  <Login />
                </Route>
              </Switch>
            </Router>
          </TotalContext.Provider>
        </BookingContext.Provider >
      </LoginContext.Provider>
    </div >
  );
}

export default App;
