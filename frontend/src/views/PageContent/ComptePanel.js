import '../views.css';
import '../compte.css'
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import CredentialGlobal from '../../components/Credentials/CredentialGlobal';
import ExpressService from '../../services/expressService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ComptePanel() {

    var [firstName, setFirstName] = useState("");
    var [lastName, setLastName] = useState("");
    var [email, setEmail] = useState("");
    var [country, setCountry] = useState("");
    var [afficherCompte, setAfficherCompte] = useState(false);
    const history = useHistory();
    const { userId } = useContext(CredentialGlobal);
    const expressService = ExpressService();


    const getAccountInfos = async () => {
        const result = await expressService.getAccountInfos(userId);
        if (result.message) {
            toast.error(result.message);
        }
        else {
            setFirstName(result.firstName);
            setLastName(result.lastName);
            setEmail(result.email);
            setCountry(result.country);
        }
    }

    useEffect(() => {
        if (afficherCompte) {
            getAccountInfos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [afficherCompte]);

    const changeComponent = () => {
        if (userId) {
            setAfficherCompte(!afficherCompte);
        }
        else {
            history.push(`/login`);
        }
    }

    const modifyProfil = () => {
        history.push(`/modifyProfil`);
    }

    return (
        <>
            <button className="compte" onClick={() => changeComponent()}>
                <h3>{userId ? userId : "Se connecter"}</h3>
            </button>
            {afficherCompte &&
                <div className='comptePanel'>
                    <h1>{userId}</h1>
                    <p>First Name : <b>{firstName}</b></p>
                    <p>Last Name : <b>{lastName}</b></p>
                    <p>Email : <b>{email}</b></p>
                    <p>Country : <b>{country}</b></p>
                    <button onClick={() => modifyProfil()}>modifier</button>
                </div>
            }
        </>
    )
}

export default ComptePanel;