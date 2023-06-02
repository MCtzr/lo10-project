import '../compte.css';
import { useHistory } from 'react-router-dom'
import { useRef, useState, useEffect, useContext } from 'react';
import CredentialGlobal from '../../components/Credentials/CredentialGlobal';
import L from 'leaflet';
const expressServer = require('../../services/expressService');


function ModifyProfil() {

    const { userId } = useContext(CredentialGlobal);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const countryRef = useRef(null);
    const history = useHistory();

    var [firstNameOrigin, setFirstName] = useState("");
    var [lastNameOrigin, setLastName] = useState("");
    var [emailOrigin, setEmail] = useState("");
    var [countryOrigin, setCountry] = useState("");
    var [latOrigin, setLatOrigin] = useState(0.0);
    var [lngOrigin, setLngOrigin] = useState(0.0);

    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [coordinatesLoaded, setCoordinatesLoaded] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            country: countryRef.current.value,
            lat: latOrigin,
            lng: lngOrigin,
        };
        expressServer.modifyUser(formData, userId);
        history.push(`/artMatch/musees`);
    }

    useEffect(() => {
        const getAccountInfos = async () => {
            const result = await expressServer.getAccountInfos(userId);
            setFirstName(result.firstName);
            setLastName(result.lastName);
            setEmail(result.email);
            setCountry(result.country);
            setLatOrigin(parseFloat(result.lat));
            setLngOrigin(parseFloat(result.lng));
            setCoordinatesLoaded(true);
        };

        getAccountInfos();
    }, [userId])

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
                setLatOrigin(parseFloat(lat));
                setLngOrigin(parseFloat(lng));
                if (marker) {
                    marker.setLatLng([lat, lng]);
                }
                else {
                    marker = L.marker([lat, lng]).addTo(mapRef.current)
                }
            });

            var marker

            console.log(latOrigin)

            if (latOrigin && lngOrigin) {
                marker = L.marker([latOrigin, lngOrigin]).addTo(mapRef.current)

            }
            else {
                marker = undefined
            }

            return () => {
                mapRef.current.remove();
            };

        }
    }, [coordinatesLoaded]);

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

                <label>Location</label>
                <div
                    id="map"
                    className="selfMap"
                    ref={mapContainerRef}
                >
                </div>


                <button type="submit">Modify</button>
            </form>

        </div>
    )
}

export default ModifyProfil;