import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

function Footer() {
    const percentage = 30;
    return (
        <Contanier>
            <Link to="/habitos"><button>Hábitos</button></Link>
            <div>
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
            </div>
            <Link to="/historico"><button>Histórico</button></Link>
        </Contanier>
    )
}

const Contanier = styled.div`
    font-family: 'Lexend Deca';
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-evenly;
    padding: 22px 31px 26px 36px;
    background-color: #FFFFFF;
    
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

    div {
        width: 91px;
        height: 91px;
    }
`;
export default Footer;