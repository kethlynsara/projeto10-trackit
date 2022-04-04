import { useContext, useEffect } from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { useState } from "react/cjs/react.development";

function Habitos() {
  const [domingo, setDomingo] = useState(false);
  const [segunda, setSegunda] = useState(false);
  const [terca, setTerca] = useState(false);
  const [quarta, setQuarta] = useState(false);
  const [quinta, setQuinta] = useState(false);
  const [sexta, setSexta] = useState(false);
  const [sabado, setSabado] = useState(false);

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
    },
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
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      {
        name,
        days: semana,
      },
      config
    );
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
          <input
            type="text"
            placeholder="nome do hábito"
            disabled={enable}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <div className="dias">
            <Domingo
              background={domingo ? "#CFCFCF" : "#ffffff"}
              color={domingo ? "#ffffff" : "#CFCFCF"}
              onClick={() => {
                setDomingo(!domingo);
                let index = aux.indexOf(0);
                if (!domingo) {
                  setSemana([...aux, 0]);
                } else if (index > -1) {
                  aux.splice(index, 1);
                  setSemana(aux);
                }
              }}
              disabled={enable}
            >
              D
            </Domingo>
            <Segunda
              background={segunda ? "#CFCFCF" : "#ffffff"}
              color={segunda ? "#ffffff" : "#CFCFCF"}
              onClick={() => {
                setSegunda(!segunda);
                let index = aux.indexOf(1);

                if (!segunda) {
                  setSemana([...aux, 1]);
                } else if (index > -1) {
                  aux.splice(index, 1);
                  setSemana(aux);
                }
              }}
              disabled={enable}
            >
              S
            </Segunda>
            <Terca
              background={terca ? "#CFCFCF" : "#ffffff"}
              color={terca ? "#ffffff" : "#CFCFCF"}
              onClick={() => {
                setTerca(!terca);
                let index = aux.indexOf(2);
                if (!terca) {
                  setSemana([...aux, 2]);
                } else if (index > -1) {
                  aux.splice(index, 1);
                  setSemana(aux);
                }
              }}
              disabled={enable}
            >
              T
            </Terca>
            <Quarta
              background={quarta ? "#CFCFCF" : "#ffffff"}
              color={quarta ? "#ffffff" : "#CFCFCF"}
              onClick={() => {
                setQuarta(!quarta);
                let index = aux.indexOf(3);
                if (!quarta) {
                  setSemana([...aux, 3]);
                } else if (index > -1) {
                  aux.splice(index, 1);
                  setSemana(aux);
                }
              }}
              disabled={enable}
            >
              Q
            </Quarta>
            <Quinta
              background={quinta ? "#CFCFCF" : "#ffffff"}
              color={quinta ? "#ffffff" : "#CFCFCF"}
              onClick={() => {
                setQuinta(!quinta);
                let index = aux.indexOf(4);
                if (!quinta) {
                  setSemana([...aux, 4]);
                } else if (index > -1) {
                  aux.splice(index, 1);
                  setSemana(aux);
                }
              }}
              disabled={enable}
            >
              Q
            </Quinta>
            <Sexta
              background={sexta ? "#CFCFCF" : "#ffffff"}
              color={sexta ? "#ffffff" : "#CFCFCF"}
              onClick={() => {
                setSexta(!sexta);
                let index = aux.indexOf(5);
                if (!sexta) {
                  setSemana([...aux, 5]);
                } else if (index > -1) {
                  aux.splice(index, 1);
                  setSemana(aux);
                }
              }}
              disabled={enable}
            >
              S
            </Sexta>
            <Sabado
              background={sabado ? "#CFCFCF" : "#ffffff"}
              color={sabado ? "#ffffff" : "#CFCFCF"}
              onClick={() => {
                setSabado(!sabado);
                let index = aux.indexOf(6);
                if (!sabado) {
                  setSemana([...aux, 6]);
                } else if (index > -1) {
                  aux.splice(index, 1);
                  setSemana(aux);
                }
              }}
              disabled={enable}
            >
              S
            </Sabado>
          </div>
          <div className="salvar-cancelar">
            <button
              className="cancelar"
              disabled={enable}
              onClick={() => setEtapa(false)}
            >
              Cancelar
            </button>
            <button
              className="salvar"
              disabled={enable}
              onClick={() => {
                enviarHabito();
                setEnable(true);
              }}
            >
              Salvar
            </button>
          </div>
        </Cadastro>
      );
    }
    return "";
  }

  function deletar(idHabito) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja apagar o hábito?"
    );
    if (confirmacao) {
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}`,
        config
      );
      promise.then(() => setStatus(status + 1));
      promise.catch(() =>
        alert("Não foi possível deletar o seu hábito! Tente novamente.")
      );
    }
  }

  const criacaoHabitos = criarHabito();
  console.log("input", name);
  console.log(semana);

  if (lista.length === 0) {
    return (
      <>
        <Body>
          <Div>
            <Header />
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
            <P>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </P>
            <Footer />
          </Div>
        </Body>
      </>
    );
  } else {
    return (
      <>
        <Body>
          <Contanier>
            <Header />
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
                  <ion-icon
                    name="trash-outline"
                    onClick={() => deletar(item.id)}
                  ></ion-icon>
                  <p>{item.name}</p>
                  <div className="dias">
                    <Domingo
                      background={item.days.includes(0) ? "#CFCFCF" : "#FFFFFF"}
                      color={item.days.includes(0) ? "#FFFFFF" : "#CFCFCF"}
                    >
                      D
                    </Domingo>
                    <Segunda
                      background={item.days.includes(1) ? "#CFCFCF" : "#FFFFFF"}
                      color={item.days.includes(1) ? "#FFFFFF" : "#CFCFCF"}
                    >
                      S
                    </Segunda>
                    <Terca
                      background={item.days.includes(2) ? "#CFCFCF" : "#FFFFFF"}
                      color={item.days.includes(2) ? "#FFFFFF" : "#CFCFCF"}
                    >
                      T
                    </Terca>
                    <Quarta
                      background={item.days.includes(3) ? "#CFCFCF" : "#FFFFFF"}
                      color={item.days.includes(3) ? "#FFFFFF" : "#CFCFCF"}
                    >
                      Q
                    </Quarta>
                    <Quinta
                      background={item.days.includes(4) ? "#CFCFCF" : "#FFFFFF"}
                      color={item.days.includes(4) ? "#FFFFFF" : "#CFCFCF"}
                    >
                      Q
                    </Quinta>
                    <Sexta
                      background={item.days.includes(5) ? "#CFCFCF" : "#FFFFFF"}
                      color={item.days.includes(5) ? "#FFFFFF" : "#CFCFCF"}
                    >
                      S
                    </Sexta>
                    <Sabado
                      background={item.days.includes(6) ? "#CFCFCF" : "#FFFFFF"}
                      color={item.days.includes(6) ? "#FFFFFF" : "#CFCFCF"}
                    >
                      S
                    </Sabado>
                  </div>
                </Habito>
              );
            })}

            <Footer />
          </Contanier>
        </Body>
      </>
    );
  }
}

const Div = styled.div`
  padding-left: 17px;
  padding-right: 20px;
