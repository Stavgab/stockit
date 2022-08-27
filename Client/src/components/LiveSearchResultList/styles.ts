import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px;
`;

export const StocksTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Header = styled.thead``;

export const Tr = styled.tr`
  border: 0.5px solid lightgrey;
`;

export const Th = styled.th`
  font-weight: 500;
  padding: 10px 10px;
  :hover {
    background-color: ${Palette.BACKGROUND_GERY};
    cursor: pointer;
  }
`;

export const Body = styled.tbody``;
