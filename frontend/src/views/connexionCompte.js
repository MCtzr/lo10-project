import React, { useState } from "react";
import './views.css';
import ComposantConnexion from "./ComposantConnexion";
import ComposantInscription from "./ComposantInscription";

function ConnexionCompte() {

    const [afficherConnexion, setAfficherConnexion] = useState(true);

    const afficherComponent = () => {
        if (afficherConnexion) {
            return <ComposantConnexion />;
        } else {
            return <ComposantInscription />;
        }
    };

    return (
        <div>
            <button onClick={() => setAfficherConnexion(true)}>Connexion</button>
            <button onClick={() => setAfficherConnexion(false)}>Inscription</button>
            {afficherComponent()}
        </div>
    )
}

export default ConnexionCompte;