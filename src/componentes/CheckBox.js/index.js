import styled from "styled-components";
import check from "../../assets/img/check.svg";

function CheckBox({selected, marcarHabito, item, grey, green, setSelected}) {
  return (
    <Contanier
      selecionado={selected ? green : grey}
      onClick={() => {
        setSelected(!selected);
        marcarHabito(item.id, item.done);
        console.log("selected", selected);
      }}
    >
      <img src={check} alt="check icon" />
    </Contanier>
  );
}

const Contanier = styled.div`
    width: 69px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.selecionado};
    border: 1px solid #e7e7e7;
    box-sizing: border-box;
    border-radius: 5px;
`;

export default CheckBox;
