import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { useState } from "react";
import axios from "axios";

function Cadastro() {
    const [inputOn, setInputOn] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const navigate = useNavigate();
    
    function cadastrar() {
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {
            email,
            name: nome,
            image: foto,
            password: senha
        });
        promise.then((response) => {
            const {data} = response;
            console.log(data);
            navigate("/");
        });
        promise.catch(err => {
            alert("Tente se cadastrar novamente");
            setInputOn(false);
            setNome("");
            setSenha("");
            setEmail("");
            setFoto("");
            console.log(err.response.data)
        });
    }

    return (
        <Contanier>
            <img src={logo} alt="logo" />
            <h1>TrackIt</h1>
            <form >
                <input type="email" 
                       placeholder="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} 
                       disabled={inputOn}></input>
                <input type="password"
                       placeholder="senha"
                       value={senha}
                       onChange={(e) => setSenha(e.target.value)}
                       disabled={inputOn}></input>
                <input type="text"
                       placeholder="nome"
                       value={nome}
                       onChange={(e) => setNome(e.target.value)}
                       disabled={inputOn}></input>
                <input type="url" 
                       placeholder="foto"
                       value={foto}
                       onChange={(e) => setFoto(e.target.value)}
                       disabled={inputOn}></input>
                <button type="button" onClick={() => {
                    setInputOn(true);
                    cadastrar();
                    }}>Cadastrar</button>
                <StyledLink to="/"><p>Já tem uma conta? Faça login!</p></StyledLink>
            </form>
        </Contanier>
    )
}

const Contanier = styled.div`
    font-family: 'Lexend Deca', sans-serif;    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        margin-top: 68px;
        width: 170px;
        height: 100px;
    }

    h1 {
        font-family: 'Playball', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        color: #126BA5;
    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 32.62px;
    }

    input {
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 6px;
        padding-left: 11px;
    }

    input::placeholder {
        font-style: normal;
        color: #DBDBDB;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
    }

    button {
        width: 303px;
        height: 45px;
        background-color: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
        margin-bottom: 25px;
    }

    p {
        margin-left: 15px;
    }
`;

const StyledLink  = styled(Link)`
    color: #52B6FF;
`;

export default Cadastro;