`;

const P = styled.p`
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  position: relative;
  top: 13px;
  bottom: 8px;
  color: #666666;
  font-family: "Lexend Deca";
  margin-top: 28px;
`;

const Habito = styled.div`
  width: 340px;
  height: 91px;
  border-radius: 5px;
  background-color: #ffffff;
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
    display: flex;
  }
`;

const Contanier = styled.div`
  font-family: "Lexend Deca";
  padding-left: 17px;
  padding-right: 18px;
  margin-bottom: 130px;

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
  font-family: "Lexend Deca";

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
  background-color: #ffffff;
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
  }

  input::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #dbdbdb;
  }

  .dias {
    display: flex;
  }

  .dias button {
    width: 30px;
    height: 30px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    margin-right: 4px;
    color: #dbdbdb;
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
  }

  .salvar-cancelar {
    margin-top: 50px;
    margin-left: 160px;
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
    background-color: #ffffff;
  }
`;

const Domingo = styled.div`
  font-family: "Lexend Deca";
  background-color: ${(props) => props.background};
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.color};
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  margin-right: 4px;
  text-align: center;
`;

const Segunda = styled.div`
  font-family: "Lexend Deca";
  background-color: ${(props) => props.background};
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.color};
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  margin-right: 4px;
  text-align: center;
`;

const Terca = styled.div`
  font-family: "Lexend Deca";
  background-color: ${(props) => props.background};
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.color};
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  margin-right: 4px;
  text-align: center;
`;

const Quarta = styled.div`
  font-family: "Lexend Deca";
  background-color: ${(props) => props.background};
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.color};
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  margin-right: 4px;
  text-align: center;
`;

const Quinta = styled.div`
  font-family: "Lexend Deca";
  background-color: ${(props) => props.background};
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.color};
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  margin-right: 4px;
  text-align: center;
`;

const Sexta = styled.div`
  font-family: "Lexend Deca";
  background-color: ${(props) => props.background};
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.color};
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  margin-right: 4px;
  text-align: center;
`;

const Sabado = styled.div`
  font-family: "Lexend Deca";
  background-color: ${(props) => props.background};
  width: 30px;
  height: 30px;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.color};
  font-style: normal;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  margin-right: 4px;
  text-align: center;
`;

const Body = styled.body`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
  padding-bottom: 70px;
  padding-top: 28px;
  overflow-y: scroll;
`;

export default Habitos;
