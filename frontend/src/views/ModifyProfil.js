import './compte.css';
import { useHistory, useParams } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
const expressServer = require('../services/expressService');

function ModifyProfil() {

    const { userId } = useParams();

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const countryRef = useRef(null);
    const latRef = useRef(null);
    const lngRef = useRef(null);
    const history = useHistory();

    var [firstNameOrigin, setFirstName] = useState("");
    var [lastNameOrigin, setLastName] = useState("");
    var [emailOrigin, setEmail] = useState("");
    var [countryOrigin, setCountry] = useState("");
    var [latOrigin, setLat] = useState("");
    var [lngOrigin, setLng] = useState("");

    const getAccountInfos = async () => {
        const result = await expressServer.getAccountInfos(userId);
        setFirstName(result.firstName);
        setLastName(result.lastName);
        setEmail(result.email);
        setCountry(result.country);
        setLat(result.lat);
        setLng(result.lng);
    }

    useEffect(() => {
        getAccountInfos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            country: countryRef.current.value,
            lat: latRef.current.value,
            lng: lngRef.current.value,
        };
        expressServer.modifyUser(formData, userId);

        history.push(`/artMatch/${userId}/musees`);
    }

    return (
        <div>
            <h2>Modifier le profil de {userId}</h2>
            <form className='formCompte' onSubmit={handleSubmit}>
                <label>* First Name:</label>
                    <input type="text" name="firstName" ref={firstNameRef} placeholder={firstNameOrigin} />
                
                <label>* Last Name:</label>
                    <input type="text" name="lastName" ref={lastNameRef} placeholder={lastNameOrigin} />
                
                <label>* Email:</label>
                    <input type="text" name="email" ref={emailRef} placeholder={emailOrigin} />
                
                <label>Country:</label>
                    <input type="text" name="country" ref={countryRef} placeholder={countryOrigin} />
                
                <label>Lat:</label>
                    <input type="text" name="lat" ref={latRef} placeholder={latOrigin} />
                
                <label>Lng:</label>
                    <input type="text" name="lng" ref={lngRef} placeholder={lngOrigin} />
                
                <button type="submit">Modify</button>
            </form>
        </div>
    )
}

export default ModifyProfil;