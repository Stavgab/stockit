import styled from "styled-components";

export const GraphContainer = styled.div``;

export const DetailsGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  justify-content: center;
  width: 80%;
  align-self: center;
`;
export const Title = styled.p`
  font-size: 12px;
  text-transform: uppercase;
`;
export const Detail = styled.h4`
  font-weight: 600;
`;
export const DetailContainer = styled.div`
  border: 0.5px solid lightgrey;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
