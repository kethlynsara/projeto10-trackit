import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";

import Header from "../Header";
import Footer from "../Footer";
import CheckBox from "../CheckBox.js";
import UserContext from "../../contexts/UserContext";

import check from "../../assets/img/check.svg";

function Hoje() {
  const { token, percentage, setPercentage } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(true);
  const [atualizarHabitos, setAtualizarHabitos] = useState(0);
  const green = "#8FC549";
  const grey = "#BABABA";
  const darkGrey = "#666666";
  const days = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function getHabitos() {
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise.then((response) => {
      const { data } = response;
      const porcentagem = (
        (data.filter((habito) => habito.done).length / data.length) *
        100
      )
      setPercentage(porcentagem);
      setList(data);    
      
    });
    promise.catch((err) => console.log(err.response));
  }

  useEffect(getHabitos, [atualizarHabitos]);

  function marcarHabito(id, done) {
    if (done) {
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
        {},
        config
      );
      promise.then((response) => {
        const { data } = response;
        setAtualizarHabitos(atualizarHabitos + 1);
      });
    } else {
      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
        {},
        config
      );
      promise.then((response) => {
        const { data } = response;
        setAtualizarHabitos(atualizarHabitos + 1);
      });
    }
  }

  function diasSemana() {
    return (
      <Div>
        {days.map((day) => {
          if (days.indexOf(day) == dayjs().day()) {
            return (
              <p key={day}>
                {day}, {dayjs().format("DD/MM")}
              </p>
            );
          }
        })}
      </Div>
    );
  }

  function marcarSequencia(currentSequence, highestSequence, done) {
    if (done) {
      return (
        <>
          <H5 color={green}>
            Sequência atual: <span>{currentSequence}</span>{" "}
            <span>{currentSequence === 1 ? "dia" : "dias"}</span>
          </H5>
          <H6 color={currentSequence === highestSequence ? green : darkGrey}>
            Seu record: <span>{highestSequence}</span>{" "}
            <span>{highestSequence === 1 ? "dia" : "dias"}</span>
          </H6>
        </>
      );
    } else {
      return (
        <>
          <H5 color={darkGrey}>
            Sequência atual: <span>{currentSequence}</span>{" "}
            <span>{currentSequence === 1 ? "dia" : "dias"}</span>
          </H5>
          <H6 color={darkGrey}>
            Seu record: <span>{highestSequence}</span>{" "}
            <span>{highestSequence === 1 ? "dia" : "dias"}</span>
          </H6>
        </>
      );
    }
  }

  return (
    <Body>
      <Header />
      <Box>
        <Contanier>
          <TituloDiv>
            {diasSemana()}
            <H2 color={percentage > 0 ? green : grey}>
              {percentage > 0
                ? `${percentage}% dos hábitos concluídos`
                : "Nenhum hábito concluído ainda"}
            </H2>
          </TituloDiv>
          {list.map((item) => {
            return (
              <Habito key={item.name}>
                <div className="habito-info">
                  <h4>{item.name}</h4>
                  {marcarSequencia(
                    item.currentSequence,
                    item.highestSequence,
                    item.done
                  )}
                </div>
                <CheckBox
                  selected={selected}
                  setSelected={setSelected}
                  marcarHabito={marcarHabito}
                  item={item}
                  green={green}
                  grey={grey}
                  id={item.id}
                />
              </Habito>
            );
          })}
        </Contanier>
      </Box>
      <Footer />
    </Body>
  );
}

const H5 = styled.h5`
  span {
    color: ${(props) => props.color};
  }
`;

const H6 = styled.h6`
  span {
    color: ${(props) => props.color};
  }
`;

const Body = styled.body`
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
  padding-bottom: 70px;
  padding-top: 28px;
  overflow-y: scroll;
  font-family: "Lexend Deca", sans-serif;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TituloDiv = styled.div`
  margin-top: 78px;
  display: flex;
  flex-direction: column;  
  height: 80px;
`;

const Contanier = styled.div`
  padding-left: 17px;
  padding-right: 18px;
  margin-bottom: 130px;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;
  margin-bottom: 28px;
  color: ${(props) => props.color};
`;

const Habito = styled.div`
  width: 340px;
  height: 94px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 13px 13px 12px 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .habito-info {
    width: 208px;
    height: 65px;
    margin-top: 7px;
  }

  .habito-info h4 {
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
  }

  .habito-info h5,
  h6 {
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
  }

  .check-box img {
    height: 28px;
    width: 35.09282684326172px;
  }
`;

const Div = styled.div`
  width: 100%;
  height: 29px;
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;
  line-height: 29px;
  color: #126ba5;
`;

export default Hoje;
