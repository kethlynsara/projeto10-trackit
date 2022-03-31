import { useContext } from "react";

import Header from "../Header";
import Footer from "../Footer";
import UserContext from "../../contexts/UserContext";

function Hoje() {
    const {token, setToken, img, setImg} = useContext(UserContext);
    console.log(token);
    console.log("img", img);
    return (
        <>
        <Header usuario={img}/>
        <Footer />
        </>
    )
}

export default Hoje;