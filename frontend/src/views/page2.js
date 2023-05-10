import { useParams } from "react-router-dom";

function Page2() {

    const { userId } = useParams();

    return (
        <>
            <p>Je suis la page2</p>
        </>
    )
}
export default Page2