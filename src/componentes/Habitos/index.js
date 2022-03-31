import { useContext, useEffect } from "react";
import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";
import UserContext from "../../contexts/UserContext";
import axios from "axios";
import { useState } from "react/cjs/react.development";

// import "../Habitos/estilo.css"

function Habitos() {
  const [lista, setLista] = useState([]);
  const { token, setToken, img, setImg } = useContext(UserContext);
  console.log(img);
  console.log("habitos", token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
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
  }, []);

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
          <button>+</button>
        </Descricao>
        {lista.map((item) => {
          return (
            <Habito key={item.name}>
              <ion-icon name="trash-outline"></ion-icon>
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

// const Cadastro = styled.div`
//     width: 340px;
//     height: 180px;
//     background-color: brown;
//     border-radius: 5px;
//     padding: 18px 18px 15px 19px;
//     display: flex;
//     flex-direction: column;
//     margin-top: 20px;

//     input {
//         width: 303px;
//         height: 45px;
//         background: #FFFFFF;
//         border: 1px solid #D5D5D5;
//         box-sizing: border-box;
//         border-radius: 5px;
//         padding-left: 11px;
//     }

//     .dias button {
//         width: 30px;
//         height: 30px;
//         background: #FFFFFF;
//         border: 1px solid #D5D5D5;
//         box-sizing: border-box;
//         border-radius: 5px;
//         border: none;
//         margin-top: 8px;
//         margin-right: 4px;
//     }

//     .salvar-cancelar {
//         margin-top: 100px;
//         margin-right: 16px;

//         margin-left: 148px;
//     }

//     .salvar-cancelar .salvar {
//         width: 84px;
//         height: 35px;
//         background: #52B6FF;
//         border-radius: 4.63636px;
//         border: none;
//     }

//     .salvar-cancelar .cancelar {
//         width: 69px;
//         height: 20px;
//         text-align: center;
//         color: #52B6FF;
//         border: none;
//         background-color: brown;
//         margin-right: 23px;
//     }
// `;

{
  /* <Cadastro>
<input type="text" placeholder="nome do hábito"></input>
<div className="dias">
    <button>D</button>
    <button>S</button>
    <button>T</button>
    <button>Q</button>
    <button>Q</button>
    <button>S</button>
    <button>S</button>
</div>
<div className="salvar-cancelar">
    <button className="cancelar">Cancelar</button>
    <button className="salvar">Salvar</button>
</div>
</Cadastro> */
}

export default Habitos;
