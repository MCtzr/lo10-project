import '../../compte.css';
import { useHistory } from 'react-router-dom'
import { useState, useRef } from 'react';
const expressServer = require('../../../services/expressService');

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
        history.push(`/artMatch/${userIdRef.current.value}/musees`);
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
            <h2>S'inscrire</h2>
            <form className='formCompte' onSubmit={handleSubmit}>
                <label>* User Id:</label>
                <input type="text" name="userId" ref={userIdRef} />

                <label>* First Name:</label>
                <input type="text" name="firstName" ref={firstNameRef} />

                <label>* Last Name:</label>
                <input type="text" name="lastName" ref={lastNameRef} />

                <label>* Email:</label>
                <input type="text" name="email" ref={emailRef} />

                <label>Country:</label>
                <input type="text" name="country" ref={countryRef} />

                <label>Lat:</label>
                <input type="text" name="lat" ref={latRef} />

                <label>Lng:</label>
                <input type="text" name="lng" ref={lngRef} />

                <label>* Password:</label>
                <input type={passwordType} name="password" ref={passwordRef} />
                <input className='checkText' type="checkbox" onClick={togglePasswordVisibility} /> Show Password
                <br />
                <button type="submit">Create your account</button>
                <br />
                <label className='obligatoire'>(*) obligatoire</label>
            </form>
        </div>
    )
}

export default ComposantInscription;