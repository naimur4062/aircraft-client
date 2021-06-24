import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="container">
            <Navbar sticky="top" expand="lg" collapseOnSelect>
                <Navbar.Brand>
                    <h1 className="brand">Aircraft</h1>
                </Navbar.Brand>
                <Navbar.Toggle id="toggle" />
                <Navbar.Collapse className="text-center navigation">
                    <Nav className="ms-auto">
                        <Nav.Link>
                            <Link to="/home"><span className="navLink">HOME</span></Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/about"><span className="navLink">ABOUT</span></Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/contact"><span className="navLink">CONTACT</span></Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/login"><span className="navLink">SIGN UP</span></Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;