import { Button } from "@mui/material";
import React, { FC } from "react";
import { AuthorInput, ButtonContainer, CreateContainer, DateInput, DescriptionInput, Input, SourceInput, TitleInput } from "./styles";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../utils/Consts";

const StockNewsCreate: FC = () => {
const navigate = useNavigate();
  return (
    <>
    <CreateContainer>
        <TitleInput>
            <Input placeholder="Add Title" />
        </TitleInput>
        <DescriptionInput>
            <Input placeholder="Add Description" />
        </DescriptionInput>
        <AuthorInput>
            <Input placeholder="Add Author" />
        </AuthorInput>
        <SourceInput>
            <Input placeholder="Add Source" />
        </SourceInput>
        <DateInput>
            <Input placeholder="Add Date" />
        </DateInput>
    </CreateContainer>
    <ButtonContainer>
    <Button onClick={() => navigate(`${SERVER_URL}`)} >Publish</Button>
    </ButtonContainer>
    </>
  );
};

export default StockNewsCreate;