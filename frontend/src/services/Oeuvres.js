import React, { useState, useEffect } from 'react';

function Oeuvres() {
  const [oeuvres, setOeuvres] = useState([]);

  useEffect(() => {
    fetch("https://data.culture.gouv.fr/api/records/1.0/search/?dataset=base-joconde-extrait&rows=10000")
      .then(response => response.json())
      .then(data => setOeuvres(data.records))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {oeuvres.map((oeuvre) => (
        <figure key={oeuvre.id}>
          <img src={oeuvre.fields.image} alt={oeuvre.fields.titre} />
        </figure>
      ))}
    </div>
  );
}

export default Oeuvres;
