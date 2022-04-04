import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import logo from "../../assets/img/logo.png";
import { useState } from "react";
import axios from "axios";

function Cadastro() {
  const [inputOn, setInputOn] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [loading, setLoading] = useState(false);

  function cadastrar(event) {
    event.preventDefault();
    setLoading(true);

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      {
        email,
        name: nome,
        image: foto,
        password: senha,
      }
    );
    promise.then((response) => {
      const { data } = response;
      setLoading(false);
    });
    promise.catch((err) => {
      alert("Tente se cadastrar novamente");
      setInputOn(false);
      setNome("");
      setSenha("");
      setEmail("");
      setFoto("");
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
        <input
          type="text"
          placeholder="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={inputOn}
        ></input>
        <input
          type="url"
          placeholder="foto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          disabled={inputOn}
        ></input>
        <StyledLink to="/">
          <button
            type="button"
            onClick={() => {
              setInputOn(true);
              cadastrar();
            }}
          >
            Cadastrar
          </button>
        </StyledLink>
        <StyledLink to="/">
          <p>Já tem uma conta? Faça login!</p>
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
        <input
          type="text"
          placeholder="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={inputOn}
        ></input>
        <input
          type="url"
          placeholder="foto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          disabled={inputOn}
        ></input>
        <StyledLink>
          <DivLoading>
            <ThreeDots color="#FFFFFF" width={50} />
          </DivLoading>
        </StyledLink>
        <StyledLink to="/">
          <p>Já tem uma conta? Faça login!</p>
        </StyledLink>
      </form>
    </Contanier>
  );
}

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

const StyledLink = styled(Link)`
  color: #52b6ff;
`;

export default Cadastro;
