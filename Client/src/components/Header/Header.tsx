import React, { FC } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Logo } from "./styles";

const Header: FC = () => {
  return (
    <Container>
      <Logo to="/">stockit</Logo>
      <SearchBar />

      {/* Temp Links */}
      <div style={{ display: "flex" }}>
        <Link to="/">StockScreener</Link>
        <Link to="stock" style={{ marginInline: 10 }}>
          StockDetails
        </Link>
        <Link to="stocknews">StockNews</Link>
      </div>
      {/* Temp Links */}
    </Container>
  );
};

export default Header;
