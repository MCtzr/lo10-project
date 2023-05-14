import { useParams } from "react-router-dom";

function Oeuvre() {

    const { userId } = useParams();

    return (
        <>
            <p>Oeuvres</p>
        </>
    )
}
export default Oeuvre