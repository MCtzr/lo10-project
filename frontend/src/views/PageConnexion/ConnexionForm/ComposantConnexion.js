import '../../compte.css';
import { useHistory } from 'react-router-dom'
import { useState, useRef, useContext } from 'react';
import CredentialGlobal from '../../../components/Credentials/CredentialGlobal';
import ExpressService from '../../../services/expressService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ComposantConnexion() {

    const expressService = ExpressService();

    const [type, setPasswordType] = useState('password');
    const userIdRef = useRef(null);
    const passwordRef = useRef(null);
    const history = useHistory();
    const { updateCredential, updateToken } = useContext(CredentialGlobal);

    const myFunction = () => {
        if (type === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
        console.log(type)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            userId: userIdRef.current.value,
            password: passwordRef.current.value,
        };

        await expressService.verifyId(formData)
            .then((token) => {
                // Mise à jour du token à l'aide de la fonction updateToken du contexte
                if (token.message) {
                    toast.error(token.message);
                }
                else {
                    updateToken(token);
                    updateCredential(formData.userId)
                    history.push(`/artMatch/musees`);
                }

            })
            .catch((error) => {
                console.error(error);
                // Gérer l'erreur, par exemple afficher un message d'erreur à l'utilisateur
            });
    }

    return (
        <div>
            <h2>Se connecter</h2>
            <form className='formCompte' onSubmit={handleSubmit}>
                <label>* User Id:</label>
                <input type="text" name="userId" ref={userIdRef} />
                <label>Password:</label>
                <input type={`${type}`} name="password" ref={passwordRef} />
                <input className='checkText' type="checkbox" onClick={() => myFunction()} />
                <label> Show Password</label>

                <input type="submit" value="Connect" />
                <label className='obligatoire'>(*) obligatoire</label>
            </form>
        </div>
    )
}

export default ComposantConnexion;