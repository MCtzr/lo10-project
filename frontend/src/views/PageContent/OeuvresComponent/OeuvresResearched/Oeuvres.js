import React, { useState, useEffect } from 'react';
import '../../../oeuvres.css';
import { MdOutlineFavorite } from "react-icons/md";
import { ImCross } from "react-icons/im";

function Oeuvres() {
  const [oeuvres, setOeuvres] = useState([]);
  const [index, setCurrentOeuvreIndex] = useState(0);

  const incrementLoveHate = () => {
    const getRandomIndex = () => {
      const maxIndex = 999;
      let randomIndex = index;

      while (randomIndex === index) {
        randomIndex = Math.floor(Math.random() * (maxIndex + 1));
      }

      return randomIndex;
    };

    setCurrentOeuvreIndex(getRandomIndex());
  };

  useEffect(() => {
    fetch("https://data.culture.gouv.fr/api/records/1.0/search/?dataset=base-joconde-extrait&rows=1000")
      .then(response => response.json())
      .then(data => {
        setOeuvres(data.records);
        incrementLoveHate(); // Appel de la fonction ici
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      {oeuvres.length > 0 && (
        <div key={oeuvres[index].id} className='oeuvreInformation'> 
          <p className="oeuvreTitre">{oeuvres[index].fields.titre || oeuvres[index].fields.denomination 
          ? (oeuvres[index].fields.titre ? oeuvres[index].fields.titre : oeuvres[index].fields.denomination).replace(","," ")
          : "Sans titre"}</p>
          <p>Domaine : {oeuvres[index].fields.domaine ? oeuvres[index].fields.domaine.replace(","," ") : "Aucun"}</p>
          <p>Auteur : {oeuvres[index].fields.auteur ? oeuvres[index].fields.auteur.replace(","," ")  : "Aucun"}</p>
          <ul className='choixBoutonOeuvre'>
            <li>
              <a href={`/artMatch/musees/${oeuvres[index].fields.code_museofile}`}>
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