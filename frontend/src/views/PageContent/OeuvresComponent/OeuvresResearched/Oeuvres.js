import React, { useState, useEffect } from 'react';
import '../../../oeuvres.css';

function Oeuvres() {
  const [oeuvres, setOeuvres] = useState([]);
  const [currentOeuvreIndex, setCurrentOeuvreIndex] = useState(0);

  const incrementLoveHate = () => {
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

  useEffect(() => {
    fetch("https://data.culture.gouv.fr/api/records/1.0/search/?dataset=base-joconde-extrait&rows=1000&q=auteur")
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
        <figure key={oeuvres[currentOeuvreIndex].id} className='oeuvreCss'>
          <p>{oeuvres[currentOeuvreIndex].fields.titre}</p>
          <p>{oeuvres[currentOeuvreIndex].fields.domaine}</p>
          <ul className='liste'>
            <li>
              <a className='textStyle' href={`/artMatch/musees/${oeuvres[currentOeuvreIndex].fields.code_museofile}`}>
                j'aime
              </a>
            </li>
            <li>
              <input type='button' onClick={incrementLoveHate} className='textStyle' value="j'aime pas" />
            </li>
          </ul>
        </figure>
      )}
    </>
  );
}

export default Oeuvres;