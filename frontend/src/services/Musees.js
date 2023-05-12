import data from './liste-musees.json';
import './Musees.css';
import React, { useState, useEffect } from 'react';
import {BsFillTelephoneFill} from "react-icons/bs";
import {GoLocation} from "react-icons/go";


function Musees() {
  //const listemusees = data;
  const [listemusees, setList] = useState(data);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setList(data.slice(0, visibleCount));
  }, [visibleCount]);

  function handleScroll() {
    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && !loading) {
      setLoading(true);
      setVisibleCount((prevCount) => prevCount + 10);
      setTimeout(() => setLoading(false), 1000);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    });

  return (
    <div onScroll={handleScroll}>
      
      {listemusees.map((musees) => (
        <div className="divMusees" key={musees.identifiant_museofile}>
          <img className="divImages" src={`https://s3.eu-west-3.amazonaws.com/pop-phototeque/museo/${musees.identifiant_museofile}/museofile${musees.identifiant_museofile}.jpg`} alt={`${musees.identifiant_museofile}` } loading="lazy"></img>
          <h2>{musees.nom_officiel_du_musee}</h2>
          <p>{musees.adresse}</p>
          <p className= "adresse" ><GoLocation /> {musees.code_postal} {musees.commune}</p>
          <p className="tel"><BsFillTelephoneFill /> Téléphone : {musees.telephone}</p>
          <p className="url">Site web : <a href={musees.url}>{musees.url}</a></p>
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

  

export default Musees;
