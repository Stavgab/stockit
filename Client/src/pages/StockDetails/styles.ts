import styled from "styled-components";
import Palette from "../../utils/Palette";

export const GraphContainer = styled.div``;

export const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px 10px;
`;
export const Title = styled.h1`
  color: ${Palette.PRIMARY_BLACK};
  font-size: 40px;
  font-weight: 500;
`;

export const ContentContainer = styled.div`
  display: flex;
`;
