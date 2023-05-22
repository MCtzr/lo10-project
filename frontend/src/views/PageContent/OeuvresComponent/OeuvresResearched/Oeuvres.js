import React, { useState, useEffect } from 'react';
import '../../../oeuvres.css'
import { BsHeartFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useParams } from "react-router-dom";

function Oeuvres() {
  const [oeuvres, setOeuvres] = useState([]);
  const [loveHate, setLoveHate] = useState(0);
  const { userId } = useParams();

  const incrementLoveHate = () => {
    setLoveHate(prevValue => prevValue + 1);
  };

  useEffect(() => {
    fetch("https://data.culture.gouv.fr/api/records/1.0/search/?dataset=base-joconde-extrait&rows=1000")
      .then(response => response.json())
      .then(data => setOeuvres(data.records))
      .catch(error => console.error(error));
  }, []);

  return ( 
    <>
    {oeuvres.map((oeuvre, index) =>(

      <figure key={oeuvre.id} className='oeuvreCss'>
      <p > {oeuvre.fields.titre} </p>
      <p> {oeuvre.fields.domaine}</p>
      <ul className='liste'>
        <li>
          <a className='textStyle' href={`/artMatch/${userId}/musees/${oeuvre.fields.code_museofile}`}>
              j'aime
          </a>
        </li>
        <li>
          <input type='button' onClick={incrementLoveHate} className='textStyle' value="j'aime pas"/>
            
        </li>
      </ul>

      </figure>
    ))[loveHate]}
    
    </>
    
  )
  
}

export default Oeuvres;
