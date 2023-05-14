import './compte.css';
import { useHistory } from 'react-router-dom'
import { useState, useRef } from 'react';
const expressServer = require('../services/expressService');

function ComposantConnexion() {

    const [type, setPasswordType] = useState('password');
    const userIdRef = useRef(null);
    const passwordRef = useRef(null);
    const history = useHistory();

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

        if (await expressServer.verifyId(formData)) {
            history.push(`/artMatch/${userIdRef.current.value}`);
        }
        else {
            console.log("invalid password");
        }
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