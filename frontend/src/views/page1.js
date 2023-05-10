import Musees from '../services/Musees';
import { useParams } from "react-router-dom";

function Page1() {

    const { userId } = useParams();

    return (
        <>
            <Musees />
        </>
    )
}
export default Page1