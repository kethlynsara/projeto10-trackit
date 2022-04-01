import { useContext, useEffect } from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { useState } from "react/cjs/react.development";

function Habitos() {
  const [status, setStatus] = useState(0);
  const [enable, setEnable] = useState(false);
  const [semana, setSemana] = useState([]);
  const [name, setName] = useState("");
  const [etapa, setEtapa] = useState(false);
  const [lista, setLista] = useState([]);
  const { token, setToken, img, setImg } = useContext(UserContext);
  console.log(img);
  console.log("habitos", token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  function listarHabitos() {
    const promise = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        config
      );
      promise.then((response) => {
        const { data } = response;
        setLista(data);
        console.log(data);
      });
      promise.catch((err) => console.log(err.response));
  }

  useEffect(() => listarHabitos(), [status]);

  function enviarHabito() {
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
        name,
        days: semana
    }, config);
      promise.then((response) => {
        const { data } = response;
        console.log("post", data);
        setEtapa(false);
        setName("");
        setSemana([]);
        setEnable(false);
        setStatus(status + 1);
      });
      promise.catch((err) => {
          console.log(err.response);
          alert("Não foi possível criar o seu hábito! Tente novamente)");
          setEnable(false);
        });
  }

  let aux = [...semana];
  function criarHabito() {
    if (etapa) {
      return (
        <Cadastro>
          <input type="text" placeholder="nome do hábito" disabled={enable} value={name} onChange={(e) => setName(e.target.value)}></input>
          <div className="dias">
            <button onClick={() => {
                setSemana([...aux, 0])
                }} disabled={enable} >D</button>
            <button onClick={() => {
                setSemana([...aux, 1])
                }} disabled={enable} >S</button>
            <button onClick={() => {
                setSemana([...aux, 2])
                }} disabled={enable} >T</button>
            <button onClick={() => {
                setSemana([...aux, 3])
                }} disabled={enable} >Q</button>
            <button onClick={() => {
                setSemana([...aux, 4])
                }} disabled={enable}>Q</button>
            <button onClick={() => {
                setSemana([...aux, 5])
                }} disabled={enable}>S</button>
            <button onClick={() => {
                setSemana([...aux, 6])
                }} disabled={enable}>S</button>
          </div>
          <div className="salvar-cancelar">
            <button className="cancelar" disabled={enable} onClick={() => setEtapa(false)}>Cancelar</button>
            <button className="salvar" disabled={enable} onClick={() => {
                enviarHabito();
                setEnable(true);
                }}>Salvar</button>
          </div>
        </Cadastro>
      );
    }
    return "";
  }

  function deletar(idHabito) {
      const confirmacao = window.confirm("Tem certeza que deseja apagar o hábito?");
      if (confirmacao) {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}`, config);
        promise.then(() => setStatus(status + 1));
        promise.catch(() => alert("Não foi possível deletar o seu hábito! Tente novamente."))
      }
  }

  const criacaoHabitos = criarHabito();
  console.log("input", name)
  console.log(semana)

  if (lista.length === 0) {
    return (
      <>
        <Header />
        <P>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </P>
        <Footer />
      </>
    );
  } else {
    return (
      <Contanier>
        <Header usuario={img} />
        <Descricao>
          <h2>Meus hábitos</h2>
          <button
            onClick={() => {
              setEtapa(true);
              criarHabito();
            }}
          >
            +
          </button>
        </Descricao>
        {criacaoHabitos}
        {lista.map((item) => {
          return (
            <Habito key={item.name}>
              <ion-icon name="trash-outline" onClick={() => deletar(item.id)}></ion-icon>
              <p>{item.name}</p>
              <div className="dias">
                <button>D</button>
                <button>S</button>
                <button>T</button>
                <button>Q</button>
                <button>Q</button>
                <button>S</button>
                <button>S</button>
              </div>
            </Habito>
          );
        })}

        <Footer />
      </Contanier>
    );
  }
}

const P = styled.p`
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  position: relative;
  top: 13px;
  left: 15px;
  bottom: 8px;
  color: #666666;
  font-family: "Lexend Deca";
  padding-left: 17px;
  padding-right: 18px;
  margin-top: 70px;
`;

const Habito = styled.div`
  width: 340px;
  height: 91px;
  border-radius: 5px;
  background-color: #e5e5e5;
  margin-top: 20px;
  position: relative;
  margin-bottom: 10px;

  ion-icon {
    position: absolute;
    right: 10px;
    top: 11px;
    color: #666666;
  }

  .dias {
    position: relative;
    bottom: 15px;
    left: 14px;
    top: -42px;
  }

  .dias button {
    width: 30px;
    height: 30px;
    margin-right: 4px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    color: #dbdbdb;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    border: none;
  }
`;

const Contanier = styled.div`
  font-family: "Lexend Deca";
  padding-left: 17px;
  padding-right: 18px;
  margin-bottom: 100px;

  body {
    background-color: #e5e5e5;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    width: 338px;
    height: 74px;
    padding-top: 13px;
    padding-left: 15px;
  }
`;

const Descricao = styled.div`
  margin-top: 98px;
  display: flex;
  justify-content: space-between;

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }

  button {
    width: 40px;
    height: 35px;
    background-color: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    font-weight: bold;
    font-size: 26.976px;
    line-height: 34px;
    text-align: center;
    color: #ffffff;
  }
`;

const Cadastro = styled.div`
  width: 340px;
  height: 180px;
  border-radius: 5px;
  /* background-color: salmon; */
  background-color: #e5e5e5;
  padding: 18px 18px 15px 19px;
  margin-top: 20px;

  input {
    width: 303px;
    height: 45px;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 10px;
    padding-left: 11px;
    border: 1px #d4d4d4;
  }

  input::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #dbdbdb;
  }

  .dias button {
    width: 30px;
    height: 30px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-right: 4px;
    border: none;
  }

  .salvar-cancelar {
    margin-top: 50px;
    margin-left: 140px;
  }

  .salvar {
    width: 84px;
    height: 35px;
    background: #52b6ff;
    border-radius: 4.63636px;
    border: none;
    margin-left: 23px;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }

  .cancelar {
    width: 69px;
    height: 20px;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52b6ff;
    border: none;
  }
`;

export default Habitos;
