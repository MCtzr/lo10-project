import './views.css';
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
            <h2>Composant connexion</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    *User Id:
                    <input type="text" name="userId" ref={userIdRef} />
                </label>
                <label>
                    Password:
                    <input type={`${type}`} name="password" ref={passwordRef} />
                    <input type="checkbox" onClick={() => myFunction()} />Show Password
                </label>
                <input type="submit" value="Connect" />
            </form>
        </div>
    )
}

export default ComposantConnexion;