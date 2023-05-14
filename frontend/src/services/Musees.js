import './Musees.css';
import React, { useState, useEffect } from 'react';
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import noImage from '../assets/noImage.jpg';
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";

function Musees(props) {
  //const listemusees = data;
  const [listemusees, setList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { userId } = useParams();

  //function handleScroll() {
  //  const windowHeight =
  //     'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
  //   const body = document.body;
  //   const html = document.documentElement;
  //   const docHeight = Math.max(
  //     body.scrollHeight,
  //     body.offsetHeight,
  //     html.clientHeight,
  //     html.scrollHeight,
  //     html.offsetHeight
  //   );
  //   const windowBottom = windowHeight + window.pageYOffset;
  //   if (windowBottom >= docHeight && !loading) {
  //     setLoading(true);
  //     setVisibleCount((prevCount) => prevCount + 10);
  //     setTimeout(() => setLoading(false), 1000);
  //   }
  // }

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
  const imageExists = (url) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalHeight !== 0;
  };

  function goOnMuseum(museeId) {
    history.push(`/artMatch/${userId}/musees/${museeId}`);
  }

  return (
    <div>
      {props.data.map((musee) => {
        const imageUrl = `https://s3.eu-west-3.amazonaws.com/pop-phototeque/museo/${musee.identifiant_museofile}/museofile${musee.identifiant_museofile}.jpg`;
        if (imageExists(imageUrl)) {
          return (
            <div className="musees divMusees" key={musee.identifiant_museofile} onClick={() => goOnMuseum(musee.identifiant_museofile)}>
              <div className="divImages">
                <img src={imageUrl} alt={musee.identifiant_museofile}></img>
              </div>
              <h2>{musee.nom_officiel_du_musee}</h2>
              <p>{musee.adresse}</p>
              <p className="adresse" ><MdLocationOn /> : {musee.adresse}, {musee.commune}, {musee.code_postal}</p>
              <p className="tel"><BsFillTelephoneFill /> : {musee.telephone}</p>
              <p className="url"><TbWorld /> : <a href={musee.url}>{musee.url}</a></p>
            </div>
          );
        }
        else {
          return (
            <div className="musees" key={musee.identifiant_museofile}>
              <div className="divImages">
                <img src={noImage} alt={"noImage"}></img>
              </div>
              <h2>{musee.nom_officiel_du_musee}</h2>
              <p>{musee.adresse}</p>
              <p className="adresse" ><MdLocationOn /> : {musee.adresse}, {musee.commune}, {musee.code_postal}</p>
              <p className="tel"><BsFillTelephoneFill /> : {musee.telephone}</p>
              <p className="url"><TbWorld /> : <a href={musee.url}>{musee.url}</a></p>
            </div>
          );
        }
      })}
    </div>
  );
};



export default Musees;
