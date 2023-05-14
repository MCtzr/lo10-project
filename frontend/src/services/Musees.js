import data from './liste-musees.json';
import './Musees.css';
import React, { useState, useEffect } from 'react';
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import noImage from '../assets/noImage.jpg';
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";

function Musees() {
  //const listemusees = data;
  const [listemusees, setList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { userId } = useParams();

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
    if (windowBottom >= docHeight - 700 && !loading) {
      setLoading(true);
      setVisibleCount((prevCount) => prevCount + 10);
      setTimeout(() => setLoading(false), 1000);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function handleImageLoadError(index) {
    const newMusees = [...listemusees];
    newMusees[index].imageLoaded = false;
    setList(newMusees);
  }

  function goOnMuseum(museeId) {
    history.push(`/artMatch/${userId}/musees/${museeId}`);
  }

  return (
    <div onScroll={handleScroll}>

      {listemusees.map((musees, index) => (
        <div className="divMusees" key={musees.identifiant_museofile} onClick={() => goOnMuseum(musees.identifiant_museofile)}>
          <div className="divImages">
            {musees.imageLoaded !== false ? (
              <img className="images" src={`https://s3.eu-west-3.amazonaws.com/pop-phototeque/museo/${musees.identifiant_museofile}/museofile${musees.identifiant_museofile}.jpg`} alt={`${musees.identifiant_museofile}`} loading="lazy" onError={() => handleImageLoadError(index)}></img>
            ) : (
              <img className="images" src={noImage} alt="noImage" loading="lazy"></img>
            )}
          </div>

          <h2>{musees.nom_officiel_du_musee}</h2>
          <p className="adresse" ><MdLocationOn /> : {musees.adresse}, {musees.commune}, {musees.code_postal}</p>
          <p className="tel"><BsFillTelephoneFill /> : {musees.telephone}</p>
          <p className="url"><TbWorld /> : <a href={musees.url}>{musees.url}</a></p>

        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};



export default Musees;
