import Musees from '../services/Musees';
import { useParams } from "react-router-dom";
function Page1() {

    const { userId } = useParams();

    return (
        <>
            <h1>user id : {userId}</h1>
            <Musees />
        </>
    )
}
export default Page1