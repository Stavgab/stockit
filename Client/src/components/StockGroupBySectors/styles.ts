import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SectorTable = styled.table`
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

export const Td = styled.td`
  font-weight: 300;
  text-align:center;
  font-size: 15px;
  padding: 10px 10px;
`;
export const Title = styled.h1`
  color: ${Palette.PRIMARY_BLACK};
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-top:10px;
`;
export const Body = styled.tbody``;