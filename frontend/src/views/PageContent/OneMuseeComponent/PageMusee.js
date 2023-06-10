import { useParams } from "react-router-dom";
import data from '../../../services/liste-musees.json';
import noImage from '../../../assets/noImage.jpg';
import React, { useState, useEffect, useRef, useContext } from 'react';
import './PageMusee.css';
import L from 'leaflet';
import CredentialGlobal from '../../../components/Credentials/CredentialGlobal';
import chargementImage from '../../../assets/chargementImage.gif';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import ExpressService from '../../../services/expressService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PageMusee() {
    const { musee } = useParams();
    const [imageLoaded, setImageLoaded] = useState(true);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]); // Référence aux marqueurs
    const { userId } = useContext(CredentialGlobal);
    const expressService = ExpressService();

    const [isLoading, setIsLoading] = useState(true);

    var [lat, setLat] = useState(0);
    var [lng, setLng] = useState(0);

    const result = data.find((item) => item.identifiant_museofile === musee);
    const [oeuvres, setOeuvres] = useState([]);

    useEffect(() => {

        setIsLoading(true);

        const codeMudeofile = musee;
        const url = `https://data.culture.gouv.fr/api/records/1.0/search/?dataset=base-joconde-extrait&rows=50&q=${codeMudeofile}`;

        const getArtData = (elm) => {
            const param = "inventory_number:" + elm.fields.numero_inventaire;
            const apiUrl = 'https://api.art.rmngp.fr/v1/works.json?q=' + param.replace(/\s/g, "");
            const apiKey = '1b59ef239fcbba66f33bf75b0774a7e1e810640af90c83fda724fc517800f2ad';

            return fetch(apiUrl, {
                headers: {
                    'ApiKey': apiKey
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.hits.hits.length !== 0) {
                        if (data.hits.hits[0]._source.inventory_number && (data.hits.hits[0]._source.inventory_number.toLowerCase().includes(elm.fields.numero_inventaire.toLowerCase().replace(/\s/g, "")) || elm.fields.numero_inventaire.toLowerCase().replace(/\s/g, "").includes(data.hits.hits[0]._source.inventory_number.toLowerCase()))) {
                            elm["imageURL"] = data.hits.hits[0]._source.images[0].urls.original;
                            elm["siteURL"] = data.hits.hits[0]._source.images[0].permalink;
                            return elm;
                        }
                    }
                    return null;
                })
                .catch(error => {
                    console.error('Erreur lors de la requête:', error);
                    return null;
                });
        };

        getAccountInfos();

        fetch(url)
            .then(response => response.json())
            .then(async dataOeuvres => {
                const updatedOeuvres = [];
                for (let i = 0; i < dataOeuvres.records.length; i++) {
                    if (updatedOeuvres.length === 5) {
                        break; // Sortir de la boucle si la taille atteint 5
                    }
                    const elm = dataOeuvres.records[i];
                    const result = await getArtData(elm);

                    if (result !== null) {
                        updatedOeuvres.push(result);
                    }
                }
                setOeuvres(updatedOeuvres);
                setIsLoading(false);
            })
            .catch(error => console.error(error));


    }, []);

    const getAccountInfos = async () => {
        const value = await expressService.getAccountInfos(userId);
        console.log(value)
        if (value.lat !== null && value.lng !== null && value.lat !== "null" && value.lng !== "null") {
            setLat(value.lat);
            setLng(value.lng);
        }
        else if (value.lat === "null" && value.lng === "null") {
            toast.warning("Enter valid address to get it and an itinerary on the map")
        }
        if (value.message) {
            toast.warning("Connect yourself to get your address and an itinerary on the map")
        }
    }

    function handleImageLoadError() {
        setImageLoaded(false);
    }

    useEffect(() => {

        console.log(lat)

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

                // Ajoutez le contrôle de routage à la carte
                const routingControl = L.Routing.control({
                    waypoints: [
                        L.latLng(lat, lng), // Coordonnées du premier marqueur
                        L.latLng(result.latitude, result.longitude)  // Coordonnées du deuxième marqueur
                    ],
                }).addTo(mapRef.current);

                routingControl.hide();

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
                <p className="oneInfo">{result.url ? "Site web : " : ""}<a href={result.url.startsWith('http://') || result.url.startsWith('https://') ? result.url : `https://${result.url}`} target="_blank" rel="noopener noreferrer">{result.url}</a></p>
                <p>&nbsp;</p>
                <h3>Oeuvres</h3>
                {isLoading ? (
                    <img src={chargementImage} alt={"Loading"} width="600px" />
                ) : (
                    <div className="oeuvresContainer">
                        {oeuvres.slice(0, 5).map((oeuvre) => (

                            <div className="oeuvresInformation">
                                <a href={oeuvre.siteURL} target="_blank" rel="noopener noreferrer">
                                    <img src={oeuvre.imageURL} alt={oeuvre.fields.titre} />
                                    <p>{oeuvre.fields.titre}</p>
                                </a>
                            </div>

                        ))}
                    </div>
                )}
            </div>

            <br />
        </>
    );
}

export default PageMusee;