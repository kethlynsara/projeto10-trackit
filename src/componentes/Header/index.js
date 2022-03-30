import styled from "styled-components";
import bob from "../../assets/img/bob.png";


function Header() {
    return (
        <Headerbox>
            <h1>TrackIt</h1>
            <img src={bob} alt="bob sponja" />
        </Headerbox>
        
    )
}

const Headerbox = styled.div` 
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
`;

export default Header;