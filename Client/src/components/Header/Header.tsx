import React, { FC } from "react";
import { HeaderMenu } from "../../utils/Consts";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Logo, NavbarLink, NavbarList } from "./styles";

const Header: FC = () => {
  return (
    <Container>
      <Logo>stockit</Logo>
      <SearchBar />
    </Container>
  );
};

export default Header;
