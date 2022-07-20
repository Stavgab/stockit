import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StocksTable = styled.table`
  border-collapse: collapse;
  width: 80%;
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
