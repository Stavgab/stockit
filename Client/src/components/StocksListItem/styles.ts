import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Tr = styled.tr`
  border: 0.5px solid lightgrey;
  text-align: center;
  :hover {
    background-color: ${Palette.BACKGROUND_GERY};
    cursor: pointer;
  }
`;
export const Td = styled.td`
  font-weight: 300;
  font-size: 15px;
  padding: 10px 10px;
`;
