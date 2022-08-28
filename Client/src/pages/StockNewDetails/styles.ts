import { Link } from "react-router-dom";
import styled from "styled-components";
import Palette from "../../utils/Palette";

const NEWS_WIDTH = "80%";

export const Header = styled.header`
  width: ${NEWS_WIDTH};
  margin-top: 20px;
`;

export const Title = styled.h1`
  font-weight: 500;
`;
export const SubtitleContainer = styled.div`
  display: flex;
`;
export const Author = styled.p`
  margin-right: 10px;
  color: ${Palette.PRIMARY_GERY};
  ::after {
    content: " |";
  }
  ::before {
    content: "Originally Posted by: ";
  }
`;
export const Date = styled.p`
  color: ${Palette.PRIMARY_GERY};
`;
export const Source = styled.a``;

export const Sector = styled.p`
  ::before {
    content: "Sector: ";
    font-weight: 600;
  }
  margin: 10px 0;
`;
export const Company = styled(Link)`
  ::before {
    content: "Related Company: ";
    font-weight: 600;
  }
  margin: 10px 10px;
  color: black;
`;
export const Seperator = styled.div`
  background-color: ${Palette.PRIMARY_GERY};
  width: ${NEWS_WIDTH};
  height: 5px;
`;
export const Context = styled.article`
  width: ${NEWS_WIDTH};
  margin-top: 20px;
  line-height: 2;
  white-space: pre-line;
`;

export const SectorContainer = styled.div`
  display: flex;
`;
