import './views.css';
import { useHistory } from 'react-router-dom'
import { useState, useRef } from 'react';
const expressServer = require('../services/expressService');

function ComposantInscription() {

    const [passwordType, setPasswordType] = useState('password');
    const userIdRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const countryRef = useRef(null);
    const latRef = useRef(null);
    const lngRef = useRef(null);
    const passwordRef = useRef(null);
    const history = useHistory();

    const handleSubmit = (event) => {
        const formData = {
            userId: userIdRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            country: countryRef.current.value,
            lat: latRef.current.value,
            lng: lngRef.current.value,
            password: passwordRef.current.value,
        };
        expressServer.createUser(formData);
        event.preventDefault();
        history.push(`/artMatch/${userIdRef.current.value}`);
    }

    const togglePasswordVisibility = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    }

    return (
        <div>
            <h2>Composant connexion</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    *User Id:
                    <input type="text" name="userId" ref={userIdRef} />
                </label>
                <label>
                    *First Name:
                    <input type="text" name="firstName" ref={firstNameRef} />
                </label>
                <label>
                    *Last Name:
                    <input type="text" name="lastName" ref={lastNameRef} />
                </label>
                <label>
                    *Email:
                    <input type="text" name="email" ref={emailRef} />
                </label>
                <label>
                    Country:
                    <input type="text" name="country" ref={countryRef} />
                </label>
                <label>
                    Lat:
                    <input type="text" name="lat" ref={latRef} />
                </label>
                <label>
                    Lng:
                    <input type="text" name="lng" ref={lngRef} />
                </label>
                <label>
                    Password:
                    <input type={passwordType} name="password" ref={passwordRef} />
                    <input type="checkbox" onClick={togglePasswordVisibility} />Show Password
                </label>
                <button type="submit">Create your account</button>
            </form>
        </div>
    )
}

export default ComposantInscription;