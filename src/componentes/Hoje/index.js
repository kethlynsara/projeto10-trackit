import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import axios from "axios";

import Header from "../Header";
import Footer from "../Footer";
import check from "../../assets/img/check.svg";
import UserContext from "../../contexts/UserContext";

function Hoje() {
  const { token, setToken, img, setImg } = useContext(UserContext);
  const [list, setList] = useState([]);
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
      setList(data);
    });
    promise.catch((err) => console.log(err.response));
  }

  useEffect(getHabitos, []);

  return (
    <>
      <Header usuario={img} />
      <Contanier>
        {list.map((item) => {
          return (
            <Habito key={item.name}>
              <div className="habito-info">
                <h4>{item.name}</h4>
                <h5>Sequência atual: 4 dias</h5>
                <h6>Seu record: 5 dias</h6>
              </div>
              <div className="check-box">
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
