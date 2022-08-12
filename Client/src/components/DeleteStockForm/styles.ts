import styled from "styled-components";
import Palette from "../../utils/Palette";

export const DeleteStockFormContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 90%;
  text-align: center;
`;

export const TrashContainer = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
  box-shadow: 0 0 20px ${Palette.BACKGROUND_GERY};
  border-radius: 100%;
  margin-bottom: 20px;
`;

export const Title = styled.h4`
  margin-bottom: 20px;
  color: ${Palette.PRIMARY_BLACK};
  font-size: 20px;
  font-weight: 600;
`;

export const Text = styled.p`
  margin-top: 10px;
  color: grey;
  font-weight: 300;
`;

export const ButtonsContainer = styled.div`
  margin-top: 20px;
  width: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: white;
  border: 2px solid red;
  border-radius: 5px;
  color: red;
  font-weight: 500;
  font-size: 17px;
  cursor: pointer;

  :hover {
    background-color: red;
    color: white;
  }
`;

export const CancelButton = styled.button`
  padding: 5px 10px;
  margin-right: 10px;
  background-color: white;
  border: none;
  color: grey;
  font-weight: 500;
  font-size: 17px;
  border: 2px solid white;
  cursor: pointer;

  :hover {
    background-color: white;
    border: 2px solid red;
    border-radius: 5px;
    color: red;
  }
`;

export const StockDetailsContainer = styled.div``;
