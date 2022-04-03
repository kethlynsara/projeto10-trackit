import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import axios from "axios";

import Header from "../Header";
import Footer from "../Footer";
import check from "../../assets/img/check.svg";
import UserContext from "../../contexts/UserContext";

function Hoje() {
  const { token, percentage, setPercentage } = useContext(UserContext);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(true);
  const [atualizarHabitos, setAtualizarHabitos] = useState(0);

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
      console.log(data);
      const porcentagem = ((data.filter((habito) => habito.done).length / response.data.length) * 100).toFixed(2);
      setList(data);
      setPercentage(porcentagem);
      console.log(porcentagem);
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
        console.log("deu certo", data);
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
        console.log("deu bom", data);
        setAtualizarHabitos(atualizarHabitos + 1);

      });
    }
  }

  return (
    <>
      <Header />
      <Contanier>
        <h2>
          {percentage === 0
            ? "Nenhum hábito concluído ainda"
            : `${percentage}% dos hábitos concluídos`}
        </h2>
        {list.map((item) => {
          return (
            <Habito key={item.name}>
              <div className="habito-info">
                <h4>{item.name}</h4>
                <h5>Sequência atual: 4 dias</h5>
                <h6>Seu record: 5 dias</h6>
              </div>
              <div
                className="check-box"
                onClick={() => {
                  setSelected(!selected);
                  marcarHabito(item.id, item.done);
                  console.log("selected", selected);
                }}
              >
                <img src={check} alt="check icon" />
              </div>
            </Habito>
          );
        })}
      </Contanier>
      <Footer />
    </>
  );
}

const Contanier = styled.div`
  font-family: "Lexend Deca", sans-serif;
  margin-top: 80px;
  padding-left: 17px;
  padding-right: 18px;
  margin-bottom: 100px;

  h2 {
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #bababa;
    margin-top: 127px;
    margin-bottom: 28px;
  }
`;

const Habito = styled.div`
  width: 340px;
  height: 94px;
  background-color: salmon;
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

  .check-box {
    width: 69px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebebeb;
    border: 1px solid #e7e7e7;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .check-box img {
    height: 28px;
    width: 35.09282684326172px;
  }
`;

export default Hoje;

// if (selected) {
//   if (done === false) {
//     const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config);
//     promise.then((response) => {
//       const {data} = response;
//       console.log("deu bom", data);
//     });
//     promise.catch((err) => console.log("não deu bom", err.response));
//     // console.log(setFilter(("filter", list.filter((habito) => habito.done === true))));
//   } else {
//     const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
//     promise.then((response) => {
//       const {data} = response;
//       console.log("deu certo", data);
//     });
//     promise.catch((err) => console.log("não deu certo", err.response));
//     // console.log(setFilter(("filter", list.filter((habito) => habito.done === true))));
//   }
// } else {
//   if (done === true) {
//     const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
//     promise.then((response) => {
//       const {data} = response;
//       console.log("deu certo", data);
//     });
//     promise.catch((err) => console.log("não deu certo", err.response));
//     // console.log(setFilter(("filter", list.filter((habito) => habito.done === true))));
//   }
// }

// const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, {}, config);
// promise.then((response) => {
// const {data} = response;
// console.log("deu bom", data);
// });
// promise.catch((err) => console.log("não deu bom", err.response));
// } else if (selected && done) {
//   const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
//   promise.then((response) => {
//   const {data} = response;
//   console.log("deu certo", data);
//   });
//   promise.catch((err) => console.log("não deu certo", err.response));
// } else if (!selected && done) {
//   const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {}, config);
//   promise.then((response) => {
//   const {data} = response;
//   console.log("deu certo", data);
//   });
//   promise.catch((err) => console.log("não deu certo", err.response));
