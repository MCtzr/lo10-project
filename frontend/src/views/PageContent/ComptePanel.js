import '../views.css';
import '../compte.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
const expressServer = require('../../services/expressService');


function ComptePanel({ userId }) {

    var [firstName, setFirstName] = useState("");
    var [lastName, setLastName] = useState("");
    var [email, setEmail] = useState("");
    var [country, setCountry] = useState("");
    var [lat, setLat] = useState("");
    var [lng, setLng] = useState("");
    var [afficherCompte, setAfficherCompte] = useState(false);
    const history = useHistory();

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
        if (afficherCompte) {
            getAccountInfos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [afficherCompte]);

    const changeComponent = () => {
        setAfficherCompte(!afficherCompte);
    }

    const modifyProfil = (id) => {
        history.push(`/artMatch/${userId}/modify`);
    }

    return (
        <>
            <button className="compte" onClick={() => changeComponent()}>
                <h3>{userId}</h3>
            </button>
            {afficherCompte &&
                <div className='comptePanel'>
                    <h1>{userId}</h1>
                    <p>First Name : <b>{firstName}</b></p>
                    <p>Last Name : <b>{lastName}</b></p>
                    <p>Email : <b>{email}</b></p>
                    <p>Country : <b>{country}</b></p>
                    <p>Lat : <b>{lat}</b></p>
                    <p>Lng : <b>{lng}</b></p>
                    <button onClick={() => modifyProfil()}>modifier</button>
                </div>
            }
        </>
    )
}

export default ComptePanel;