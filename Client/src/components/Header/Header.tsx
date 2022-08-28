import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Logo } from "./styles";
import { IoArrowBack } from "react-icons/io5";
import Palette from "../../utils/Palette";

const Header: FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  return (
    <Container>
      <IoArrowBack
        onClick={onClick}
        size={35}
        color={Palette.PRIMARY_GERY}
        cursor="pointer"
      />
      <Logo to="/">stockit</Logo>
      <SearchBar />
      {/* <div style={{ width: 200 }} /> */}
    </Container>
  );
};

export default Header;
