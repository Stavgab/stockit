import { Button } from "@mui/material";
import React, { FC } from "react";
import { Container, TitleContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../utils/Consts";

const StockNewsCreate: FC = () => {
const navigate = useNavigate();
  return (
    <>
    <Container>
        <TitleContainer>
            Would you like to delete ?
        </TitleContainer>
        <Button onClick={() => navigate(`${SERVER_URL}`)} >YES</Button>
        <Button onClick={() => navigate(`${SERVER_URL}`)} >NO</Button>
    </Container>
    </>
  );
};

export default StockNewsCreate;