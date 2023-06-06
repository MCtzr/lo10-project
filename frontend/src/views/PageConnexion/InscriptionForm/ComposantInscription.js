import '../../compte.css';
import { useHistory } from 'react-router-dom'
import { useState, useRef, useContext, useEffect } from 'react';
import CredentialGlobal from '../../../components/Credentials/CredentialGlobal';
import L from 'leaflet';
import ExpressService from '../../../services/expressService';

function ComposantInscription() {

    const expressService = ExpressService();

    const [passwordType, setPasswordType] = useState('password');
    const userIdRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const countryRef = useRef(null);
    var latRef = null;
    var lngRef = null;
    const passwordRef = useRef(null);
    const history = useHistory();
    const { updateCredential, updateToken } = useContext(CredentialGlobal);

    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            userId: userIdRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            country: countryRef.current.value,
            lat: latRef,
            lng: lngRef,
            password: passwordRef.current.value,
        };
        await expressService.createUser(formData)
            .then((token) => {

                // Mise à jour du token à l'aide de la fonction updateToken du contexte
                console.log(token)
                updateToken(token);
                updateCredential(formData.userId);
                history.push(`/artMatch/musees`);
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const togglePasswordVisibility = () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    }

    useEffect(() => {
        if (mapContainerRef.current) {

            mapRef.current = L.map(mapContainerRef.current).setView(
                [48.856614, 2.3522219],
                5
            );

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            // Ajoutez un marqueur pour la sélection d'adresse


            // Écoutez l'événement "click" sur la carte pour mettre à jour les coordonnées du marqueur
            mapRef.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                latRef = parseFloat(lat);
                lngRef = parseFloat(lng);
                console.log(latRef)
                if (marker) {
                    marker.setLatLng([lat, lng]);
                }
                else {
                    marker = L.marker([lat, lng]).addTo(mapRef.current)
                }
            });

            var marker = undefined

            return () => {
                mapRef.current.remove();
            };

        }
    }, []);

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

                <label>Location</label>
                <div
                    id="map"
                    className="selfMap"
                    ref={mapContainerRef}
                >
                </div>

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