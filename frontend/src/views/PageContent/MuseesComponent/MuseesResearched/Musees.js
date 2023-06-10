import '../../../Musees.css';
import React, { useState, useEffect, useContext } from 'react';
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import noImage from '../../../../assets/noImage.jpg';
import { useHistory } from 'react-router-dom'
import CredentialGlobal from '../../../../components/Credentials/CredentialGlobal';

function Musees(props) {
  const [listeMusees, setList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { token } = useContext(CredentialGlobal);

  useEffect(() => {
    setList(props.data.slice(0, visibleCount));
  }, [visibleCount, props.data]);

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

  function goOnMuseum(museeId) {
    history.push(`/artMatch/musees/${museeId}`);
  }

  function handleImageLoadError(index) {
    const newMusees = [...listeMusees];
    newMusees[index].imageLoaded = false;
    setList(newMusees);
  }

  return (
    <div>
      <div onScroll={handleScroll}>
        {listeMusees.map((musee, index) => (
          <div className="divMusees" key={musee.identifiant_museofile} onClick={() => goOnMuseum(musee.identifiant_museofile)}>
            <div className="divImages">
              {musee.imageLoaded !== false ? (
                <img className="images" src={`https://s3.eu-west-3.amazonaws.com/pop-phototeque/museo/${musee.identifiant_museofile}/museofile${musee.identifiant_museofile}.jpg`} alt={`${musee.identifiant_museofile}`} loading="lazy" onError={() => handleImageLoadError(index)}></img>
              ) : (
                <img className="images" src={noImage} alt="noImage" loading="lazy"></img>
              )}
            </div>
            <h2 className="secondTitle">{musee.nom_officiel_du_musee}</h2>
            <p className="adresse" ><MdLocationOn /> {musee.adresse ? musee.adresse + "," : ""} {musee.commune ? musee.commune + "," : ""} {musee.code_postal ? musee.code_postal + "," : ""}</p>
            <p className="tel"><BsFillTelephoneFill /> {musee.telephone}</p>
            <p className="url"><TbWorld /> <a href={musee.url}>{musee.url}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};



export default Musees;
