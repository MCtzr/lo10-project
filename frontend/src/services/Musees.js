import './Musees.css';
import React, { useState, useEffect } from 'react';
import {BsFillTelephoneFill} from "react-icons/bs";
import {GoLocation} from "react-icons/go";


function Musees(props) {
  //useEffect(() => {
  //  setList(props.data.slice(0, visibleCount));
  //}, [visibleCount]);

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

  const imageExists = (url) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalHeight !== 0;
  };

  return (
    <div>
      {props.data.map((musee) => {
        const imageUrl = `https://s3.eu-west-3.amazonaws.com/pop-phototeque/museo/${musee.identifiant_museofile}/museofile${musee.identifiant_museofile}.jpg`;
        if (imageExists(imageUrl)) {
          return (
            <div className="musees" key={musee.identifiant_museofile}>
              <img src={imageUrl} alt={musee.identifiant_museofile}></img>
              <h2>{musee.nom_officiel_du_musee}</h2>
              <p>{musee.adresse}</p>
              <p className="adresse">{musee.code_postal} {musee.commune}</p>
              <p className="tel"><i className="fa-solid fa-phone"></i> Téléphone : {musee.telephone}</p>
              <p className="url">Site web : <a href={musee.url}>{musee.url}</a></p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

  

export default Musees;
