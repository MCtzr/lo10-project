import '../views.css';
import ComptePanel from "./ComptePanel";
import { useContext } from 'react';
import CredentialGlobal from '../../components/Credentials/CredentialGlobal';

function Header() {

  const { userId } = useContext(CredentialGlobal);

  return (
    <>
      <div className="banner">
        <h1 className="title">ArtMatch&nbsp;</h1>
        <ComptePanel userId={userId} />
      </div>
    </>
  )
}

export default Header;