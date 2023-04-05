import data from './liste-musees.json';

function Musees() {
  const listemusees = data;

  return (
    <div>
      <ul>
        {listemusees.map((musees) => (
          <li key={musees.identifiant_museofile}>
            <p>{musees.nom_officiel_du_musee}</p>
            <p>{musees.adresse}</p>
            <p>{musees.code_postal} {musees.commune}</p>
            <p>Téléphone : {musees.telephone}</p>
            <p>Site web : <a href={musees.url}>{musees.url}</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Musees;
