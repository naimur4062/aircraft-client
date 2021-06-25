import React, { useState } from 'react';
import './Login.css';
import googleImg from '../../../images/google.png';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { LoginContext } from '../../../App';
import { useHistory, useLocation } from 'react-router';
import { Button, Card, Form } from 'react-bootstrap';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(LoginContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
    });

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                };
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                const email = error.email;
                console.log(errorMessage, email);
            });
    }

    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    updateUserName(user.name);
                    const { displayName, email } = userCredential.user;
                    const signedInUser = { name: user.name, email };
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    setLoggedInUser(signedInUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const { displayName, email } = userCredential.user;
                    const signedInUser = { name: displayName, email };
                    setLoggedInUser(signedInUser);
                    history.replace(from);
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                    console.log('error', error.message)
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('name updated success')
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <div>
            <div className="loginTitle container mt-2 mb-3">
                <h1>Please Login</h1>
            </div>
            <div data-aos="zoom-in" className="col-md-4 m-auto login">
                <Card className="emailCard">
                    <Card.Body>
                        {newUser && <Card.Title>Create An Account</Card.Title>}
                        {!newUser && <Card.Title>Login</Card.Title>}
                        <Form onSubmit={handleSubmit} className="mt-5">
                            {newUser && <Form.Group controlId="formBasicName">
                                <Form.Control type="name" onBlur={handleBlur} name="name" className="formControl" placeholder="Your Name" required />
                            </Form.Group>}
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" onBlur={handleBlur} name="email" className="formControl" placeholder="username or email" required />
                            </Form.Group>
                            <Form.Group className="mt-2" controlId="formBasicPassword">
                                <Form.Control type="password" onBlur={handleBlur} name="password" className="formControl" placeholder="password" required />
                            </Form.Group>
                            {newUser && <Form.Group className="mt-2" controlId="formBasicPassword">
                                <Form.Control type="password" onBlur={handleBlur} name="password" className="formControl" placeholder="Conform Password" required />
                            </Form.Group>}
                            {newUser && <Button className="mt-5 rounded-0" type="submit">
                                Create an Account
                            </Button>}
                            {!newUser && <Button className="mt-5 rounded-0" type="submit">
                                Login
                            </Button>}
                            <Form.Text className="text-center mt-3" style={{ fontSize: '17px' }}>
                                <Form.Group>
                                    <Form.Check
                                        onChange={() => setNewUser(!newUser)}
                                        label="New User Sign Up"
                                        feedback="You must agree before submitting."
                                    />
                                </Form.Group>
                            </Form.Text>
                        </Form>
                    </Card.Body>
                </Card>
                <div>
                    <h6 style={{ color: 'red', fontWeight: '700' }}>{user.error}</h6>
                </div>
            </div>
            <div className="login">
                <button onClick={handleGoogleSignIn}>
                    <img src={googleImg} alt="" />
                    Continue With Google
                </button>
            </div>
        </div>
    );
};

export default Login;