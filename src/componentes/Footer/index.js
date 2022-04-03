import { Link } from "react-router-dom";
import styled from "styled-components";

import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import UserContext from "../../contexts/UserContext";
import { useContext } from "react/cjs/react.development";


function Footer() {
    const {percentage} = useContext(UserContext);
    return (
        <>
            <Contanier>
                <StyledLink to="/habitos"><button className="habitos">Hábitos</button></StyledLink>
                <StyledLink to="/historico"><button className="historico">Histórico</button></StyledLink>
            </Contanier>
            <Div>
                <CircularProgressbar
                    value={percentage}
                    text="Hoje"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent",
                    })}
                />
            </Div>
        </>
    )
}

const StyledLink = styled(Link)`
    margin-bottom: 0px;
`;

const Div = styled.div`
    position: fixed;
    width: 91px;
    height: 91px;
    bottom: 6px;
    left: 142px;
`;

const Contanier = styled.div`
    height: 50px;
    font-family: 'Lexend Deca';
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 22px 31px 0px 36px;
   
    background-color: #E5E5E5;
    
    button {
        width: 68px;
        height: 22px;
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
        border: none;
        background-color: #FFFFFF;
    }

`;
export default Footer;