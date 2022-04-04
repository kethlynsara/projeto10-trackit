import Header from "../Header";
import Footer from "../Footer";
import styled from "styled-components";

function Historico() {
  return (
    <>
      <Body>
        <Header />
        <H1>Histórico</H1>
        <H2>Em breve você poderá ver o histórico dos seus hábitos aqui!</H2>
        <Footer />
      </Body>
    </>
  );
}

const H1 = styled.h1`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 22.976px;
  line-height: 29px;
  color: #126ba5;
  margin-top: 98px;
`;

const H2 = styled.h2`
  font-family: "Lexend Deca";
  font-style: normal;
  font-weight: 400;
  font-size: 17.976px;
  line-height: 22px;
  color: #666666;
  margin-top: 17px;
  width: 338px;
  height: 74px;
`;

const Body = styled.body`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
  padding: 28px 22px 70px 15px;
`;

export default Historico;
