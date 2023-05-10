import { useParams } from "react-router-dom";

function Page2() {

    const { userId } = useParams();

    return (
        <>
            <h1>user id : {userId}</h1>
            <p>Je suis la page2</p>
        </>
    )
}
export default Page2