import React, { FC } from "react";
import { HeaderMenu } from "../../utils/Consts";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Logo, NavbarLink, NavbarList } from "./styles";

const Header: FC = () => {
  return (
    <Container>
      <Logo>Shopolopo</Logo>
      {/* <NavbarList>
        {HeaderMenu &&
          HeaderMenu.map((val, i) => (
            <NavbarLink key={i}>{val.label}</NavbarLink>
          ))}
      </NavbarList> */}
      <SearchBar />
    </Container>
  );
};

export default Header;
