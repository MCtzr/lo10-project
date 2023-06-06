import React, { useState } from "react";
import '../compte.css';
import ComposantConnexion from "./ConnexionForm/ComposantConnexion";
import ComposantInscription from "./InscriptionForm/ComposantInscription";

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
        <div className="navConnexion">
            <button onClick={() => setAfficherConnexion(true)}>Connexion</button>
            <button onClick={() => setAfficherConnexion(false)}>Inscription</button>
            {afficherComponent()}
        </div>
    )
}

export default ConnexionCompte;