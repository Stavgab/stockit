import styled from "styled-components";
import Palette from "../../utils/Palette";

export const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 50%;
  justify-content: space-around;
`;
export const Title = styled.h1`
  color: ${Palette.PRIMARY_BLACK};
  font-size: 40px;
  font-weight: 500;
`;

export const LoadingText = styled.p`
  text-align: center;
`;
