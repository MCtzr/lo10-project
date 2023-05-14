import { useParams } from "react-router-dom";
import data from '../services/liste-musees.json';
import noImage from '../assets/noImage.jpg';
import React, { useState } from 'react';
import './PageMusee';
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { TbWorld } from "react-icons/tb"

function PageMusee() {

    const { musee } = useParams();
    const [imageLoaded, setImageLoaded] = useState(true);


    const result = data.find(item => item.identifiant_museofile === musee);
    console.log(result);

    function handleImageLoadError() {
        setImageLoaded(false);
    }

    return (
        <>
            <h1>{result.nom_officiel_du_musee}</h1>
            {imageLoaded ? (
                <img className="img" width="30%" src={`https://s3.eu-west-3.amazonaws.com/pop-phototeque/museo/${result.identifiant_museofile}/museofile${result.identifiant_museofile}.jpg`} alt={`${result.identifiant_museofile}`} loading="lazy" onError={() => handleImageLoadError()}></img>
            ) : (
                <img className="img" width="30%" src={noImage} alt="noImage" loading="lazy"></img>
            )}

            <div className="infos">
                <div className="oneInfo"><MdLocationOn /> : {result.adresse}, {result.commune}, {result.code_postal}, </div>
                <div className="oneInfo"><BsFillTelephoneFill /> : {result.telephone}</div>
                <div className="oneInfo"><TbWorld /> : {result.url}</div>
            </div>

            <p>AJOUTER UNE CARTE DU MUSEE (position)</p>

            <p>OEUVRES PRESENTES DANS LE MUSEE</p>
        </>
    )
}

export default PageMusee;