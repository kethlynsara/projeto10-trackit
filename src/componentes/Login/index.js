import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { ThreeDots } from "react-loader-spinner";

import UserContext from "../../contexts/UserContext";

import logo from "../../assets/img/logo.png";

function Login() {
  const { token, setToken, img, setImg } = useContext(UserContext);
  const [inputOn, setInputOn] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function login(event) {
    event.preventDefault();
    setLoading(true);
    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const promise = axios.post(URL, {
      email,
      password: senha,
    });
    promise.then((response) => {
      const { data } = response;
      setInputOn(true);
      setToken(data.token);
      setImg(data.image);
      setLoading(false);
      navigate("/hoje");
    });
    promise.catch((err) => {
      alert("Algo de errado não está certo, try again :(");
      setEmail("");
      setSenha("");
      setInputOn(false);
      setLoading(false);
    });
  }
  return !loading ? (
    <Contanier>
      <img src={logo} alt="logo" />
      <h1>TrackIt</h1>
      <form>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={inputOn}
        ></input>
        <input
          type="password"
          placeholder="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={inputOn}
        ></input>
        <button type="button" onClick={login} disabled={inputOn}>
          Entrar
        </button>
        <StyledLink to="/cadastro">
          <p>Não tem uma conta? Cadastre-se!</p>
        </StyledLink>
      </form>
    </Contanier>
  ) : (
    <Contanier>
      <img src={logo} alt="logo" />
      <h1>TrackIt</h1>
      <form>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={inputOn}
        ></input>
        <input
          type="password"
          placeholder="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={inputOn}
        ></input>
        <DivLoading>
          <ThreeDots color="#FFFFFF" width={50} />
        </DivLoading>
        <StyledLink to="/cadastro">
          <p>Não tem uma conta? Cadastre-se!</p>
        </StyledLink>
      </form>
    </Contanier>
  );
}

const Contanier = styled.div`
  font-family: "Lexend Deca", sans-serif;
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
    font-family: "Playball", cursive;
    font-style: normal;
    font-weight: 400;
    font-size: 68.982px;
    line-height: 86px;
    color: #126ba5;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 32.62px;
  }

  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 6px;
    padding-left: 11px;
  }

  input::placeholder {
    font-style: normal;
    color: #dbdbdb;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
  }

  button {
    width: 303px;
    height: 45px;
    background-color: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 25px;
  }

  p {
    margin-left: 15px;
  }
`;

const DivLoading = styled.div`
  width: 303px;
  height: 45px;
  background-color: #52b6ff;
  border-radius: 4.63636px;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 20.976px;
  line-height: 26px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #52b6ff;
`;

export default Login;
