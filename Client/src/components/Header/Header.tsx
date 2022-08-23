import React, { FC } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Logo } from "./styles";

const Header: FC = () => {
  return (
    <Container>
      <Logo to="/">stockit</Logo>
      <Link to="stocknews">StockNews</Link>
    </Container>
  );
};

export default Header;
