import '../views.css';
import { useParams } from "react-router-dom";
import ComptePanel from "./ComptePanel";

function Header() {

  const { userId } = useParams();

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