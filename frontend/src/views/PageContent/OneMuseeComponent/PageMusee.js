import { useParams } from "react-router-dom";
import data from '../../../services/liste-musees.json';
import noImage from '../../../assets/noImage.jpg';
import React, { useState, useEffect, useRef, useContext } from 'react';
import './PageMusee.css';
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import L from 'leaflet';
import CredentialGlobal from '../../../components/Credentials/CredentialGlobal';
const expressServer = require('../../../services/expressService');

function PageMusee() {
    const { musee } = useParams();
    const [imageLoaded, setImageLoaded] = useState(true);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]); // Référence aux marqueurs
    const { userId } = useContext(CredentialGlobal);

    var [lat, setLat] = useState(0);
    var [lng, setLng] = useState(0);

    const result = data.find((item) => item.identifiant_museofile === musee);
    const [oeuvres, setOeuvres] = useState([]);

    useEffect(() => {
        const codeMudeofile = musee;
      
        const url = `https://data.culture.gouv.fr/api/records/1.0/search/?dataset=base-joconde-extrait&rows=1000&q=${codeMudeofile}`;
        
        fetch(url)
          .then(response => response.json())
          .then(dataOeuvres => {
            setOeuvres(dataOeuvres.records);
          })
          .catch(error => console.error(error));
    }, []);
    console.log(oeuvres);

    const getAccountInfos = async () => {
        const value = await expressServer.getAccountInfos(userId);
        setLat(value.lat);
        setLng(value.lng);
    }

    function handleImageLoadError() {
        setImageLoaded(false);
    }

    useEffect(() => {
        getAccountInfos();
    }, []);

    useEffect(() => {
        if (result && mapContainerRef.current) {

            mapRef.current = L.map(mapContainerRef.current).setView(
                [result.latitude, result.longitude],
                13
            );

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);

            L.marker([result.latitude, result.longitude]).addTo(mapRef.current);

            if (lat && lng) {

                L.marker([lat, lng]).addTo(mapRef.current);

                markersRef.current = [
                    L.marker([result.latitude, result.longitude]).bindPopup(`${result.nom_officiel_du_musee}`),
                    L.marker([lat, lng]).bindPopup("Votre adresse") // Deuxième paire de coordonnées
                ];

                const group = L.featureGroup(markersRef.current).addTo(mapRef.current);

                mapRef.current.fitBounds(group.getBounds());

            }

            return () => {
                mapRef.current.remove();
            };

        }
    }, [result, lat, lng]);

    return (
        <>
            <h1>{result.nom_officiel_du_musee}</h1>
            <div className="museeImage">
                {imageLoaded ? (
                    <img
                        className="img"
                        width="30%"
                        src={`https://s3.eu-west-3.amazonaws.com/pop-phototeque/museo/${result.identifiant_museofile}/museofile${result.identifiant_museofile}.jpg`}
                        alt={`${result.identifiant_museofile}`}
                        loading="lazy"
                        onError={handleImageLoadError}
                    />
                ) : (
                    <img
                        className="img"
                        width="30%"
                        src={noImage}
                        alt="noImage"
                        loading="lazy"
                    />
                )}
            
                <h3>Localisation</h3>
                <div
                    id="map"
                    className="museeMap"
                    ref={mapContainerRef}
                >
                </div>

            </div>
            <div className="museeInformation">
                <h3>Adresse</h3>
                <p className="oneInfo">{result.adresse ? "Adresse : " : ""}{result.adresse}</p>
                <p className="oneInfo">Code postal : {result.code_postal}</p>
                <p className="oneInfo">Ville : {result.commune}</p>
                <p className="oneInfo">Département : {result.departement}</p>
                <h3>Contact</h3>
                <p className="oneInfo">Téléphone : {result.telephone}</p>
                <p className="oneInfo">{result.url ? "Site web : " : ""}<a href={result.url}>{result.url}</a></p>
                <p>&nbsp;</p>
                <h3>Oeuvres</h3>
                <ul>
                    {oeuvres.slice(0, 20).map((oeuvre, index) => (
                        // TODO ajouter un lien vers oeuvre + image 
                        <li className="oeuvreInformation">{oeuvre.fields.denomination}</li>
                    ))}
                </ul>
            </div>

            <br />
        </>
    );
}

export default PageMusee;