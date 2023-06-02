import React, { useState, useEffect } from 'react';
import '../../../oeuvres.css';
import { MdOutlineFavorite } from "react-icons/md";
import { ImCross } from "react-icons/im";
import '../../../Musees.css';
import chargementImage from '../../../../assets/chargementImage.gif';

function Oeuvres() {
  const [oeuvres, setOeuvres] = useState([]);
  const [currentOeuvreIndex, setCurrentOeuvreIndex] = useState(0);
  const [uriImage, setUriImage] = useState("");
  const [uriSite, setUriSite] = useState("");
  const [imageHeight, setImageHeight] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const [previousIndex, setPreviousIndex] = useState(0);

  const DELAY_TIME = 100;

  useEffect(() => {
    fetch("https://data.culture.gouv.fr/api/records/1.0/search/?dataset=base-joconde-extrait&q=&facet=domaine&facet=departement&facet=ville&rows=1000&refine.domaine=peinture")
      .then(response => response.json())
      .then(data => {
        setOeuvres(data.records);
        incrementLoveHate(); // Appel de la fonction ici
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {

    const apiKey = '1b59ef239fcbba66f33bf75b0774a7e1e810640af90c83fda724fc517800f2ad';

    let timeoutId = null;

    const fetchData = () => {
      const param = "inventory_number:" + oeuvres[currentOeuvreIndex].fields.numero_inventaire
      const url = 'https://api.art.rmngp.fr/v1/works.json?q=' + param.replace(/\s/g, "");

      fetch(url, {
        headers: {
          'ApiKey': apiKey
        }
      })
        .then(response => response.json())
        .then(data => {
          // Faites quelque chose avec les données renvoyées
          if (data.hits.hits.length !== 0) {
            if (data.hits.hits[0]._source.inventory_number && (data.hits.hits[0]._source.inventory_number.toLowerCase().includes(oeuvres[currentOeuvreIndex].fields.numero_inventaire.toLowerCase().replace(/\s/g, "")) || oeuvres[currentOeuvreIndex].fields.numero_inventaire.toLowerCase().replace(/\s/g, "").includes(data.hits.hits[0]._source.inventory_number.toLowerCase()))) {
              setUriImage(data.hits.hits[0]._source.images[0].urls.original)
              setUriSite(data.hits.hits[0]._source.images[0].permalink)
            }
            else {
              return incrementLoveHate();
            }
          }
          else {
            return incrementLoveHate();
          }
        })
        .catch(error => {
          // Gérez les erreurs
          console.error('Erreur lors de la requête:', error);
        });
    }

    // Vérifier si currentOeuvreIndex a changé
    if (currentOeuvreIndex !== previousIndex) {
      // Annuler le délai précédent s'il existe
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Définir un nouveau délai pour exécuter fetchData après DELAY_TIME
      const newTimeoutId = setTimeout(() => {
        fetchData();
        setPreviousIndex(currentOeuvreIndex);
      }, DELAY_TIME);

      // Stocker le nouvel identifiant de délai
      setTimeoutId(newTimeoutId);
    }

    // Nettoyage : annulez le délai de temporisation si le composant est démonté avant son déclenchement
    return () => {
      clearTimeout(timeoutId);
    };

  }, [currentOeuvreIndex]);

  const incrementLoveHate = () => {
    setUriImage("");

    const getRandomIndex = () => {
      const maxIndex = 999;
      let randomIndex = currentOeuvreIndex;

      while (randomIndex === currentOeuvreIndex) {
        randomIndex = Math.floor(Math.random() * (maxIndex + 1));
      }

      return randomIndex;
    };

    setCurrentOeuvreIndex(getRandomIndex());
  };

  return (
    <>
      {oeuvres.length > 0 && (
        <div key={oeuvres[currentOeuvreIndex].id} className='oeuvreInformation'>

          {uriImage !== "" ? (
            <img src={uriImage} alt={oeuvres[currentOeuvreIndex].fields.titre} onError={incrementLoveHate} style={{ "height": "300px" }} />
          ) : (
            <img src={chargementImage} alt={oeuvres[currentOeuvreIndex].fields.titre} style={{ "height": "300px" }} />
          )}

          <p className="oeuvreTitre">{oeuvres[currentOeuvreIndex].fields.titre || oeuvres[currentOeuvreIndex].fields.denomination
            ? (oeuvres[currentOeuvreIndex].fields.titre ? oeuvres[currentOeuvreIndex].fields.titre : oeuvres[currentOeuvreIndex].fields.denomination).replace(",", " ")
            : "Sans titre"}</p>
          <p>Domaine : {oeuvres[currentOeuvreIndex].fields.domaine ? oeuvres[currentOeuvreIndex].fields.domaine.replace(",", " ") : "Aucun"}</p>
          <p>Auteur : {oeuvres[currentOeuvreIndex].fields.auteur ? oeuvres[currentOeuvreIndex].fields.auteur.replace(",", " ") : "Aucun"}</p>
          <p>Site Associé : <a href={uriSite}>{uriSite}</a></p>

          <ul className='choixBoutonOeuvre'>
            <li>
              <a href={`/artMatch/musees/${oeuvres[currentOeuvreIndex].fields.code_museofile}`}>
                <MdOutlineFavorite className="heart-icon" />
              </a>
            </li>
            <li>
              <a onClick={incrementLoveHate}>
                <ImCross className="cross-icon" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Oeuvres;