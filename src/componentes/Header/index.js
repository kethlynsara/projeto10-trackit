import { useContext } from "react/cjs/react.development";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
// import bob from "../../assets/img/bob.png";


function Header({usuario}) {
    const {img} = useContext(UserContext);
    return (
        <Headerbox>
            <h1>TrackIt</h1>
            <img src={img} alt="foto usuario" />
        </Headerbox>
        
    )
}

const Headerbox = styled.div` 
    z-index: 1;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 11px 18px;

    h1 {
        font-family: 'Playball', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
    }
`;

export default Header;