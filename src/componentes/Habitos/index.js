import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
// import "../Habitos/estilo.css"


function Habitos() {
    return (
        <Contanier>
            <Header />
            <Descricao>
                <h2>Meus hábitos</h2>
                <button>+</button>
            </Descricao>
            <Cadastro>
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
            </Cadastro>
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            <Footer />
        </Contanier>
    )
}

const Contanier = styled.div`
    font-family: 'Lexend Deca';
    padding-left: 17px;
    padding-right: 18px;
    
    body {
        background-color: #E5E5E5;
    }

    p {
        margin-top: 28px;
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        padding-right: 2px;
        width: 338px;
        height: 74px;
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
        color: #126BA5;
    }

    button {
        width: 40px;
        height: 35px;
        background-color: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        font-weight: bold;
        font-size: 26.976px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
    }
`;

const Cadastro = styled.div`
    width: 340px;
    height: 180px;
    background-color: brown;
    border-radius: 5px;
    padding: 18px 18px 15px 19px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input {
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px; 
        padding-left: 11px;
    }

    .dias button {
        width: 30px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        border: none;
        margin-top: 8px;
        margin-right: 4px;
    }

    .salvar-cancelar {
        margin-top: 100px;
        margin-right: 16px;
        
        margin-left: 148px;
    }

    .salvar-cancelar .salvar {
        width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
    }

    .salvar-cancelar .cancelar {
        width: 69px;
        height: 20px;
        text-align: center;
        color: #52B6FF;
        border: none;
        background-color: brown;
        margin-right: 23px;
    }
`;

export default Habitos;