import styled from "styled-components";
import Palette from "../../utils/Palette";

export const ItemContainer = styled.div`
  height:140px;
  width:100%;
  margin-top: 40px;
  display:flex;
  border: 1px solid ${Palette.BACKGROUND_GERY};
  /* justify-content:space-between; */
  align-content:space-between;
  border-radius: 10px;
`;

export const PhotoContainer = styled.div`
  margin-right: 30px;
`;

export const BodyContainer = styled.div`
  display: flex;
  justify-content:space-between;
  flex-direction:column;
`;

export const ImgTest = styled.img`
  height:140px;
  width:140px;
`;

export const Title = styled.h2`
  margin-top: 5px;  
  font-size:20px;
`;

export const Source = styled.p`
  font-size: 12px;
`;

export const Author = styled.p`
  text-shadow:floralwhite;
  font-size: 12px;
`;

export const Date = styled.p`
  font-size: 12px;
`;

export const Description = styled.p`
  font-size: 14px;
`;

export const Sector = styled.p`
  font-size: 14px;
`;